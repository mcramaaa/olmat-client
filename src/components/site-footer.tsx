import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Math Olympiad 2025</h3>
            <p className="text-sm text-gray-600">
              Fostering mathematical talent worldwide
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-600 hover:underline"
                >
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>Email: info@matholympiad2025.com</p>
              <p>Phone: +1 234 567 890</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>
            © 2025 OLMAT UINSA created by{" "}
            <Link
              href={"https://mcrama.vercel.app/"}
              target="_blank"
              className="font-bold"
            >
              Mc Rama
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
