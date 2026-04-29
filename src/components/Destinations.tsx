import ganpatipule from "@/assets/dest-ganpatipule.jpg";
import tarkarli from "@/assets/dest-tarkarli.jpg";
import sindhudurg from "@/assets/dest-sindhudurg.jpg";
import malvan from "@/assets/dest-malvan.jpg";
import { MapPin } from "lucide-react";

const destinations = [
  { name: "Ganpatipule", img: ganpatipule, tagline: "Sacred shores & swayambhu temple", tag: "Pilgrimage", span: "md:col-span-2 md:row-span-2" },
  { name: "Tarkarli", img: tarkarli, tagline: "Crystal lagoons & scuba diving", tag: "Beach" },
  { name: "Sindhudurg Fort", img: sindhudurg, tagline: "Shivaji's island fortress", tag: "Heritage" },
  { name: "Malvan", img: malvan, tagline: "Coastal cuisine & fishing villages", tag: "Culture", span: "md:col-span-2" },
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-24 md:py-32 gradient-sand">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Explore Konkan</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3 mb-4">Iconic destinations along the coast</h2>
          <p className="text-muted-foreground text-lg">From hidden coves to historic sea forts, every stop tells a story carved by the Arabian Sea.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[280px] gap-5">
          {destinations.map((d, i) => (
            <article
              key={d.name}
              className={`group relative overflow-hidden rounded-3xl shadow-card cursor-pointer animate-fade-up ${d.span ?? ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={d.img}
                alt={`${d.name} in the Konkan region`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-bounce group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-foreground">{d.tag}</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 text-primary-foreground">
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/80 mb-2">
                  <MapPin className="w-3.5 h-3.5" /> Konkan, MH
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{d.name}</h3>
                <p className="text-sm text-primary-foreground/85 mt-1">{d.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
