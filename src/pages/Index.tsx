import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import KonkanMap from "@/components/KonkanMap";
import Hotels from "@/components/Hotels";
import Guides from "@/components/Guides";
import Footer from "@/components/Footer";
import { LocationProvider } from "@/context/LocationContext";

const Index = () => {
  return (
    <LocationProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Destinations />
        <KonkanMap />
        <Hotels />
        <Guides />
        <Footer />
      </main>
    </LocationProvider>
  );
};

export default Index;
