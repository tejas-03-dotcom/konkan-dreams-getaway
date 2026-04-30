import { Waves, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const links = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#map", label: "Map" },
  { href: "/#hotels", label: "Stays" },
  { href: "/#guides", label: "Guides" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid place-items-center w-9 h-9 rounded-xl gradient-ocean text-primary-foreground shadow-soft">
            <Waves className="w-5 h-5" />
          </span>
          <span className="text-lg tracking-tight">Konkan<span className="text-accent">Coast</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-foreground/80 hover:text-accent transition-smooth">{l.label}</a>
            </li>
          ))}
          {user && (
            <li><Link to="/my-bookings" className="text-foreground/80 hover:text-accent transition-smooth">My Bookings</Link></li>
          )}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/my-bookings"><User className="w-4 h-4" /> Account</Link></Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}><LogOut className="w-4 h-4" /> Sign out</Button>
            </>
          ) : (
            <Button variant="sunset" size="sm" asChild><Link to="/auth">Sign in</Link></Button>
          )}
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="container py-4 flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block py-1">{l.label}</a></li>
            ))}
            {user ? (
              <>
                <li><Link to="/my-bookings" onClick={() => setOpen(false)} className="block py-1">My Bookings</Link></li>
                <li><button onClick={() => { setOpen(false); handleSignOut(); }} className="block py-1 text-left">Sign out</button></li>
              </>
            ) : (
              <li><Link to="/auth" onClick={() => setOpen(false)} className="block py-1">Sign in</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
