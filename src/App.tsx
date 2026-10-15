import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Coverage } from "./components/Coverage";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroCarousel } from "./components/HeroCarousel";
import { Process } from "./components/Process";
import { QuickTriage } from "./components/QuickTriage";
import { Services } from "./components/Services";
import { Urgency } from "./components/Urgency";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { GaugeDefs } from "./components/ui/IconBadge";

export default function App() {
  return (
    <>
      <GaugeDefs />
      <Header />
      <main>
        <HeroCarousel />
        <QuickTriage />
        <Services />
        <About />
        <Urgency />
        <Process />
        <FAQ />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
