"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReusableCombobox } from "../ui/reusable-combobox";
import { getRegionAction } from "@/app/(auth)/register/register.action";
import Link from "next/link";

// Regional contact data
const regions = [
  {
    id: "jakarta",
    name: "Jakarta",
    coordinator: "Dr. Ahmad Fauzi",
    email: "jakarta@uinsamatholympiad.ac.id",
    phone: "+62 812-3456-7890",
  },
  {
    id: "surabaya",
    name: "Surabaya",
    coordinator: "Prof. Siti Rahayu",
    email: "surabaya@uinsamatholympiad.ac.id",
    phone: "+62 813-4567-8901",
  },
  {
    id: "bandung",
    name: "Bandung",
    coordinator: "Dr. Budi Santoso",
    email: "bandung@uinsamatholympiad.ac.id",
    phone: "+62 814-5678-9012",
  },
  {
    id: "medan",
    name: "Medan",
    coordinator: "Dr. Rina Wijaya",
    email: "medan@uinsamatholympiad.ac.id",
    phone: "+62 815-6789-0123",
  },
  {
    id: "makassar",
    name: "Makassar",
    coordinator: "Prof. Hendra Gunawan",
    email: "makassar@uinsamatholympiad.ac.id",
    phone: "+62 816-7890-1234",
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    coordinator: "Dr. Maya Putri",
    email: "yogyakarta@uinsamatholympiad.ac.id",
    phone: "+62 817-8901-2345",
  },
  {
    id: "semarang",
    name: "Semarang",
    coordinator: "Prof. Dian Permata",
    email: "semarang@uinsamatholympiad.ac.id",
    phone: "+62 818-9012-3456",
  },
  {
    id: "palembang",
    name: "Palembang",
    coordinator: "Dr. Rudi Hartono",
    email: "palembang@uinsamatholympiad.ac.id",
    phone: "+62 819-0123-4567",
  },
  {
    id: "balikpapan",
    name: "Balikpapan",
    coordinator: "Dr. Indra Kusuma",
    email: "balikpapan@uinsamatholympiad.ac.id",
    phone: "+62 820-1234-5678",
  },
  {
    id: "denpasar",
    name: "Denpasar",
    coordinator: "Prof. Wayan Dharma",
    email: "denpasar@uinsamatholympiad.ac.id",
    phone: "+62 821-2345-6789",
  },
  {
    id: "padang",
    name: "Padang",
    coordinator: "Dr. Yusuf Rahman",
    email: "padang@uinsamatholympiad.ac.id",
    phone: "+62 822-3456-7890",
  },
  {
    id: "manado",
    name: "Manado",
    coordinator: "Dr. Lina Santoso",
    email: "manado@uinsamatholympiad.ac.id",
    phone: "+62 823-4567-8901",
  },
  {
    id: "banjarmasin",
    name: "Banjarmasin",
    coordinator: "Prof. Amir Hamzah",
    email: "banjarmasin@uinsamatholympiad.ac.id",
    phone: "+62 824-5678-9012",
  },
  {
    id: "jayapura",
    name: "Jayapura",
    coordinator: "Dr. Tiara Putri",
    email: "jayapura@uinsamatholympiad.ac.id",
    phone: "+62 825-6789-0123",
  },
  {
    id: "ambon",
    name: "Ambon",
    coordinator: "Prof. Samuel Leimena",
    email: "ambon@uinsamatholympiad.ac.id",
    phone: "+62 826-7890-1234",
  },
  {
    id: "pekanbaru",
    name: "Pekanbaru",
    coordinator: "Dr. Fadli Ibrahim",
    email: "pekanbaru@uinsamatholympiad.ac.id",
    phone: "+62 827-8901-2345",
  },
  {
    id: "pontianak",
    name: "Pontianak",
    coordinator: "Dr. Dewi Anggraini",
    email: "pontianak@uinsamatholympiad.ac.id",
    phone: "+62 828-9012-3456",
  },
  {
    id: "mataram",
    name: "Mataram",
    coordinator: "Prof. Agus Salim",
    email: "mataram@uinsamatholympiad.ac.id",
    phone: "+62 829-0123-4567",
  },
];

type CityFormValues = z.infer<typeof regionSchema>;

const regionSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
});

interface IPops {
  cities: { label: string; value: string }[];
}

export function ContactSection({ cities }: IPops) {
  const [activeRegion, setActiveRegion] = useState("jakarta");

  const form = useForm<CityFormValues>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      city: "",
    },
  });

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = (data: CityFormValues) => {
    // Handle form submission
    // console.log("Form submitted:", e);
    // alert("Thank you for your message! We will get back to you soon.");
    const res = getRegionAction(data.city);
    console.log(res);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-[#f8f4e3]/30" />
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#edc9af]/10 blur-3xl" />
        <div className="absolute bottom-40 left-[15%] w-72 h-72 rounded-full bg-[#d2b48c]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#996515] to-[#d2b48c]">
              Contact Us
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Get in touch with our regional coordinators or send us a message
            directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <div className="">
              <h3 className="text-2xl font-bold text-[#665D1E]">
                Cek Rayon kamu{" "}
              </h3>
              {/* <p className="text-sm text-foreground">
                Coba masukkan nama kota kamu untuk mengetahui kamu termasuk
                rayon mana
              </p> */}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4"
            >
              <div className="w-full text-center flex-col flex gap-2">
                <p className="text-sm">Kota kamu termasuk</p>
                <div className="text-center bg-green-100 w-full rounded-lg drop-shadow-sm">
                  <p className="text-lg">Rayon Surabaya</p>
                </div>
              </div>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Kota</FormLabel> */}
                          <FormControl>
                            <ReusableCombobox
                              placeholder="Pilih Kota"
                              className="text-sm"
                              onChange={field.onChange}
                              value={field.value}
                              options={cities}
                              // disabled={!selectedProvince || isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#996515] hover:bg-[#996515]/90"
                  >
                    Cari Rayon
                  </Button>
                </form>
              </Form>
              <div className="">
                <p className="text-xs ">
                  Jika kota kamu tidak tersedia, kamu bisa hubungi panitia
                  berikut ya{" "}
                  <Link className="font-bold" href={""}>
                    Pendaftaran
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Regional Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[#665D1E]">
              Regional Coordinators
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our regional coordinators for specific inquiries about the
              Olympiad in your area.
            </p>

            <Tabs
              defaultValue="jakarta"
              value={activeRegion}
              onValueChange={setActiveRegion}
            >
              <TabsList className="grid grid-cols-3 sm:grid-cols-4 mb-6 h-auto flex-wrap">
                {regions.slice(0, 8).map((region) => (
                  <TabsTrigger
                    key={region.id}
                    value={region.id}
                    className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
                  >
                    {region.name}
                  </TabsTrigger>
                ))}
                <TabsTrigger
                  value="more"
                  className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
                >
                  More
                </TabsTrigger>
              </TabsList>

              {regions.map((region) => (
                <TabsContent key={region.id} value={region.id}>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-xl font-bold mb-2">
                      {region.name} Region
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Coordinator: {region.coordinator}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#996515]/10 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-[#996515]" />
                        </div>
                        <span>{region.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#996515]/10 flex items-center justify-center">
                          <Phone className="h-4 w-4 text-[#996515]" />
                        </div>
                        <span>{region.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#996515]/10 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-[#996515]" />
                        </div>
                        <span>UINSA Regional Office, {region.name}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}

              <TabsContent value="more">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-bold mb-4">All Regions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {regions.slice(8).map((region) => (
                      <Button
                        key={region.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => setActiveRegion(region.id)}
                      >
                        {region.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 bg-[#996515]/10 p-6 rounded-xl">
              <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#996515]" />
                Main Contact
              </h4>
              <p className="text-gray-700 mb-2">
                For general inquiries, please contact our main office:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> info@uinsamatholympiad.ac.id
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +62 31-8413300
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> UIN Sunan Ampel Surabaya, Jl. Ahmad
                Yani No.117, Surabaya, East Java, Indonesia
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
