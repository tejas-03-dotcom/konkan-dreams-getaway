import { useState } from "react";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import { Star, MapPin, Wifi, Coffee, Waves as WavesIcon, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";

const hotels = [
  {
    name: "Sea Mirage Resort",
    location: "Ganpatipule",
    img: hotel1,
    price: 6500,
    rating: 4.9,
    reviews: 312,
    tags: ["Beachfront", "Infinity Pool", "Spa"],
    amenities: [WavesIcon, Wifi, Utensils, Coffee],
  },
  {
    name: "Aamrai Heritage Homestay",
    location: "Devgad",
    img: hotel2,
    price: 3200,
    rating: 4.8,
    reviews: 184,
    tags: ["Heritage", "Mango Orchard", "Home-cooked"],
    amenities: [Utensils, Wifi, Coffee],
  },
  {
    name: "Palm Tide Eco Cottages",
    location: "Tarkarli",
    img: hotel3,
    price: 4400,
    rating: 4.7,
    reviews: 256,
    tags: ["Eco Stay", "Watersports", "Sea View"],
    amenities: [WavesIcon, Wifi, Coffee],
  },
];

const Hotels = () => {
  const [selected, setSelected] = useState<typeof hotels[number] | null>(null);

  return (
    <section id="hotels" className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Where to Stay</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-3">Handpicked Konkan stays</h2>
          </div>
          <p className="text-muted-foreground md:max-w-md">From Portuguese-era courtyards to barefoot beach cottages — every stay we list is personally vetted.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((h, i) => (
            <article
              key={h.name}
              className="group rounded-3xl bg-card border border-border/60 overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1 animate-fade-up flex flex-col"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={h.img} alt={`${h.name} in ${h.location}`} loading="lazy" className="w-full h-full object-cover transition-bounce group-hover:scale-110" />
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur flex items-center gap-1 text-sm font-semibold shadow-soft">
                  <Star className="w-4 h-4 fill-highlight text-highlight" /> {h.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" /> {h.location}, Konkan
                </div>
                <h3 className="text-2xl font-bold mb-2">{h.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{h.reviews} verified reviews</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {h.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground mb-5">
                  {h.amenities.map((Icon, idx) => (<Icon key={idx} className="w-4 h-4" />))}
                </div>
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-primary">₹{h.price.toLocaleString("en-IN")}</div>
                    <div className="text-xs text-muted-foreground">per night · taxes incl.</div>
                  </div>
                  <Button variant="sunset" onClick={() => setSelected(h)}>Book Now</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BookingDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Book ${selected.name}` : ""}
        subtitle={selected ? `${selected.location} · ₹${selected.price.toLocaleString("en-IN")}/night` : ""}
        type="hotel"
      />
    </section>
  );
};

export default Hotels;
