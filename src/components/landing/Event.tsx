import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APPCONSTANT } from "@/constant/App.constant";
import Link from "next/link";

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand">
            Acara Pendukung
          </h2>
          <div className="w-20 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Selain kompetisi utama, OLMAT UINSA menghadirkan beragam acara seru
            yang menambah wawasan dan semangat kebersamaan. Jangan lewatkan
            keseruannya!
          </p>
        </div>

        <Tabs
          defaultValue={`${APPCONSTANT.supportEvent[0].name}`}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className={`grid grid-cols-3 w-full max-w-md`}>
              {APPCONSTANT.supportEvent.map((item, i) => (
                <TabsTrigger
                  key={i}
                  value={item.name}
                  className="data-[state=active]:bg-brand data-[state=active]:text-white"
                >
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {APPCONSTANT.supportEvent.map((item, i) => (
            <TabsContent value={item.name} key={i}>
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
                    {/* <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium mb-2">
                      <Brush className="h-4 w-4 mr-2" />
                      Creative Competition
                    </div> */}
                    <h3 className="text-3xl font-bold text-secondBrand">
                      {item.name}
                    </h3>
                    <p className="text-gray-700">{item.desc}</p>
                    <div className="space-y-4">
                      {item.options.map((opt, i) => (
                        <div key={i} className="flex items-start">
                          <div className="h-6 w-6 flex items-center justify-center mt-0.5 mr-3">
                            <span className="bg-brand text-xs h-2 w-2 rounded-full font-bold"></span>
                          </div>
                          <div>
                            <p className="font-medium">{opt.label}</p>
                            <p className="text-gray-600">{opt.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button
                        disabled={item.registerLink === ""}
                        className="bg-brand hover:bg-brand/90 mt-4 rounded-full"
                      >
                        <Link className="" href={item.registerLink || ""}>
                          {item.registerLink !== "" ? (
                            <>
                              Daftar <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>Comming Soon</>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="order-1 lg:order-2"
                >
                  <div className="relative h-[400px]">
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                      <Image
                        src={`${item.img}`}
                        alt="Mathematical Design Contest"
                        fill
                        sizes="1"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
