import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar, MapPin, Trash2, Hotel, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

type Booking = {
  id: string;
  booking_type: "hotel" | "guide";
  item_name: string;
  location: string;
  start_date: string;
  end_date: string;
  guests: number;
  price_per_unit: number;
  status: string;
};

const MyBookings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setBookings((data ?? []) as Booking[]);
      setBusy(false);
    })();
  }, [user]);

  const cancel = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.filter((x) => x.id !== id));
    toast.success("Booking cancelled");
  };

  return (
    <>
      <Navbar />
      <main className="container pt-28 pb-24 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-10">Manage your stays and tour guides.</p>

        {busy ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-secondary/40">
            <p className="text-lg text-muted-foreground mb-4">No bookings yet — start exploring Konkan.</p>
            <Button variant="sunset" onClick={() => navigate("/")}>Browse stays</Button>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((b) => (
              <article key={b.id} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-ocean grid place-items-center text-primary-foreground shrink-0">
                  {b.booking_type === "hotel" ? <Hotel className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="uppercase tracking-wider font-semibold text-accent">{b.booking_type}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{b.location}</span>
                  </div>
                  <h3 className="text-lg font-bold">{b.item_name}</h3>
                  <div className="text-sm text-muted-foreground inline-flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(b.start_date), "MMM d")} – {format(new Date(b.end_date), "MMM d, yyyy")} · {b.guests} guest{b.guests !== 1 && "s"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">₹{b.price_per_unit.toLocaleString("en-IN")}</div>
                  <Button variant="ghost" size="sm" className="text-destructive mt-2" onClick={() => cancel(b.id)}>
                    <Trash2 className="w-4 h-4" /> Cancel
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default MyBookings;
