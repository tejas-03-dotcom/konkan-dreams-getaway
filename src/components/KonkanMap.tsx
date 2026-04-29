import { useLocationFilter } from "@/context/LocationContext";
import { MapPin, X, Hotel, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

// Approx coords on a stylized 600x720 viewBox tracing the Konkan coast (north → south).
// x = inland direction, y = north→south. Sea is to the left.
const spots = [
  { name: "Alibaug",      x: 230, y: 90,  blurb: "Weekend beaches near Mumbai", hotels: 4, tours: 6 },
  { name: "Murud",        x: 220, y: 165, blurb: "Janjira sea fort & quiet sands", hotels: 3, tours: 4 },
  { name: "Dapoli",       x: 245, y: 245, blurb: "Cliffs, dolphins & Harnai port", hotels: 5, tours: 7 },
  { name: "Ratnagiri",    x: 260, y: 330, blurb: "Alphonso country & forts", hotels: 6, tours: 5 },
  { name: "Ganpatipule",  x: 235, y: 395, blurb: "Sacred shore & swayambhu temple", hotels: 7, tours: 8 },
  { name: "Devgad",       x: 245, y: 475, blurb: "Heritage homes & mango orchards", hotels: 3, tours: 3 },
  { name: "Malvan",       x: 220, y: 555, blurb: "Coastal cuisine & boat rides", hotels: 5, tours: 9 },
  { name: "Tarkarli",     x: 200, y: 605, blurb: "Crystal lagoons & scuba diving", hotels: 6, tours: 7 },
  { name: "Vengurla",     x: 230, y: 665, blurb: "Untouched coves near Goa", hotels: 2, tours: 3 },
];

const KonkanMap = () => {
  const { location, setLocation } = useLocationFilter();

  const handleSelect = (name: string) => {
    setLocation(location === name ? null : name);
    // smooth scroll to hotels after selection
    if (location !== name) {
      setTimeout(() => {
        document.getElementById("hotels")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  };

  const active = spots.find((s) => s.name === location);

  return (
    <section id="map" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Interactive Map</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3 mb-4">Tap a town. See what's there.</h2>
          <p className="text-muted-foreground text-lg">
            Click any pin along the Konkan coast to filter stays and local guides for that spot.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border/60 gradient-sand">
            <svg
              viewBox="0 0 600 720"
              className="w-full h-auto block"
              role="img"
              aria-label="Interactive map of the Konkan coast"
            >
              <defs>
                <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(192 78% 35%)" />
                  <stop offset="100%" stopColor="hsl(188 70% 55%)" />
                </linearGradient>
                <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(36 45% 88%)" />
                  <stop offset="100%" stopColor="hsl(36 55% 78%)" />
                </linearGradient>
                <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="hsl(195 50% 12%)" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Sea */}
              <rect width="600" height="720" fill="url(#seaGrad)" />

              {/* Soft wave lines */}
              {[120, 240, 360, 480, 600].map((y) => (
                <path
                  key={y}
                  d={`M0 ${y} Q 50 ${y - 8} 100 ${y} T 200 ${y} T 300 ${y}`}
                  stroke="hsl(0 0% 100% / 0.18)"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}

              {/* Land mass — stylized Konkan/Western Ghats coastline */}
              <path
                d="M 600 0 L 600 720 L 220 720
                   C 195 695, 175 660, 195 620
                   C 215 590, 175 560, 200 520
                   C 230 485, 215 450, 245 420
                   C 270 395, 220 370, 235 340
                   C 260 310, 235 285, 255 255
                   C 280 225, 240 200, 245 170
                   C 250 140, 215 120, 235 90
                   C 250 65, 220 40, 250 0 Z"
                fill="url(#landGrad)"
                stroke="hsl(192 78% 28% / 0.4)"
                strokeWidth="1.5"
              />

              {/* Western Ghats hint */}
              <path
                d="M 360 60 L 380 90 L 365 110 L 395 145 L 375 180 L 410 220 L 385 260 L 415 300 L 390 350 L 420 400 L 395 450 L 425 500 L 400 560 L 430 620 L 410 680"
                stroke="hsl(152 45% 32% / 0.35)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 6"
              />

              {/* Region label */}
              <text x="430" y="370" fontSize="22" fontWeight="700" fill="hsl(195 50% 25%)" fontFamily="Playfair Display, serif" opacity="0.7">
                KONKAN
              </text>
              <text x="430" y="395" fontSize="11" fill="hsl(195 30% 35%)" letterSpacing="3" opacity="0.7">
                MAHARASHTRA
              </text>
              <text x="40" y="50" fontSize="12" fill="hsl(0 0% 100% / 0.85)" letterSpacing="4" fontWeight="600">
                ARABIAN SEA
              </text>

              {/* Pins */}
              {spots.map((s) => {
                const isActive = location === s.name;
                return (
                  <g
                    key={s.name}
                    onClick={() => handleSelect(s.name)}
                    className="cursor-pointer"
                    style={{ transition: "transform 0.3s" }}
                  >
                    {/* Pulse ring when active */}
                    {isActive && (
                      <circle cx={s.x} cy={s.y} r="22" fill="hsl(14 88% 60% / 0.25)">
                        <animate attributeName="r" values="14;28;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Pin */}
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={isActive ? 11 : 8}
                      fill={isActive ? "hsl(14 88% 60%)" : "hsl(192 78% 28%)"}
                      stroke="hsl(40 38% 97%)"
                      strokeWidth="3"
                      filter="url(#pinShadow)"
                      className="transition-all hover:r-12"
                    />
                    {/* Hover halo */}
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r="20"
                      fill="transparent"
                      className="hover:fill-accent/20 transition-colors"
                    />
                    {/* Label */}
                    <text
                      x={s.x + 18}
                      y={s.y + 5}
                      fontSize="14"
                      fontWeight={isActive ? 700 : 600}
                      fill={isActive ? "hsl(14 88% 35%)" : "hsl(195 50% 15%)"}
                      style={{ pointerEvents: "none" }}
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {location && (
              <button
                onClick={() => setLocation(null)}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur text-xs font-semibold flex items-center gap-1.5 shadow-soft hover:bg-accent hover:text-accent-foreground transition-smooth"
              >
                <X className="w-3.5 h-3.5" /> Clear filter
              </button>
            )}
          </div>

          {/* Side panel */}
          <div className="bg-card rounded-3xl shadow-card border border-border/60 p-8 flex flex-col">
            {active ? (
              <div className="animate-fade-up flex flex-col h-full">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-widest mb-3">
                  <MapPin className="w-3.5 h-3.5" /> Selected
                </span>
                <h3 className="text-3xl font-bold mb-2">{active.name}</h3>
                <p className="text-muted-foreground mb-6">{active.blurb}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-2xl bg-secondary/60">
                    <Hotel className="w-5 h-5 text-primary mb-2" />
                    <div className="text-2xl font-bold">{active.hotels}</div>
                    <div className="text-xs text-muted-foreground">stays available</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/60">
                    <Compass className="w-5 h-5 text-accent mb-2" />
                    <div className="text-2xl font-bold">{active.tours}</div>
                    <div className="text-xs text-muted-foreground">local guides</div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <Button variant="sunset" size="lg" asChild>
                    <a href="#hotels">View Stays in {active.name}</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#guides">Meet Guides</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl gradient-ocean grid place-items-center mb-5 shadow-soft animate-float">
                  <MapPin className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pick a destination</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                  Click any orange pin on the map to instantly filter stays and tour guides for that town.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {spots.slice(0, 5).map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSelect(s.name)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-smooth font-medium"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KonkanMap;
