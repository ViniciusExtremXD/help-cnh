import { MotionConfig } from "framer-motion";
import { Background } from "./components/Background";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Services } from "./components/Services";
import { Urgencies } from "./components/Urgencies";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { WhyUs } from "./components/WhyUs";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Urgencies />
        <WhyUs />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  );
}
