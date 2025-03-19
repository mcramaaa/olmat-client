import type { Metadata } from "next";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { AccountForm } from "./_components/account-form";
import { PasswordForm } from "@/src/components/password-form";

export const metadata: Metadata = {
  title: "Account - Math Olympiad 2025",
  description: "Manage your account settings",
};

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and school details
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
                      className="h-4 w-4"
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
                      className="h-4 w-4"
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
                      className="h-4 w-4"
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
                      className="h-4 w-4"
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
