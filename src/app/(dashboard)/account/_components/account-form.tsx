"use client";

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

import { useLayout } from "@/hooks/zustand/layout";

const accountFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  whatsapp: z.string().min(1, { message: "WhatsApp number is required." }),
  province: z.string().min(1, { message: "Province is required." }),
  city: z.string().min(1, { message: "City is required." }),
  subdistrict: z.string().min(1, { message: "Subdistrict is required." }),
  schoolName: z.string().min(1, { message: "School name is required." }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { setIsSuccess, isLoading, setIsLoading } = useLayout();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+62 812 3456 7890",
      whatsapp: "+62 812 3456 7890",
      province: "jakarta",
      city: "Jakarta",
      subdistrict: "Menteng",
      schoolName: "SMA Negeri 1 Jakarta",
    },
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true, "Account information updated successfully");
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jakarta">Jakarta</SelectItem>
                      <SelectItem value="west_java">West Java</SelectItem>
                      <SelectItem value="east_java">East Java</SelectItem>
                      <SelectItem value="central_java">Central Java</SelectItem>
                      <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          {/* <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
