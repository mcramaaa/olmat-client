import {
  getCityAction,
  getSchoolAction,
  getSubdistrictAction,
} from "@/app/(auth)/register/register.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReusableCombobox } from "@/components/ui/reusable-combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdminSchoolSchema = z.object({
  province: z.string().min(1, { message: "Province is required" }),
  city: z.string().min(1, { message: "City is required" }),
  subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
  school: z.string().min(1, { message: "School name is required" }),
});

type AdminSchoolValues = z.infer<typeof AdminSchoolSchema>;

interface IPops {
  provinceOptions: { label: string; value: string }[];
  selectedSchool: (e: string) => void;
}

export default function AdminSchoolSelect({
  provinceOptions,
  selectedSchool,
}: IPops) {
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [subdistricts, setSubdistricts] = useState<
    { label: string; value: string }[]
  >([]);
  const [school, setSchool] = useState<{ label: string; value: string }[]>([]);

  const form = useForm<AdminSchoolValues>({
    resolver: zodResolver(AdminSchoolSchema),
    defaultValues: {
      province: "",
      city: "",
      subdistrict: "",
      school: "",
    },
  });

  const selectedProvince = form.watch("province");
  const selectedCity = form.watch("city");
  const selectedSubdistrict = form.watch("subdistrict");

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
      }
    }

    getSubdistrict();
  }, [selectedCity]);

  useEffect(() => {
    async function getSchool() {
      if (!selectedSubdistrict) {
        setSchool([]);
        return;
      }

      try {
        const response = await getSchoolAction(selectedSubdistrict);
        if (response.data && Array.isArray(response.data)) {
          const schoolOptions = response.data
            .map((school: any) => ({
              label: school.name,
              value: `${school.id}`,
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));

          setSchool(schoolOptions);
        }
      } catch (error) {
        console.error("Error fetching subdistricts:", error);
        setSchool([]);
      }
    }

    getSchool();
  }, [selectedSubdistrict]);

  // Reset Value while data change
  useEffect(() => {
    if (selectedProvince && form.getValues("city")) {
      form.setValue("city", "");
      form.setValue("subdistrict", "");
    }
  }, [selectedProvince, form]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Pilih Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action="" className="flex flex-col gap-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <ReusableCombobox
                          placeholder="Pilih Provinsi"
                          className="text-sm"
                          onChange={field.onChange}
                          value={field.value}
                          options={provinceOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
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
                          disabled={!selectedProvince}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="subdistrict"
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
                          disabled={!selectedCity}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sekolah</FormLabel>
                      <FormControl>
                        <ReusableCombobox
                          placeholder="Select School"
                          className="text-sm"
                          onChange={(e) => {
                            field.onChange(e);
                            selectedSchool(e);
                          }}
                          value={field.value}
                          options={school} // Ini data sekolah dari API
                          disabled={school.length == 0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
