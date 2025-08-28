import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Image, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState("basics");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your event has been saved as a draft.",
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Event submitted!",
        description: "Your event is now pending approval.",
      });
      navigate("/manage-events");
    }, 2000);
  };

  const categories = [
    "Technology", "Business", "Arts & Culture", "Sports", 
    "Education", "Health", "Community", "Entertainment"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extralight mb-4 text-foreground tracking-tight">Create Event</h1>
            <p className="text-muted-foreground">Bring your vision to life</p>
          </div>

          <Card className="glass border-primary/20 shadow-neumorphic">
            <CardHeader>
              <CardTitle className="text-2xl font-light">Event Details</CardTitle>
              <CardDescription>Create an engaging experience for your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass">
                  <TabsTrigger value="basics" className="text-sm">Basics</TabsTrigger>
                  <TabsTrigger value="schedule" className="text-sm">Schedule</TabsTrigger>
                  <TabsTrigger value="location" className="text-sm">Location</TabsTrigger>
                  <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-6 mt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input 
                        id="title" 
                        placeholder="Amazing Tech Conference 2024"
                        className="glass focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="glass">
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Event Summary</Label>
                    <Textarea 
                      id="summary"
                      placeholder="Brief description of your event..."
                      className="glass focus:shadow-glow h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input 
                      id="tags" 
                      placeholder="ai, technology, innovation (comma separated)"
                      className="glass focus:shadow-glow"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-6 mt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date & Time</Label>
                      <Input 
                        id="startDate" 
                        type="datetime-local"
                        className="glass focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date & Time</Label>
                      <Input 
                        id="endDate" 
                        type="datetime-local"
                        className="glass focus:shadow-glow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input 
                        type="radio" 
                        id="venue" 
                        name="locationType" 
                        className="accent-primary"
                        defaultChecked 
                      />
                      <Label htmlFor="venue" className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Physical Venue</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="radio" 
                        id="online" 
                        name="locationType" 
                        className="accent-primary"
                      />
                      <Label htmlFor="online" className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Online Event</span>
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue/Link</Label>
                    <Input 
                      id="venue" 
                      placeholder="Conference Center or https://meet.example.com"
                      className="glass focus:shadow-glow"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="capacity" 
                        type="number"
                        placeholder="100"
                        className="pl-10 glass focus:shadow-glow"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="banner">Event Banner</Label>
                    <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center glass">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop an image or <span className="text-primary">browse</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Detailed event description with markdown support..."
                      className="glass focus:shadow-glow h-32"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                <Button variant="outline" onClick={handleSaveDraft} className="glass">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-primary text-white hover:shadow-glow"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Submitting..." : "Submit for Approval"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}