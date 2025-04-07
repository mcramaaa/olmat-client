import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountForm } from "./_components/account-form";
import { PasswordForm } from "@/components/password-form";

export const metadata: Metadata = {
  title: "Account - Math Olympiad 2025",
  description: "Manage your account settings",
};

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Akun Saya</h1>
        <p className="text-gray-500">
          Perbarui informasi akun dan keamanan kamu.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="password">Kata Sandi</TabsTrigger>
          {/* <TabsTrigger value="notifications"></TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil Saya</CardTitle>
              <CardDescription>
                Perbarui informasi akun dan data diri kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AccountForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PasswordForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about your account
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="email-notifications" className="sr-only">
                      Email Notifications
                    </Label>
                    <Input
                      id="email-notifications"
                      type="checkbox"
                      className="w-4 h-4"
                      defaultChecked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Registration Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your registration status
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="registration-updates" className="sr-only">
                      Registration Updates
                    </Label>
                    <Input
                      id="registration-updates"
                      type="checkbox"
                      className="w-4 h-4"
                      defaultChecked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Competition Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming competition dates
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="competition-reminders" className="sr-only">
                      Competition Reminders
                    </Label>
                    <Input
                      id="competition-reminders"
                      type="checkbox"
                      className="w-4 h-4"
                      defaultChecked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing emails about future events
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="marketing-emails" className="sr-only">
                      Marketing Emails
                    </Label>
                    <Input
                      id="marketing-emails"
                      type="checkbox"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
