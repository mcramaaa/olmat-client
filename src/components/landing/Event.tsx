"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Brush, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SupportingEventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#996515]">
            Supporting Events
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Beyond the main competition, we offer a variety of engaging events
            to enrich your Olympiad experience.
          </p>
        </div>

        <Tabs defaultValue="seminar" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger
                value="seminar"
                className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
              >
                Seminar
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
              >
                Design Contest
              </TabsTrigger>
              <TabsTrigger
                value="poetry"
                className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
              >
                Poetry Reading
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="seminar">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                variants={itemVariants}
                className="order-2 lg:order-1"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#996515]/10 text-[#996515] text-sm font-medium mb-2">
                    <Presentation className="h-4 w-4 mr-2" />
                    Educational Event
                  </div>
                  <h3 className="text-3xl font-bold text-[#665D1E]">
                    Mathematics in the Modern World
                  </h3>
                  <p className="text-gray-700">
                    Join our exclusive seminar featuring renowned mathematicians
                    and educators who will explore the role of mathematics in
                    todass world. From AI and data science to cryptography and
                    quantum computing, discover how mathematical principles are
                    shaping our future.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Interactive Workshops</h4>
                        <p className="text-sm text-gray-600">
                          Hands-on sessions with industry experts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Panel Discussions</h4>
                        <p className="text-sm text-gray-600">
                          Engaging conversations about mathematics in various
                          fields
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Networking Opportunities
                        </h4>
                        <p className="text-sm text-gray-600">
                          Connect with like-minded students and professionals
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#996515] hover:bg-[#996515]/90 mt-4">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="order-1 lg:order-2"
              >
                <div className="relative h-[400px]">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Mathematics Seminar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="design">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                variants={itemVariants}
                className="order-2 lg:order-1"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#996515]/10 text-[#996515] text-sm font-medium mb-2">
                    <Brush className="h-4 w-4 mr-2" />
                    Creative Competition
                  </div>
                  <h3 className="text-3xl font-bold text-[#665D1E]">
                    Mathematical Art & Design Contest
                  </h3>
                  <p className="text-gray-700">
                    Express your creativity through mathematics! Our design
                    contest challenges participants to create visual art,
                    digital designs, or physical models that incorporate
                    mathematical concepts and principles.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Multiple Categories</h4>
                        <p className="text-sm text-gray-600">
                          Digital art, physical models, and graphic design
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Exhibition</h4>
                        <p className="text-sm text-gray-600">
                          Showcase your work at the Olympiad venue
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Prizes</h4>
                        <p className="text-sm text-gray-600">
                          Recognition and awards for outstanding designs
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#996515] hover:bg-[#996515]/90 mt-4">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="order-1 lg:order-2"
              >
                <div className="relative h-[400px]">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Mathematical Design Contest"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="poetry">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                variants={itemVariants}
                className="order-2 lg:order-1"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#996515]/10 text-[#996515] text-sm font-medium mb-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Literary Event
                  </div>
                  <h3 className="text-3xl font-bold text-[#665D1E]">
                    Mathematical Poetry Reading
                  </h3>
                  <p className="text-gray-700">
                    Where mathematics meets literature! Participate in our
                    poetry reading event where you can recite original or
                    classic poems that celebrate the beauty and elegance of
                    mathematics.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Original Compositions</h4>
                        <p className="text-sm text-gray-600">
                          Share your own mathematical poetry
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Interpretive Readings</h4>
                        <p className="text-sm text-gray-600">
                          Perform classic mathematical poems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#996515]/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-[#996515] text-xs font-bold">
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Evening Gala</h4>
                        <p className="text-sm text-gray-600">
                          Special evening event with guest poets
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#996515] hover:bg-[#996515]/90 mt-4">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="order-1 lg:order-2"
              >
                <div className="relative h-[400px]">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Poetry Reading"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Event Cards */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">
            Upcoming Events
          </h3>
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
                    Join us for the grand opening of the UINSA Math Olympiad
                    2025 with special guests and performances.
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
                    A series of preparatory workshops to help participants
                    sharpen their mathematical skills.
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
      </div>
    </section>
  );
}
