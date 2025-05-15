import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APPCONSTANT } from "@/constant/App.constant";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

interface LandingNavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export function LandingNavbar({
  activeSection,
  onNavClick,
}: LandingNavbarProps) {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "Tentang" },
    { id: "events", label: "Event" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : " py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10  flex items-center justify-center">
              <Image
                src={"/logo-olm.webp"}
                alt=""
                sizes="1"
                priority
                className="object-contain"
                fill
              />
            </div>
            <div>
              <h1 className="font-bold text-xl text-brand">
                {APPCONSTANT.name}
              </h1>
              <p className="text-xs -mt-1 text-brand/80">
                {APPCONSTANT.fullName}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-brand bg-brand/10"
                    : "text-gray-600 hover:text-brand hover:bg-brand/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/login">
              <Button className="ml-4 bg-brand hover:bg-brand/90">
                {user ? "Dashboard" : "Masuk"}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand hover:bg-brand/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-brand bg-brand/10"
                      : "text-gray-600 hover:text-brand hover:bg-brand/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link href="/login" className="mt-2">
                <Button className="w-full bg-brand hover:bg-brand/90">
                  {user ? "Dashboard" : "Masuk"}
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
