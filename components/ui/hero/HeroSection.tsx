"use client";

import HeadlinePanel from "./HeadlinePanel";
import TabsRail from "./TabsRail";

interface HeroSectionProps {
  audiences: string[];
  activeTab: string;
  onTabChange: (audience: string) => void;
  headline: string;
  isInitialLoad?: boolean;
}

export default function HeroSection({
  audiences,
  activeTab,
  onTabChange,
  headline,
  isInitialLoad = false,
}: HeroSectionProps) {
  return (
    <section className="absolute inset-x-6 top-[calc(50%-26px)] md:top-1/2 z-20 -translate-y-1/2 md:inset-x-8 lg:inset-x-10">
      <div className="mx-auto w-full max-w-[1040px]">
        <div className="w-full text-left">
          <TabsRail audiences={audiences} activeTab={activeTab} onTabChange={onTabChange} isInitialLoad={isInitialLoad} />
          <HeadlinePanel activeTab={activeTab} headline={headline} isInitialLoad={isInitialLoad} />
        </div>
      </div>
    </section>
  );
}
