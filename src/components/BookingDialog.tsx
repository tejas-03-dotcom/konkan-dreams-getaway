import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  type: "hotel" | "guide";
}

const BookingDialog = ({ open, onClose, title, subtitle, type }: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    toast.success("Booking request received!", { description: "We'll confirm via email within minutes." });
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
            <p className="text-muted-foreground text-sm">Check your inbox for details.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription>{subtitle}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="from">{type === "hotel" ? "Check-in" : "Tour date"}</Label>
                  <Input id="from" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="to">{type === "hotel" ? "Check-out" : "End date"}</Label>
                  <Input id="to" type="date" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" type="number" min={1} defaultValue={2} required />
              </div>
              <Button type="submit" variant="sunset" size="lg" className="w-full">
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
