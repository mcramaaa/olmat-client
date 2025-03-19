import Link from "next/link";
import { Trophy, Award, Brain } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-gray-50 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
              International Mathematics Olympiad 2025
            </h1>
            <p className="text-gray-600 md:text-lg">
              Join the world&apos;s most prestigious mathematics competition and
              showcase your problem-solving skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white"
              >
                <Link href="/register">Register Now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-100">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Global Recognition</h3>
              <p className="text-gray-600">
                Compete with participants from over 100 countries worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Prestigious Awards</h3>
              <p className="text-gray-600">
                Win medals, certificates, and scholarship opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-full">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Challenge Yourself</h3>
              <p className="text-gray-600">
                Solve complex mathematical problems and improve your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-2xl font-bold text-center md:text-3xl">
            How to Participate
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Create Account</h3>
              <p className="text-gray-600">
                Register and create your participant profile
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Submit Documents</h3>
              <p className="text-gray-600">
                Upload required documents and photos
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Pay Registration</h3>
              <p className="text-gray-600">Complete the payment process</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="mb-2 text-lg font-semibold">Get Ready</h3>
              <p className="text-gray-600">Prepare for the competition</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#0f172a] text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ready to Challenge Yourself?
            </h2>
            <p>
              Register now and be part of the International Mathematics Olympiad
              2025
            </p>
            <Button
              asChild
              className="bg-white text-[#0f172a] hover:bg-gray-100"
            >
              <Link href="/register">Start Registration</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
