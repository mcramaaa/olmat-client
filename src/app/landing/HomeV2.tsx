"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/About";
import { SupportingEventsSection } from "@/components/landing/Event";
import { TimelineSection } from "@/components/landing/Timeline";
import { ContactSection } from "@/components/landing/Contact";
import PromotionSection from "@/components/landing/Promotion";
import { IRegion } from "@/interfaces/IRegion";

interface IProps {
  cities: { label: string; value: string }[];
  regions: IRegion[];
}

export default function HomeV2({ cities, regions }: IProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <LandingNavbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <PromotionSection />
        <SupportingEventsSection />
        <TimelineSection />
        <ContactSection cities={cities} regions={regions} />
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/login">
          <Button className="rounded-full shadow-lg">
            Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-white hover:bg-white/90"
        >
          <ChevronDown className="h-5 w-5 rotate-180" />
        </Button>
      </div>
    </div>
  );
}
