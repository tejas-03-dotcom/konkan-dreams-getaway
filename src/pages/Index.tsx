import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Hotels from "@/components/Hotels";
import Guides from "@/components/Guides";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Destinations />
      <Hotels />
      <Guides />
      <Footer />
    </main>
  );
};

export default Index;
