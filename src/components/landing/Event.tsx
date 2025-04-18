import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SupportingEventsSection() {
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
      </div>
    </section>
  );
}
