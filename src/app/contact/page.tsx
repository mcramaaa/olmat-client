import type { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact - Math Olympiad 2025",
  description: "Contact the International Mathematics Olympiad 2025 team",
};

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-500">
            Have questions about the Math Olympiad? Get in touch with our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">info@matholympiad2025.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">
                Math Olympiad Headquarters
                <br />
                123 Mathematics Avenue
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
