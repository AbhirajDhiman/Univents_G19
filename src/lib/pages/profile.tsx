import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const userProfile = {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1-555-0123",
    location: "San Francisco, CA",
    bio: "Passionate about technology and innovation. Love attending tech conferences and networking events.",
    joinedDate: "2023-01-15",
    role: "Participant",
    avatar: "/placeholder.svg",
    stats: {
      eventsAttended: 12,
      upcomingEvents: 3,
      favoriteCategories: ["Technology", "Business", "Innovation"]
    }
  };

  const recentEvents = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      date: "2025-03-15",
      status: "registered",
      category: "Technology"
    },
    {
      id: 2,
      title: "Startup Networking Mixer",
      date: "2025-02-10",
      status: "attended",
      category: "Business"
    },
    {
      id: 3,
      title: "Creative Design Workshop",
      date: "2025-03-20",
      status: "registered",
      category: "Arts"
    }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      registered: "bg-primary/20 text-primary",
      attended: "bg-success/20 text-success",
      cancelled: "bg-destructive/20 text-destructive"
    };
    return variants[status] || variants.registered;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isLoading}
              className={isEditing ? "bg-gradient-primary text-white hover:shadow-glow" : "glass hover:shadow-glow"}
            >
              {isEditing ? (
                isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-primary text-white"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-light mb-2">{userProfile.name}</h2>
                  <Badge className="bg-primary/20 text-primary mb-4">
                    {userProfile.role}
                  </Badge>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-2xl font-light text-primary">
                        {userProfile.stats.eventsAttended}
                      </div>
                      <div className="text-xs text-muted-foreground">Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-primary">
                        {userProfile.stats.upcomingEvents}
                      </div>
                      <div className="text-xs text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-primary">
                        {userProfile.stats.favoriteCategories.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Interests</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="text-lg font-light">Interests</CardTitle>
                  <CardDescription>Your favorite event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.stats.favoriteCategories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass mb-6">
                  <TabsTrigger value="details">Personal Details</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card className="glass border-primary/20 shadow-neumorphic">
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Personal Information</CardTitle>
                      <CardDescription>Update your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            defaultValue="Alex"
                            disabled={!isEditing}
                            className="glass focus:shadow-glow"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            defaultValue="Thompson"
                            disabled={!isEditing}
                            className="glass focus:shadow-glow"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            defaultValue={userProfile.email}
                            disabled={!isEditing}
                            className="pl-10 glass focus:shadow-glow"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            defaultValue={userProfile.phone}
                            disabled={!isEditing}
                            className="pl-10 glass focus:shadow-glow"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            defaultValue={userProfile.location}
                            disabled={!isEditing}
                            className="pl-10 glass focus:shadow-glow"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          defaultValue={userProfile.bio}
                          disabled={!isEditing}
                          className="glass focus:shadow-glow h-24"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border/50">
                        <Calendar className="h-4 w-4" />
                        Member since {new Date(userProfile.joinedDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card className="glass border-primary/20 shadow-neumorphic">
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Recent Activity</CardTitle>
                      <CardDescription>Your recent event interactions and registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-4 rounded-lg glass border border-primary/10"
                          >
                            <div className="space-y-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {event.category}
                                </Badge>
                              </div>
                            </div>
                            <Badge className={getStatusBadge(event.status)}>
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}