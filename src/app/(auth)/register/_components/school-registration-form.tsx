"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ReusableCombobox } from "@/components/ui/reusable-combobox";
import { useLayout } from "@/hooks/zustand/layout";
import {
  getCityAction,
  getSubdistrictAction,
  submitSchoolRegistrationAction,
} from "../register.action";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/router";

const schoolSchema = z.object({
  province_id: z.string().min(1, { message: "Province is required" }),
  city_id: z.string().min(1, { message: "City is required" }),
  subdistrict_id: z.string().min(1, { message: "Subdistrict is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  degree_id: z.string().min(1, { message: "School level is required" }),
  name: z.string().min(1, { message: "School name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "WhatsApp number is required" })
    .regex(/^0\d+$/, "Nomor WhatsApp harus dimulai dengan 0"),
  whatsapp: z
    .string()
    .min(1, { message: "WhatsApp number is required" })
    .regex(/^0\d+$/, "Nomor WhatsApp harus dimulai dengan 0"),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

interface IProps {
  provinces: { id: string; name: string }[];
  degrees: { id: string; name: string }[];
}

export function SchoolRegistrationForm({ provinces, degrees }: IProps) {
  const router = useRouter();
  const { isLoading, setIsLoading, setIsSuccess, setError } = useLayout();
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [subdistricts, setSubdistricts] = useState<
    { label: string; value: string }[]
  >([]);

  const provOptions = provinces.map((prov) => ({
    value: prov.id,
    label: prov.name,
  }));

  const DegreeOptions = degrees.map((prov) => ({
    value: prov.id,
    label: prov.name,
  }));

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      province_id: "",
      city_id: "",
      subdistrict_id: "",
      address: "",
      degree_id: "",
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
    },
  });
  const selectedProvince = form.watch("province_id");
  const selectedCity = form.watch("city_id");
  // const selectedSubdistrict = form.watch("subdistrict")

  useEffect(() => {
    async function getCity() {
      if (!selectedProvince) {
        setCities([]);
        return;
      }

      try {
        const response = await getCityAction(selectedProvince);
        if (response.data && Array.isArray(response.data)) {
          const cityOptions = response.data
            .map((city: any) => ({
              label: city.name,
              value: city.id,
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));

          setCities(cityOptions);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
        // setCities([]);
      }
    }

    getCity();
  }, [selectedProvince]);

  useEffect(() => {
    async function getSubdistrict() {
      if (!selectedCity) {
        setSubdistricts([]);
        return;
      }

      try {
        const response = await getSubdistrictAction(selectedCity);
        if (response.data && Array.isArray(response.data)) {
          const subdistrictOptions = response.data
            .map((subdistrict: any) => ({
              label: subdistrict.name,
              value: subdistrict.id,
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));

          setSubdistricts(subdistrictOptions);
        }
      } catch (error) {
        console.error("Error fetching subdistricts:", error);

        setSubdistricts([]);
        throw error;
      }
    }

    getSubdistrict();
  }, [selectedCity]);

  async function onSubmit(data: SchoolFormValues) {
    setIsLoading(true);
    const res = await submitSchoolRegistrationAction(data);
    if (res.success) {
      setIsSuccess(true, "Pendaftaran Sekolah Terkirim");
      router.push(ROUTES.REGISTER + "?sec=account");
      setIsLoading(false);
    } else {
      setError(true, "Pendaftaran Sekolah Tidak Terkirim");
      setIsLoading(false);
      throw res.error;
    }
  }

  return (
    <>
      {/* <LoadingBlock /> */}
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="province_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <ReusableCombobox
                        placeholder="Pilih Kota"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={provOptions}
                        disabled={isLoading}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota</FormLabel>
                      <FormControl>
                        <ReusableCombobox
                          placeholder="Pilih Kota"
                          className="text-sm"
                          onChange={field.onChange}
                          value={field.value}
                          options={cities}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subdistrict_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <FormControl>
                      <ReusableCombobox
                        placeholder="Pilih Kecamatan"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={subdistricts}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter school address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="degree_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenjang Sekolah</FormLabel>
                      <ReusableCombobox
                        placeholder="Pilih Kota"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={DegreeOptions}
                        disabled={isLoading}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sekolah</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="school@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No Telepon Sekolah</FormLabel>
                      <FormControl>
                        <Input placeholder="0xxx xxx xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Whatsapp pendaftar</FormLabel>
                      <FormControl>
                        <Input placeholder="0xxx xxxx xxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Daftarkan Sekolah"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
