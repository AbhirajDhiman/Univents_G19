import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Users, Star, Clock, Share2, Heart, ExternalLink, User, DollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function EventDetail() {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  // Mock event data - in real app this would be fetched based on ID
  const event = {
    id: 1,
    title: "React Developer Conference 2024",
    slug: "react-developer-conference-2024",
    description: `Join us for the most comprehensive React conference of the year! This full-day event brings together industry experts, thought leaders, and passionate developers to explore the latest in React development.

Whether you're a beginner looking to learn the fundamentals or an experienced developer wanting to stay ahead of the curve, this conference has something for everyone.

## What You'll Learn

- React 18 and the latest features
- Server Components and Suspense
- Performance optimization techniques
- Testing strategies for React applications
- Building scalable React architectures
- State management best practices

## Who Should Attend

- Frontend developers working with React
- Full-stack developers
- Technical leads and architects
- Students and bootcamp graduates
- Anyone interested in modern web development

Come network with fellow developers, learn from the best in the industry, and take your React skills to the next level!`,
    date: "Dec 15, 2024",
    time: "9:00 AM - 6:00 PM",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    address: "747 Howard St, San Francisco, CA 94103",
    price: 89,
    originalPrice: 120,
    attendees: 450,
    maxAttendees: 500,
    category: "Technology",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
    organizer: {
      name: "React Community SF",
      avatar: "/api/placeholder/64/64",
      bio: "San Francisco's premier React developer community organizing events since 2019",
      eventsCount: 24,
      followersCount: 2500
    },
    tags: ["React", "JavaScript", "Frontend", "Development", "Networking"],
    featured: true,
    status: "approved",
    requirements: [
      "Basic knowledge of JavaScript",
      "Familiarity with React fundamentals",
      "Laptop for hands-on sessions"
    ],
    includes: [
      "Full day access to all sessions",
      "Lunch and refreshments",
      "Conference materials and swag",
      "Networking opportunities",
      "Access to recordings"
    ],
    speakers: [
      {
        name: "Sarah Chen",
        role: "Senior Engineer at Meta",
        avatar: "/api/placeholder/48/48",
        topic: "React Server Components Deep Dive"
      },
      {
        name: "Alex Rodriguez", 
        role: "React Core Team",
        avatar: "/api/placeholder/48/48",
        topic: "The Future of React"
      },
      {
        name: "Emily Johnson",
        role: "Tech Lead at Vercel",
        avatar: "/api/placeholder/48/48",
        topic: "Performance at Scale"
      }
    ],
    schedule: [
      { time: "9:00 AM", title: "Registration & Coffee", type: "break" },
      { time: "9:30 AM", title: "Opening Keynote: The Future of React", speaker: "Alex Rodriguez", type: "talk" },
      { time: "10:30 AM", title: "React Server Components Deep Dive", speaker: "Sarah Chen", type: "talk" },
      { time: "11:30 AM", title: "Coffee Break", type: "break" },
      { time: "12:00 PM", title: "Performance at Scale", speaker: "Emily Johnson", type: "talk" },
      { time: "1:00 PM", title: "Lunch & Networking", type: "break" },
      { time: "2:00 PM", title: "Hands-on Workshop: Building with React 18", type: "workshop" },
      { time: "3:30 PM", title: "Panel Discussion: Industry Best Practices", type: "panel" },
      { time: "4:30 PM", title: "Q&A and Closing Remarks", type: "talk" },
      { time: "5:00 PM", title: "Networking Reception", type: "break" }
    ]
  };

  const handleRegister = () => {
    if (isRegistered) {
      toast({
        title: "Registration cancelled",
        description: "You have successfully cancelled your registration.",
      });
    } else {
      toast({
        title: "Registration successful!",
        description: "You've been registered for this event. Check your email for details.",
      });
    }
    setIsRegistered(!isRegistered);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Event removed from your favorites" : "Event added to your favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  const spotsRemaining = event.maxAttendees - event.attendees;
  const capacityPercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            {event.featured && (
              <Badge className="bg-primary text-white">Featured</Badge>
            )}
            <Badge className="bg-black/50 text-white">{event.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{event.rating}</span>
                <span className="text-muted-foreground ml-1">({event.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {event.attendees} attending
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={isLiked ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Event Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-line text-muted-foreground">
                    {event.description}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                  <CardDescription>Full day agenda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                        <div className="text-sm font-medium text-primary min-w-[80px]">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          {item.speaker && (
                            <p className="text-sm text-muted-foreground">by {item.speaker}</p>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            item.type === 'talk' ? 'border-blue-200 text-blue-800' :
                            item.type === 'workshop' ? 'border-green-200 text-green-800' :
                            item.type === 'panel' ? 'border-purple-200 text-purple-800' :
                            'border-gray-200 text-gray-800'
                          }
                        >
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speakers" className="space-y-4">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle>Featured Speakers</CardTitle>
                  <CardDescription>Learn from industry experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={speaker.avatar} />
                          <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{speaker.name}</h4>
                          <p className="text-primary font-medium">{speaker.role}</p>
                          <p className="text-muted-foreground mt-1">{speaker.topic}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle>Event Location</CardTitle>
                  <CardDescription>Venue details and directions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-lg">{event.venue}</h4>
                    <p className="text-muted-foreground">{event.address}</p>
                  </div>
                  
                  <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive map would be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card className="gradient-card border-0 sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">${event.price}</span>
                    {event.originalPrice > event.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${event.originalPrice}
                      </span>
                    )}
                  </div>
                  {event.originalPrice > event.price && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${event.originalPrice - event.price}
                    </p>
                  )}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {spotsRemaining} spots left
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{event.venue}, {event.location}</span>
                </div>
              </div>
              
              <Separator />
              
              <Button 
                onClick={handleRegister}
                className={`w-full ${
                  isRegistered 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "gradient-primary"
                } text-white`}
                size="lg"
              >
                {isRegistered ? "Cancel Registration" : "Register Now"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Free cancellation up to 24 hours before the event
              </p>
            </CardContent>
          </Card>

          {/* Organizer Card */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback>
                    {event.organizer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{event.organizer.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{event.organizer.bio}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{event.organizer.eventsCount} events</span>
                    <span>{event.organizer.followersCount} followers</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </CardContent>
          </Card>

          {/* Similar Events */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Similar Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex space-x-3 p-3 bg-muted/20 rounded-lg hover-lift transition-smooth cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop"
                    alt="Event"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm line-clamp-1">
                      {item === 1 ? "UX/UI Design Workshop" : "JavaScript Masterclass"}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {item === 1 ? "Dec 18, 2024" : "Dec 20, 2024"}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-medium text-primary">
                        ${item === 1 ? 45 : 65}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        4.{item === 1 ? 9 : 7}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}