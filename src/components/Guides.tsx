import { useState } from "react";
import guide1 from "@/assets/guide-1.jpg";
import guide2 from "@/assets/guide-2.jpg";
import guide3 from "@/assets/guide-3.jpg";
import { Star, Languages, Award, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";
import { useLocationFilter } from "@/context/LocationContext";

const guides = [
  {
    name: "Rohan Sawant",
    img: guide1,
    region: "Sindhudurg & Malvan",
    cities: ["Malvan", "Tarkarli", "Vengurla"],
    rating: 4.9,
    tours: 240,
    languages: ["English", "Marathi", "Hindi"],
    specialty: "Forts & Coastal History",
    rate: 1800,
    bio: "Born in Malvan, Rohan has guided heritage walks across Sindhudurg fort for 9 years.",
  },
  {
    name: "Priya Naik",
    img: guide2,
    region: "Tarkarli & Devbagh",
    cities: ["Tarkarli", "Malvan", "Vengurla"],
    rating: 5.0,
    tours: 180,
    languages: ["English", "Marathi", "Konkani"],
    specialty: "Snorkeling & Marine Life",
    rate: 2200,
    bio: "Certified PADI diver leading underwater discovery tours in Tarkarli's clear waters.",
  },
  {
    name: "Vasant Dada",
    img: guide3,
    region: "Ganpatipule & Ratnagiri",
    cities: ["Ganpatipule", "Ratnagiri", "Devgad"],
    rating: 4.8,
    tours: 410,
    languages: ["Marathi", "Hindi", "Konkani"],
    specialty: "Village Trails & Cuisine",
    rate: 1500,
    bio: "Fisherman-turned-guide sharing 30+ years of local lore, mango groves, and home kitchens.",
  },
  {
    name: "Aditi Kulkarni",
    img: guide2,
    region: "Alibaug & Murud",
    cities: ["Alibaug", "Murud"],
    rating: 4.9,
    tours: 156,
    languages: ["English", "Marathi", "Hindi"],
    specialty: "Sea Forts & Watersports",
    rate: 2000,
    bio: "Expert in Janjira and Kolaba forts, with kayak and parasailing tour partnerships.",
  },
  {
    name: "Mahesh Pawar",
    img: guide1,
    region: "Dapoli & Harnai",
    cities: ["Dapoli", "Ratnagiri"],
    rating: 4.7,
    tours: 198,
    languages: ["English", "Marathi", "Hindi"],
    specialty: "Dolphin Tours & Cliffs",
    rate: 1700,
    bio: "Runs sunrise dolphin boat tours and guided treks to Suvarnadurg fort.",
  },
];

const Guides = () => {
  const [selected, setSelected] = useState<typeof guides[number] | null>(null);
  const { location, setLocation } = useLocationFilter();
  const filtered = location ? guides.filter((g) => g.cities.includes(location)) : guides;

  return (
    <section id="guides" className="py-24 md:py-32 gradient-sand">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Local Tour Guides</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3 mb-4">Travel with people who call Konkan home</h2>
          <p className="text-muted-foreground text-lg">Every guide is licensed, locally-born, and fluent in the stories that maps don't tell.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((g, i) => (
            <article
              key={g.name}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={g.img} alt={`${g.name}, local Konkan tour guide`} loading="lazy" className="w-full h-full object-cover transition-bounce group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-5">
                  <div className="flex items-center justify-between text-primary-foreground">
                    <div>
                      <h3 className="text-2xl font-bold">{g.name}</h3>
                      <p className="text-sm text-primary-foreground/85">{g.region}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/95 text-foreground text-sm font-semibold">
                      <Star className="w-4 h-4 fill-highlight text-highlight" /> {g.rating}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold">{g.specialty}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{g.tours} tours</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{g.bio}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                  <Languages className="w-3.5 h-3.5" />
                  {g.languages.join(" · ")}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xl font-bold text-primary">₹{g.rate.toLocaleString("en-IN")}</div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                  <Button variant="ocean" onClick={() => setSelected(g)}>Hire Guide</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BookingDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Hire ${selected.name}` : ""}
        subtitle={selected ? `${selected.region} · ₹${selected.rate.toLocaleString("en-IN")}/day` : ""}
        type="guide"
      />
    </section>
  );
};

export default Guides;
