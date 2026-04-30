import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/context/AuthContext";

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(6, "Min 6 characters").max(72);
const nameSchema = z.string().trim().min(1, "Name required").max(100);

const Auth = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (session) navigate("/"); }, [session, navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = nameSchema.safeParse(fd.get("name"));
    const email = emailSchema.safeParse(fd.get("email"));
    const password = passwordSchema.safeParse(fd.get("password"));
    if (!name.success) return toast.error(name.error.issues[0].message);
    if (!email.success) return toast.error(email.error.issues[0].message);
    if (!password.success) return toast.error(password.error.issues[0].message);

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.data,
      password: password.data,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: name.data },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Check your email", { description: "Click the verification link to activate your account." });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = emailSchema.safeParse(fd.get("email"));
    const password = passwordSchema.safeParse(fd.get("password"));
    if (!email.success) return toast.error(email.error.issues[0].message);
    if (!password.success) return toast.error(password.error.issues[0].message);

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.data, password: password.data });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    navigate("/");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { setLoading(false); return toast.error("Google sign-in failed"); }
    if (result.redirected) return;
    navigate("/");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-secondary/40 via-background to-accent/10 p-4">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border/60 shadow-elegant p-8">
        <Link to="/" className="flex items-center gap-2 font-semibold mb-6">
          <span className="grid place-items-center w-9 h-9 rounded-xl gradient-ocean text-primary-foreground shadow-soft">
            <Waves className="w-5 h-5" />
          </span>
          <span className="text-lg tracking-tight">Konkan<span className="text-accent">Coast</span></span>
        </Link>

        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 mt-4">
              <div className="space-y-1.5"><Label htmlFor="si-email">Email</Label><Input id="si-email" name="email" type="email" required /></div>
              <div className="space-y-1.5"><Label htmlFor="si-pw">Password</Label><Input id="si-pw" name="password" type="password" required /></div>
              <Button type="submit" variant="ocean" size="lg" className="w-full" disabled={loading}>Sign in</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-1.5"><Label htmlFor="su-name">Full name</Label><Input id="su-name" name="name" required /></div>
              <div className="space-y-1.5"><Label htmlFor="su-email">Email</Label><Input id="su-email" name="email" type="email" required /></div>
              <div className="space-y-1.5"><Label htmlFor="su-pw">Password</Label><Input id="su-pw" name="password" type="password" required minLength={6} /></div>
              <Button type="submit" variant="sunset" size="lg" className="w-full" disabled={loading}>Create account</Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" size="lg" className="w-full" onClick={handleGoogle} disabled={loading}>
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
