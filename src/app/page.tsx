import HeroSection from "../components/HeroSection";
import TopSpeakers from "../components/TopSpeakers";
import HowitWorks from "../components/HowitWorks";
import Faqs from "../components/Faqs";
// app/page.tsx

export default function Home() {
  return (
     <>
     
      <HeroSection />
      <TopSpeakers/>
      <HowitWorks/>
      <Faqs/>
    </>
  );
}