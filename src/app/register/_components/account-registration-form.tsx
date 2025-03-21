"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Card, CardContent } from "@/src/components/ui/card";
import { SearchableSelect } from "@/src/components/ui/searchabel-select";
import {
  getCityAction,
  getSubdistrictAction,
  submitRegistrationAction,
} from "../account.action";

const accountSchema = z
  .object({
    province: z.string().min(1, { message: "Province is required" }),
    city: z.string().min(1, { message: "City is required" }),
    subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
    schoolName: z.string().min(1, { message: "School name is required" }),
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
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [subdistricts, setSubdistricts] = useState<
    { label: string; value: string }[]
  >([]);
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
      schoolName: "",
      fullName: "",
      email: "",
      whatsapp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedProvince = form.watch("province");
  const selectedCity = form.watch("city");

  // Fetch cities when province changes
  useEffect(() => {
    async function fetchCities() {
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
        setCities([]);
      }
    }

    fetchCities();
  }, [selectedProvince]);

  // Fetch subdistricts when city changes
  useEffect(() => {
    async function fetchSubdistricts() {
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

    fetchSubdistricts();
  }, [selectedCity]);

  // Reset city when province changes
  useEffect(() => {
    if (selectedProvince && form.getValues("city")) {
      form.setValue("city", "");
      form.setValue("subdistrict", "");
    }
  }, [selectedProvince, form]);

  // Handle form submission
  async function onSubmitData(data: AccountFormValues) {
    setIsLoading(true);
    setServerErrors(null);

    try {
      // Call the server action with form data
      const result = await submitRegistrationAction(data);

      if (result.success) {
        // Redirect on success
        router.push("/register/success?type=account");
      } else {
        // Handle validation errors
        if (result.errors) {
          // Set form errors
          Object.entries(result.errors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(field as any, {
                type: "server",
                message: errors[0],
              });
            }
          });
        }

        // Handle API errors
        if (result.message) {
          setServerErrors(result.message);
        }
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
          <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded bg-red-50">
            {serverErrors}
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
                      <SearchableSelect
                        className="text-sm"
                        onValueChange={field.onChange}
                        value={field.value}
                        options={provOptions}
                        disabled={isLoading}
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
                      <SearchableSelect
                        className="text-sm"
                        onValueChange={field.onChange}
                        value={field.value}
                        options={cities}
                        disabled={!selectedProvince || isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subdistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdistrict</FormLabel>
                    <FormControl>
                      <SearchableSelect
                        className="text-sm"
                        onValueChange={field.onChange}
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
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={isLoading} />
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
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} disabled={isLoading} />
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
                      <Input type="password" {...field} disabled={isLoading} />
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
