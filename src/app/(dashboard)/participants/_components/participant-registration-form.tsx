"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  photo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
  attachment: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

const participantsSchema = z.object({
  participants: z
    .array(participantSchema)
    .min(1, { message: "At least one participant is required" })
    .max(11, { message: "Maximum 11 participants allowed" }),
});

type ParticipantFormValues = z.infer<typeof participantsSchema>;

export function ParticipantRegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("0");

  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantsSchema),
    defaultValues: {
      participants: [
        {
          name: "",
          gender: undefined,
          dateOfBirth: "",
          email: "",
          phone: "",
          photo: undefined,
          attachment: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  function onSubmit(data: ParticipantFormValues) {
    setIsLoading(true);

    // In a real application, you would send this data to your backend
    setTimeout(() => {
      setIsLoading(false);
      router.push("/register/success?type=participants");
    }, 1000);
  }

  const addParticipant = () => {
    if (fields.length < 11) {
      append({
        name: "",
        gender: "male",
        dateOfBirth: "",
        email: "",
        phone: "",
        photo: undefined,
        attachment: undefined,
      });
      // Set active tab to the newly added participant
      setActiveTab(String(fields.length));
    }
  };

  const removeParticipant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      // If we're removing the active tab, set active tab to the previous one
      if (Number(activeTab) === index) {
        setActiveTab(String(Math.max(0, index - 1)));
      } else if (Number(activeTab) > index) {
        // If we're removing a tab before the active one, adjust the active tab index
        setActiveTab(String(Number(activeTab) - 1));
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participant Registration</CardTitle>
        <CardDescription>
          You can register up to 11 participants. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Participants ({fields.length}/11)
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addParticipant}
                disabled={fields.length >= 11}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Participant
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-11">
                {fields.map((field, index) => (
                  <TabsTrigger
                    key={field.id}
                    value={String(index)}
                    className="relative"
                  >
                    {index + 1}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-2 -right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeParticipant(index);
                        }}
                      >
                        ×
                      </button>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {fields.map((field, index) => (
                <TabsContent
                  key={field.id}
                  value={String(index)}
                  className="pt-4 space-y-4"
                >
                  <div className="flex items-center mb-4 space-x-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-medium">
                      Participant {index + 1}
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name={`participants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter participant's full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`participants.${index}.gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Male
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Female
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`participants.${index}.dateOfBirth`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="participant@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`participants.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+62 8xx xxxx xxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`participants.${index}.photo`}
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>Photo</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...fieldProps}
                              />
                              {value && (
                                <div className="text-sm text-green-600">
                                  File selected: {value.name}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload a photo of the participant. Max size 5MB.
                            Formats: JPG, PNG, WebP.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`participants.${index}.attachment`}
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>Attachment</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...fieldProps}
                              />
                              {value && (
                                <div className="text-sm text-green-600">
                                  File selected: {value.name}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload required documents (ID card, school ID,
                            etc.). Max size 5MB.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between mt-6">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab(String(index - 1))}
                      >
                        Previous
                      </Button>
                    )}
                    {index < fields.length - 1 ? (
                      <Button
                        type="button"
                        className="ml-auto"
                        onClick={() => setActiveTab(String(index + 1))}
                      >
                        Next
                      </Button>
                    ) : (
                      <div className="ml-auto">
                        {fields.length < 11 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="mr-2"
                            onClick={addParticipant}
                          >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Another
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <Separator className="my-6" />

            <Alert>
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Please ensure all participant information is accurate. You can
                register up to 11 participants.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
