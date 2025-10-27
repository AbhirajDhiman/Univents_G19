import { useState } from "react";
import { Settings as SettingsIcon, Palette, Mail, Shield, Globe, Megaphone, Database, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AdminPlatformSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    branding: {
      platformName: "EventFlow",
      tagline: "Discover Amazing Events",
      logoUrl: "/logo.png",
      primaryColor: "#667eea",
      secondaryColor: "#764ba2"
    },
    features: {
      userRegistration: true,
      eventCreation: true,
      eventApproval: true,
      publicEventBrowsing: true,
      notifications: true,
      analytics: true
    },
    moderation: {
      autoApproval: false,
      requireEventApproval: true,
      profanityFilter: true,
      spamDetection: true
    },
    email: {
      smtpServer: "smtp.example.com",
      smtpPort: "587",
      fromEmail: "noreply@eventflow.com",
      fromName: "EventFlow Team"
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: "We're currently performing scheduled maintenance. Please check back soon."
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Platform settings have been updated successfully.",
      });
    }, 1500);
  };

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to verify your SMTP configuration.",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup initiated",
      description: "Platform data backup has been started.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Platform Settings</h1>
              <p className="text-muted-foreground">Configure global platform settings and preferences</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-primary text-white hover:shadow-glow"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>

          <Tabs defaultValue="branding" className="w-full">
            <TabsList className="grid w-full grid-cols-5 glass mb-8">
              <TabsTrigger value="branding" className="text-sm">
                <Palette className="h-4 w-4 mr-2" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="features" className="text-sm">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Features
              </TabsTrigger>
              <TabsTrigger value="moderation" className="text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Moderation
              </TabsTrigger>
              <TabsTrigger value="email" className="text-sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="system" className="text-sm">
                <Database className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Platform Branding
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input
                        id="platformName"
                        value={settings.branding.platformName}
                        onChange={(e) => handleSettingChange('branding', 'platformName', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={settings.branding.tagline}
                        onChange={(e) => handleSettingChange('branding', 'tagline', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={settings.branding.logoUrl}
                      onChange={(e) => handleSettingChange('branding', 'logoUrl', e.target.value)}
                      className="glass focus:shadow-glow"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.branding.primaryColor}
                          onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
                          className="w-16 h-10 p-1 glass"
                        />
                        <Input
                          value={settings.branding.primaryColor}
                          onChange={(e) => handleSettingChange('branding', 'primaryColor', e.target.value)}
                          className="flex-1 glass focus:shadow-glow"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={settings.branding.secondaryColor}
                          onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
                          className="w-16 h-10 p-1 glass"
                        />
                        <Input
                          value={settings.branding.secondaryColor}
                          onChange={(e) => handleSettingChange('branding', 'secondaryColor', e.target.value)}
                          className="flex-1 glass focus:shadow-glow"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Platform Features
                  </CardTitle>
                  <CardDescription>Enable or disable platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(settings.features).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {key === 'userRegistration' && "Allow new users to register accounts"}
                          {key === 'eventCreation' && "Allow organizers to create new events"}
                          {key === 'eventApproval' && "Require admin approval for new events"}
                          {key === 'publicEventBrowsing' && "Allow public browsing of approved events"}
                          {key === 'notifications' && "Enable notification system"}
                          {key === 'analytics' && "Enable analytics and reporting features"}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleSettingChange('features', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Content Moderation
                  </CardTitle>
                  <CardDescription>Configure automated moderation and content filtering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(settings.moderation).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {key === 'autoApproval' && "Automatically approve events from verified organizers"}
                          {key === 'requireEventApproval' && "All events must be approved before going live"}
                          {key === 'profanityFilter' && "Filter inappropriate language in event content"}
                          {key === 'spamDetection' && "Detect and prevent spam content"}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleSettingChange('moderation', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>Configure SMTP settings for sending emails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpServer">SMTP Server</Label>
                      <Input
                        id="smtpServer"
                        value={settings.email.smtpServer}
                        onChange={(e) => handleSettingChange('email', 'smtpServer', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.email.smtpPort}
                        onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
                        className="glass focus:shadow-glow"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleTestEmail}
                      variant="outline"
                      className="glass hover:shadow-glow"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Test Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-xl font-light flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Management
                  </CardTitle>
                  <CardDescription>System maintenance and data management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to prevent user access
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenance.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenance', 'maintenanceMode', checked)}
                    />
                  </div>

                  {settings.maintenance.maintenanceMode && (
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={settings.maintenance.maintenanceMessage}
                        onChange={(e) => handleSettingChange('maintenance', 'maintenanceMessage', e.target.value)}
                        className="glass focus:shadow-glow"
                        placeholder="Message to display during maintenance..."
                      />
                    </div>
                  )}

                  <div className="pt-6 border-t border-border/50">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">Data Management</h4>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleBackup}
                          variant="outline"
                          className="glass hover:shadow-glow"
                        >
                          <Database className="h-4 w-4 mr-2" />
                          Create Backup
                        </Button>
                        <Button
                          variant="outline"
                          className="glass hover:shadow-glow"
                        >
                          <Megaphone className="h-4 w-4 mr-2" />
                          Send Announcement
                        </Button>
                      </div>
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