"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Math Olympiad 2025</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
          <Button asChild variant="default" className="bg-[#0f172a] hover:bg-[#1e293b]">
            <Link href="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
            <nav className="flex flex-col p-4 space-y-3">
              <Link href="/" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                variant="default"
                className="bg-[#0f172a] hover:bg-[#1e293b] w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

