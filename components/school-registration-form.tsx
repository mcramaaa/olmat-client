"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const schoolSchema = z.object({
  province: z.string().min(1, { message: "Province is required" }),
  city: z.string().min(1, { message: "City is required" }),
  subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  schoolLevel: z.string().min(1, { message: "School level is required" }),
  schoolName: z.string().min(1, { message: "School name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  whatsapp: z.string().min(1, { message: "WhatsApp number is required" }),
})

type SchoolFormValues = z.infer<typeof schoolSchema>

export function SchoolRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      province: "",
      city: "",
      subdistrict: "",
      address: "",
      schoolLevel: "",
      schoolName: "",
      email: "",
      phone: "",
      whatsapp: "",
    },
  })

  function onSubmit(data: SchoolFormValues) {
    setIsLoading(true)

    // In a real application, you would send this data to your backend
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      router.push("/register/success?type=school")
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        {/* Add more provinces as needed */}
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
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subdistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdistrict</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subdistrict" {...field} />
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter school address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="schoolLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select school level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="elementary">Elementary School</SelectItem>
                        <SelectItem value="junior_high">Junior High School</SelectItem>
                        <SelectItem value="senior_high">Senior High School</SelectItem>
                        <SelectItem value="vocational">Vocational School</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Input type="email" placeholder="school@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+62 xxx xxx xxx" {...field} />
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
                      <Input placeholder="+62 8xx xxxx xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering School..." : "Register School"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

