"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  getCityAction,
  getSchoolAction,
  getSubdistrictAction,
  submitRegistrationAction,
} from "../account.action";
import { ReusableCombobox } from "@/components/ui/reusable-combobox";
import { Frown } from "lucide-react";
import { useLayout } from "@/hooks/zustand/layout";
import { setCookie } from "cookies-next";

const accountSchema = z
  .object({
    province: z.string().min(1, { message: "Province is required" }),
    city: z.string().min(1, { message: "City is required" }),
    subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
    school: z.string().min(1, { message: "School name is required" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    whatsapp: z.string().min(1, { message: "WhatsApp number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountSchema>;

interface IProps {
  province: { id: string; name: string }[];
}

export function AccountRegistrationForm(props: IProps) {
  const router = useRouter();
  const { setIsSuccess } = useLayout();
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [subdistricts, setSubdistricts] = useState<
    { label: string; value: string }[]
  >([]);
  const [school, setSchool] = useState<{ label: string; value: string }[]>([]);
  const [isSchool, setIsSchool] = useState<string>();

  const [serverErrors, setServerErrors] = useState<any>(null);

  const provOptions = props.province
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      province: "",
      city: "",
      subdistrict: "",
      school: "",
      fullName: "",
      email: "",
      whatsapp: "",
      password: "",
      confirmPassword: "",
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

  console.log("err", serverErrors);
  // Submit
  async function onSubmitData(data: AccountFormValues) {
    setIsLoading(true);
    setServerErrors(null);

    try {
      const res = await submitRegistrationAction(data);
      console.log(res);

      if (res.success) {
        console.log("sukses data", res.data.data);
        setCookie("CBO_Auth", res.data.data);
        setIsSuccess(true, "Yeay, pendaftaran berhasil");
        router.push("/register/success?type=account");
      } else {
        const err = res.errCause;
        if (err) {
          if (err.phone) {
            setServerErrors("Yah... Sayangnya No Whatsapp telah terdaftar");
            form.setError("whatsapp", {
              type: "server",
              message: "No Whatsapp telah terdaftar",
            });
          }
          if (err.email) {
            setServerErrors("Yah... Sayangnya Email telah terdaftar");
            form.setError("email", {
              type: "server",
              message: "Email telah terdaftar",
            });
          }
          if (err.email && err.phone) {
            setServerErrors(
              "Yahh... Sayangnya Email dan No Whatsapp telah terdaftar"
            );
          }
        }

        console.log("cokk", res.errCause);

        // Handle API errors
        // if (res.message) {
        //   setServerErrors(res.message);
        // }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setServerErrors("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {serverErrors && (
          <div className="flex items-center gap-2 px-4 py-2 mb-4 text-sm text-red-700 border border-red-200 rounded bg-red-50">
            <Frown />
            <p>{serverErrors}</p>

            <p className="hidden">{isSchool}</p>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitData)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <ReusableCombobox
                        placeholder="Pilih Provinsi"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={provOptions}
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
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <ReusableCombobox
                        placeholder="Pilih Kota"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={cities}
                        disabled={!selectedProvince || isLoading}
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
                    <FormLabel>Subdistrict</FormLabel>
                    <FormControl>
                      <ReusableCombobox
                        placeholder="Pilih Kecamatan"
                        className="text-sm"
                        onChange={field.onChange}
                        value={field.value}
                        options={subdistricts}
                        disabled={!selectedCity || isLoading}
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
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <ReusableCombobox
                        placeholder="Select School"
                        className="text-sm"
                        onChange={(e) => {
                          field.onChange(e);
                          setIsSchool(e);
                        }}
                        value={field.value}
                        options={school} // Ini data sekolah dari API
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Masukkan nama lengkap"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        disabled={isLoading}
                        placeholder="Masukkan Email"
                      />
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
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="08**********"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        disabled={isLoading}
                        placeholder="Masukkan Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        disabled={isLoading}
                        placeholder="Masukkan konfirmasi Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Register Account"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
