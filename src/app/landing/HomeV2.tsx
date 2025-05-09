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
import { useAuth } from "@/lib/auth";

interface IProps {
  cities: { label: string; value: string }[];
  regions: IRegion[];
  participanCountData: {
    total_active: number;
    sma: number;
    smp: number;
    sd: number;
    school: number;
  };
}

export default function HomeV2({
  cities,
  regions,
  participanCountData,
}: IProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const { user, event } = useAuth();

  const start = event?.start ? new Date(event.start).toISOString() : null;
  const end = event?.end ? new Date(event.end).toISOString() : null;
  const now = new Date().toISOString();

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
        start={start}
        end={end}
        now={now}
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      <main>
        <HeroSection user={user} start={start} end={end} now={now} />
        <AboutSection participanCountData={participanCountData} />
        <SupportingEventsSection />
        <TimelineSection />
        <PromotionSection />
        <ContactSection cities={cities} regions={regions} />
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/login">
          <Button className="rounded-full shadow-lg">
            {user ? "Dashboard" : "Masuk"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
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
