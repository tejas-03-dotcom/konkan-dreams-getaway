import { Waves, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-background pt-20 pb-8">
    <div className="container grid md:grid-cols-4 gap-10 mb-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="grid place-items-center w-9 h-9 rounded-xl gradient-sunset">
            <Waves className="w-5 h-5 text-accent-foreground" />
          </span>
          <span className="text-xl font-semibold">Konkan<span className="text-accent">Coast</span></span>
        </div>
        <p className="text-background/70 max-w-sm leading-relaxed">
          Your trusted companion for unforgettable journeys along Maharashtra's spectacular Konkan coastline.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-background">Explore</h4>
        <ul className="space-y-2 text-background/70 text-sm">
          <li><a href="#destinations" className="hover:text-accent transition-smooth">Destinations</a></li>
          <li><a href="#hotels" className="hover:text-accent transition-smooth">Stays</a></li>
          <li><a href="#guides" className="hover:text-accent transition-smooth">Guides</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-background">Contact</h4>
        <ul className="space-y-2 text-background/70 text-sm">
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> hello@konkancoast.in</li>
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +91 98765 43210</li>
        </ul>
        <div className="flex gap-3 mt-5">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social" className="w-9 h-9 grid place-items-center rounded-full bg-background/10 hover:bg-accent transition-smooth">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="container border-t border-background/15 pt-6 text-xs text-background/60 flex flex-col md:flex-row gap-2 justify-between">
      <span>© {new Date().getFullYear()} KonkanCoast. Made with love by the sea.</span>
      <span>Privacy · Terms · Cancellation</span>
    </div>
  </footer>
);

export default Footer;
