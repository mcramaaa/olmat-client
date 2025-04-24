import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import { APPCONSTANT } from "@/constant/App.constant";
import AppImage from "../ui/AppImage";
import { Button } from "../ui/button";
import { PiStudentBold } from "react-icons/pi";
import { LuSchool } from "react-icons/lu";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const dataParticipant = [
    {
      label: "Jenjang SD/MI",
      icon: <PiStudentBold />,
      desc: "One of Indonesias most recognized mathematics competitions with a legacy of excellence.",
      countLabel: "Peserta Terdaftar",
      count: 100,
    },
    {
      label: "Jenjang SMP/MTs",
      icon: <PiStudentBold />,
      desc: "One of Indonesias most recognized mathematics competitions with a legacy of excellence.",
      countLabel: "Peserta Terdaftar",
      count: 100,
    },
    {
      label: "Jenjang SMA/SMK/MA",
      icon: <PiStudentBold />,
      desc: "One of Indonesias most recognized mathematics competitions with a legacy of excellence.",
      countLabel: "Peserta Terdaftar",
      count: 100,
    },
    {
      label: "Sekolah Terdaftar",
      icon: <LuSchool />,
      desc: "One of Indonesias most recognized mathematics competitions with a legacy of excellence.",
      countLabel: "Sekolah Terdaftar",
      count: 100,
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand">
            Tentang {APPCONSTANT.name}
          </h2>
          <div className="w-20 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {APPCONSTANT.theme}
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
              {APPCONSTANT.about.item.map((data, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <h3 className="text-2xl font-bold mb-4 text-secondBrand">
                    {data.label}
                  </h3>
                  <p className="text-gray-700 indent-10 text-justify">
                    {data.desc}
                  </p>
                </motion.div>
              ))}
              <div className="flex justify-around">
                <Button className="border-brand border text-brand bg-brand/5 rounded-full hover:bg-brand hover:text-white duration-500">
                  <Download />
                  Unduh JUKLAK JUKNIS
                </Button>
                {/* <Button>Pengumuman</Button> */}
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 grid place-items-center">
            <div className="relative w-fit">
              <AppImage
                src="/pamfletolm.jpg"
                alt="Math Olympiad Participants"
                className="w-56 overflow-hidden aspect-[3/5] rounded-2xl shadow-xl"
                object="object-cover"
              />

              {/* Floating Stats */}
              <div className="absolute -top-5 -left-5 h-20 w-20 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-brand">18</span>
                <span className="text-xs text-gray-600">Regions</span>
              </div>
              <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-brand">5K+</span>
                <span className="text-xs text-gray-600">Participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6">
          {dataParticipant.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="h-12 w-12 rounded-full text-2xl text-brand bg-brandDark/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-brandDark/20 mt-3 text-brand">
                <p className="font-medium">{item.countLabel}</p>
                <p className="font-bold">{item.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
