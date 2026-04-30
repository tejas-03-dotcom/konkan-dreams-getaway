import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface Item {
  name: string;
  location: string;
  price: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  type: "hotel" | "guide";
  item?: Item | null;
}

const BookingDialog = ({ open, onClose, title, subtitle, type, item }: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to book", { description: "Redirecting to login…" });
      onClose();
      navigate("/auth");
      return;
    }
    if (!item) return;
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: type,
      item_name: item.name,
      location: item.location,
      start_date: String(fd.get("from")),
      end_date: String(fd.get("to")),
      guests: Number(fd.get("guests") ?? 1),
      price_per_unit: item.price,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setConfirmed(true);
    toast.success("Booking confirmed!", { description: "Find it under My Bookings." });
    setTimeout(() => { setConfirmed(false); onClose(); }, 2200);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        {confirmed ? (
          <div className="py-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full gradient-sunset grid place-items-center mb-4 shadow-glow">
              <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground text-sm">View it in My Bookings.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription>{subtitle}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="from">{type === "hotel" ? "Check-in" : "Tour date"}</Label>
                  <Input id="from" name="from" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="to">{type === "hotel" ? "Check-out" : "End date"}</Label>
                  <Input id="to" name="to" type="date" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" name="guests" type="number" min={1} defaultValue={2} required />
              </div>
              {!user && (
                <p className="text-xs text-muted-foreground text-center">You'll be asked to sign in to confirm.</p>
              )}
              <Button type="submit" variant="sunset" size="lg" className="w-full" disabled={busy}>
                Confirm {type === "hotel" ? "Booking" : "Guide"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
