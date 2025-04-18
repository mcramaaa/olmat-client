import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

export default function PromotionSection() {
  return (
    <section id="promotion" className="container mx-auto px-6">
      {/* Event Cards */}
      <div className="mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#996515]">
            Sosial Media dan E-Commerce
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Beyond the main competition, we offer a variety of engaging events
            to enrich your Olympiad experience.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Opening Ceremony"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#996515] text-white text-xs font-medium px-2 py-1 rounded">
                  Jan 15, 2025
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="font-bold text-lg mb-2">Opening Ceremony</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Join us for the grand opening of the UINSA Math Olympiad 2025
                  with special guests and performances.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Workshop Series"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#996515] text-white text-xs font-medium px-2 py-1 rounded">
                  Feb 10, 2025
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="font-bold text-lg mb-2">Workshop Series</h4>
                <p className="text-sm text-gray-600 mb-4">
                  A series of preparatory workshops to help participants sharpen
                  their mathematical skills.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Math Exhibition"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#996515] text-white text-xs font-medium px-2 py-1 rounded">
                  Mar 5, 2025
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="font-bold text-lg mb-2">Math Exhibition</h4>
                <p className="text-sm text-gray-600 mb-4">
                  An interactive exhibition showcasing the beauty and
                  applications of mathematics in everyday life.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
