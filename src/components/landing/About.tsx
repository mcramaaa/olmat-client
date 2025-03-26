"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, Brain, Medal, Users } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#996515]">
            About the Olympiad
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The UINSA Math Olympiad is Indonesias premier mathematics
            competition, bringing together the brightest young minds from across
            the nation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4 text-[#665D1E]">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  To foster mathematical excellence, critical thinking, and
                  problem-solving skills among Indonesian students while
                  promoting a love for mathematics and creating a platform for
                  talented students to showcase their abilities.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4 text-[#665D1E]">
                  Who Can Participate
                </h3>
                <p className="text-gray-700">
                  The competition is open to high school students from across
                  Indonesia. Participants can register individually or as part
                  of a school team.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-4 text-[#665D1E]">
                  Why Join Us
                </h3>
                <p className="text-gray-700">
                  Beyond the competition, the UINSA Math Olympiad offers
                  workshops, seminars, and networking opportunities with leading
                  mathematicians and educators. Winners receive prestigious
                  awards, scholarships, and national recognition.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Math Olympiad Participants"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-5 -left-5 h-24 w-24 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#996515]">18</span>
                <span className="text-xs text-gray-600">Regions</span>
              </div>
              <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#996515]">5K+</span>
                <span className="text-xs text-gray-600">Participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-[#edc9af]/20 flex items-center justify-center mb-4">
              <Medal className="h-6 w-6 text-[#996515]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Prestigious Competition</h3>
            <p className="text-gray-600 text-sm">
              One of Indonesias most recognized mathematics competitions with a
              legacy of excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-[#edc9af]/20 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-[#996515]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Challenging Problems</h3>
            <p className="text-gray-600 text-sm">
              Carefully crafted problems that test mathematical knowledge,
              creativity, and critical thinking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-[#edc9af]/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#996515]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Nationwide Participation</h3>
            <p className="text-gray-600 text-sm">
              Bringing together students from 18 major regions across Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-[#edc9af]/20 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-[#996515]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Valuable Prizes</h3>
            <p className="text-gray-600 text-sm">
              Scholarships, cash prizes, and recognition for top performers at
              regional and national levels.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
