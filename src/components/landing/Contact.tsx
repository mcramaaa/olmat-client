import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Loader2, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
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
import { getRegionByCityAction } from "@/app/(auth)/register/register.action";
import Link from "next/link";
import { IRegion } from "@/interfaces/IRegion";
import { UpperCaseFirst } from "@/helper/common";
import { useLayout } from "@/hooks/zustand/layout";
import { Alert, AlertDescription } from "../ui/alert";
import { APPCONSTANT } from "@/constant/App.constant";

type CityFormValues = z.infer<typeof regionSchema>;

const regionSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
});

interface IPops {
  cities: { label: string; value: string }[];
  regions: IRegion[];
}

export function ContactSection({ cities, regions }: IPops) {
  const { isLoading, setIsLoading } = useLayout();
  const [activeRegion, setActiveRegion] = useState<{
    name?: string;
    id: string;
  }>({
    id: "SBY",
    name: undefined,
  });

  const form = useForm<CityFormValues>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      city: "",
    },
  });

  async function handleSubmit(data: CityFormValues) {
    const res = await getRegionByCityAction(data.city);
    setIsLoading(true);
    setActiveRegion({
      id: res.data.id,
      name: res.data.name,
    });
    setIsLoading(false);
  }

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
              Hubungi Kami
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#996515] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hubungi koordinator rayon di wilayahmu atau kirim pesan langsung
            kepada panitia pusat untuk mendapatkan informasi seputar Olimpiade
            Matematika UINSA 2025.
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
              {activeRegion.name && (
                <div className="w-full text-center flex-col flex gap-2">
                  <p className="text-sm">Kota kamu termasuk</p>
                  <div className="text-center bg-green-100 w-full rounded-lg drop-shadow-sm">
                    <p className="text-lg">{activeRegion.name}</p>
                  </div>
                </div>
              )}
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
                    {isLoading ? (
                      <div className="flex items-center mb-4">
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        <span>Mengirim data, mohon tunggu...</span>
                      </div>
                    ) : (
                      "Cari Rayon"
                    )}
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
            <div className="mt-8 bg-[#996515]/10 p-6 rounded-xl">
              <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#996515]" />
                Kontak Utama
              </h4>
              <p className="text-gray-700 mb-2">
                Untuk Kepentingan umum, silahkan hubungi kontak berikut
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {APPCONSTANT.footer.email}
              </p>
              <p className="text-gray-700">
                <strong>WhatsApp:</strong>{" "}
                {APPCONSTANT.footer.mainWhatsApp.replace("62", "0")}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> UIN Sunan Ampel Surabaya, Jl. Ahmad
                Yani No.117, Surabaya, East Java, Indonesia
              </p>
            </div>
          </div>

          {/* Regional Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-[#665D1E]">
              Koordinator Rayon
            </h3>
            <p className="text-gray-600 mb-6">
              Hubungi koordinator sesuai wilayahmu untuk info lengkap seputar
              OLMAT UINSA 2025.
            </p>

            {regions.length > 0 && (
              <Tabs
                defaultValue={activeRegion.id}
                value={activeRegion.id}
                onValueChange={(e) =>
                  setActiveRegion({ ...activeRegion, id: e })
                }
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-3  mb-6 h-auto flex-wrap">
                  {regions.map((region) => (
                    <TabsTrigger
                      key={region.id}
                      value={region.id}
                      className="data-[state=active]:bg-[#996515] data-[state=active]:text-white"
                    >
                      {region.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {regions.map((region) => (
                  <TabsContent key={region.id} value={region.id}>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h4 className="text-xl font-bold mb-2">{region.name}</h4>
                      <div className="text-xs flex gap-2 flex-wrap w-full">
                        {region.cities?.map((city, i) => (
                          <p
                            key={i}
                            className="bg-gray-100 rounded-full py-1 px-3"
                          >
                            {UpperCaseFirst(city.name)}
                          </p>
                        ))}
                      </div>
                      <div className="mt-5 text-xs md:text-base">
                        <div className="space-y-3">
                          <Link
                            href={`https://api.whatsapp.com/send?phone=${region.contact}&text=Hai%20kak%20saya%20dari%20rayon%20${region.name}`}
                            target="_blank"
                            className="flex items-center gap-3 w-fit hover:scale-105 duration-300 hover:bg-slate-100 rounded-full pr-3"
                          >
                            <div className="p-2 rounded-full bg-[#996515]/10 flex items-center justify-center">
                              <FaWhatsapp className="text-xl text-[#996515]" />
                            </div>
                            <span>
                              {region.captain} :{" "}
                              {region.contact.replace("+62", "0")}
                            </span>
                          </Link>
                        </div>
                      </div>
                      <Alert className="bg-muted/80 border-muted mt-4 flex items-center">
                        <AlertDescription className="flex items-center gap-3">
                          <Info className="w-4 h-4" />
                          {/* <span className="font-semibold">Penting</span>: */}
                          Tekan nama untuk menghubungi melalui whatsapp
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
