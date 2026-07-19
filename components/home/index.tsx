import React from "react";
import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import GlobeSection from "./GlobeSection";
import ReportSection from "./ReportSection";
import AppleCardsCarouselDemo from "../apple-cards-carousel-demo";

export default function HomeComponents() {
  return (
    <>
      <HeroSection />
      <DescriptionSection />
      <ReportSection />
      <AppleCardsCarouselDemo />
      {/* <GlobeSection /> */}
    </>
  );
}
