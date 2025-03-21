import type { Metadata } from "next";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { AccountRegistrationForm } from "./_components/account-registration-form";
import { SchoolRegistrationForm } from "./_components/school-registration-form";
import { getProvinceAction } from "./account.action";

export const metadata: Metadata = {
  title: "Register - Math Olympiad 2025",
  description: "Register for the International Mathematics Olympiad 2025",
};

interface IProps {
  searchParams: {
    sec?: string;
  };
}

export default async function RegisterPage({ searchParams }: IProps) {
  const resProvince = await getProvinceAction();
  const { sec } = await searchParams;
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Registration</h1>
          <p className="text-gray-500">
            Choose the type of registration you want to complete
          </p>
        </div>

        <Tabs defaultValue={sec ? `${sec}` : "account"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account Registration</TabsTrigger>
            <TabsTrigger value="school">School Registration</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                Account Registration
              </h2>
              <p className="text-gray-500">
                Create an account to register participants for the Math
                Olympiad. You ll need an account to register participants.
              </p>
            </div>
            <AccountRegistrationForm province={resProvince.data} />
          </TabsContent>

          <TabsContent value="school" className="mt-6">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">
                School Registration
              </h2>
              <p className="text-gray-500">
                Register your school for the Math Olympiad.
              </p>
            </div>
            <SchoolRegistrationForm />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>{" "}
            to register participants.
          </p>
        </div>
      </div>
    </div>
  );
}
