import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Hotel,
  UserCheck,
  ClipboardList,
  Mail,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
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
  created_at: string;
};

const BookingConfirmation = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [busy, setBusy] = useState(true);

  const bookingId = params.get("id");

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to view your booking");
      navigate("/auth");
      return;
    }
    if (!bookingId) {
      toast.error("No booking reference found");
      navigate("/my-bookings");
      return;
    }
    if (!user) return;

    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        toast.error("Booking not found");
        navigate("/my-bookings");
        return;
      }
      setBooking(data as Booking);
      setBusy(false);
    })();
  }, [user, loading, bookingId, navigate]);

  if (busy || !booking) {
    return (
      <>
        <Navbar />
        <main className="container pt-28 pb-24 min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading your confirmation…</p>
        </main>
      </>
    );
  }

  const nights =
    Math.ceil(
      (new Date(booking.end_date).getTime() -
        new Date(booking.start_date).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const total =
    booking.booking_type === "hotel"
      ? nights * booking.price_per_unit * booking.guests
      : booking.price_per_unit * booking.guests;

  return (
    <>
      <Navbar />
      <main className="container pt-28 pb-24 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="mx-auto w-20 h-20 rounded-full gradient-sunset grid place-items-center mb-6 shadow-glow">
              <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your reservation in {booking.location} is all set.
            </p>
          </div>

          {/* Confirmation card */}
          <div className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="gradient-ocean p-6 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Reservation ID</p>
                  <p className="text-2xl font-bold tracking-wider font-mono">
                    {booking.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 grid place-items-center">
                  {booking.booking_type === "hotel" ? (
                    <Hotel className="w-6 h-6" />
                  ) : (
                    <UserCheck className="w-6 h-6" />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Destination</p>
                  <p className="text-lg font-semibold">{booking.item_name}</p>
                  <p className="text-sm text-muted-foreground">{booking.location}, Konkan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Dates</p>
                  <p className="text-lg font-semibold">
                    {format(new Date(booking.start_date), "EEE, MMM d")} –{" "}
                    {format(new Date(booking.end_date), "EEE, MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {nights} night{nights !== 1 && "s"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Guests</p>
                  <p className="text-lg font-semibold">{booking.guests} guest{booking.guests !== 1 && "s"}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total amount</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Inclusive of taxes & fees</p>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-tertiary/15 text-tertiary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-bold mb-6">What’s next?</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/60 hover:bg-card transition-smooth">
                <div className="w-10 h-10 rounded-xl gradient-sunset grid place-items-center shrink-0">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Check your email</h3>
                  <p className="text-sm text-muted-foreground">
                    We’ve sent a detailed itinerary and booking voucher to your registered email address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/60 hover:bg-card transition-smooth">
                <div className="w-10 h-10 rounded-xl gradient-ocean grid place-items-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Prepare for your trip</h3>
                  <p className="text-sm text-muted-foreground">
                    Review local weather, pack light cotton clothing, and keep your ID handy for check-in.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/60 hover:bg-card transition-smooth">
                <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Need help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach out to our support team anytime — we’re here to make your Konkan experience unforgettable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <Button variant="sunset" size="lg" className="flex-1" asChild>
              <Link to="/my-bookings">
                View My Bookings <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link to="/">
                <ChevronLeft className="w-4 h-4" /> Explore More Stays
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingConfirmation;
