import heroImg from "@/assets/hero-konkan.jpg";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Search } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-16 overflow-hidden">
      <img
        src={heroImg}
        alt="Konkan coast at sunset with turquoise sea and red laterite cliffs"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl text-primary-foreground animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur border border-primary-foreground/25 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" /> Maharashtra · India's Hidden Coast
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            Where the <span className="text-gradient-sunset">Arabian Sea</span> meets red earth.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-10 leading-relaxed">
            Plan a perfect Konkan escape — handpicked beachfront stays, iconic forts and beaches,
            and warm local guides who know every cove.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="sunset" size="xl" asChild>
              <a href="#hotels">Book Your Stay</a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#destinations">Explore Konkan</a>
            </Button>
          </div>
        </div>

        {/* Search panel */}
        <div className="mt-12 md:mt-20 bg-card/95 backdrop-blur-xl rounded-2xl shadow-elegant p-4 md:p-3 max-w-5xl border border-border/50 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <form className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2">
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-smooth">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-muted-foreground">Destination</div>
                <input className="w-full bg-transparent outline-none text-sm font-medium placeholder:text-foreground/50" placeholder="Tarkarli, Ganpatipule…" />
              </div>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-smooth">
              <Calendar className="w-5 h-5 text-accent shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-muted-foreground">Check-in</div>
                <input type="date" className="w-full bg-transparent outline-none text-sm font-medium" />
              </div>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-smooth">
              <Users className="w-5 h-5 text-accent shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-muted-foreground">Guests</div>
                <select className="w-full bg-transparent outline-none text-sm font-medium">
                  <option>2 Adults</option><option>1 Adult</option><option>3 Adults</option><option>Family (4+)</option>
                </select>
              </div>
            </label>
            <Button type="submit" variant="sunset" size="lg" className="md:h-auto">
              <Search className="w-5 h-5" /> Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
