import HeroSection from "@/components/HeroSection";
import ScrollScreenMorph from "@/components/ScrollScreenMorph";
import BuildingExplorer from "@/components/BuildingExplorer";
import ArchedGallery from "@/components/ArchedGallery";
import AmenitiesSection from "@/components/AmenitiesSection";
import FooterLeadCapture from "@/components/FooterLeadCapture";

export default function Home() {
  return <main><HeroSection /><ScrollScreenMorph /><BuildingExplorer /><ArchedGallery /><AmenitiesSection /><FooterLeadCapture /></main>;
}
