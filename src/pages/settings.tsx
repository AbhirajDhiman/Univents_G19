import { useState } from "react";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Globe, Palette, Database, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      eventReminders: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    privacy: {
      profileVisible: true,
      showAttendedEvents: true,
      shareActivity: false
    },
    preferences: {
      language: "en",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      defaultView: "grid"
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    
    toast({
      title: "Setting updated",
      description: "Your preferences have been saved.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be emailed to you shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We'll send you confirmation instructions via email.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Customize your EventFlow experience</p>
          </div>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass mb-8">
              <TabsTrigger value="appearance" className="text-sm">
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="account" className="text-sm">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance & Display
                  </CardTitle>
                  <CardDescription>Customize how EventFlow looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred color scheme
                      </p>
                    </div>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[140px] glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <SettingsIcon className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Select your display language
                      </p>
                    </div>
                    <Select 
                      value={settings.preferences.language}
                      onValueChange={(value) => handleSettingChange('preferences', 'language', value)}
                    >
                      <SelectTrigger className="w-[140px] glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Timezone</Label>
                      <p className="text-sm text-muted-foreground">
                        Set your local timezone for events
                      </p>
                    </div>
                    <Select 
                      value={settings.preferences.timezone}
                      onValueChange={(value) => handleSettingChange('preferences', 'timezone', value)}
                    >
                      <SelectTrigger className="w-[200px] glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Control how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get instant notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Event Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Reminders before events you're registered for
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.eventReminders}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'eventReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly summary of upcoming events
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'weeklyDigest', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Updates about new features and promotions
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'marketingEmails', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch
                      checked={settings.privacy.profileVisible}
                      onCheckedChange={(checked) => handleSettingChange('privacy', 'profileVisible', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Show Attended Events</Label>
                      <p className="text-sm text-muted-foreground">
                        Display events you've attended on your profile
                      </p>
                    </div>
                    <Switch
                      checked={settings.privacy.showAttendedEvents}
                      onCheckedChange={(checked) => handleSettingChange('privacy', 'showAttendedEvents', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Share Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your event activity
                      </p>
                    </div>
                    <Switch
                      checked={settings.privacy.shareActivity}
                      onCheckedChange={(checked) => handleSettingChange('privacy', 'shareActivity', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Data & Account
                  </CardTitle>
                  <CardDescription>Manage your account data and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Export Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your account data
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="glass hover:shadow-glow"
                      onClick={handleExportData}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base text-destructive">Delete Account</Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="bg-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}