import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock, Palette, Save, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  // Local state for UI toggles (for demonstration)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleSave = () => {
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings, application preferences, and security configurations.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <User className="h-4 w-4" />
            <span className="font-medium">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <Palette className="h-4 w-4" />
            <span className="font-medium">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <Bell className="h-4 w-4" />
            <span className="font-medium">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <Lock className="h-4 w-4" />
            <span className="font-medium">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userInfo?.name || "User Name"} className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userInfo?.email || "user@example.com"} className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={userInfo?.role || "Student"} disabled className="bg-gray-50 capitalize" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 0000000000" className="bg-white" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 px-6 py-4 rounded-b-xl flex justify-end">
              <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize how the dashboard looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Communication</CardTitle>
              <CardDescription>Manage how you receive alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-gray-900">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive fee receipts, result cards, and notices via email.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-gray-900">SMS Alerts</Label>
                  <p className="text-sm text-gray-500">Get important alerts and attendance updates via SMS.</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>Update your password and secure your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="bg-white" />
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-xl border border-red-200 bg-red-50 flex items-start gap-4">
                <ShieldAlert className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="text-red-800 font-semibold mb-1">Two-Factor Authentication</h4>
                  <p className="text-red-700/80 text-sm mb-3">Add an extra layer of security to your account. We highly recommend enabling 2FA.</p>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50 px-6 py-4 rounded-b-xl flex justify-end">
              <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
