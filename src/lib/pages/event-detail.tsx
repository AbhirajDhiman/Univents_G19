import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Star, Clock, Share2, Heart, User, Tag, ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  // Mock event data based on ID
  const events = {
    "1": {
      id: 1,
      title: "CodeFest 2025: 24-Hour Hackathon",
      slug: "codefest-2025-hackathon",
      description: `Join Punjab's biggest coding marathon organized by CODECAMPUS! This is your chance to build innovative solutions, compete with the best minds from across North India, and win exciting prizes worth ₹50,000.

## Event Highlights

- **24-Hour Coding Marathon**: Non-stop coding challenge
- **Problem Statements**: Real-world problems from industry partners
- **Mentorship**: Guidance from senior developers and industry experts
- **Networking**: Connect with tech enthusiasts and potential employers
- **Prizes**: Cash prizes, internship opportunities, and goodies

## Tracks Available

1. **Web Development**: Build full-stack applications
2. **AI/ML**: Create intelligent solutions
3. **Mobile Apps**: Develop cross-platform applications
4. **Open Innovation**: Surprise us with your creativity

## Who Should Participate

- Computer Science and IT students
- Anyone passionate about coding
- Team size: 2-4 members
- All skill levels welcome

Bring your laptops, chargers, and enthusiasm. Food, beverages, and workstations will be provided throughout the event!`,
      date: "15 Dec, 2025",
      time: "10:00 AM - 10:00 AM (Next Day)",
      startTime: "10:00 AM",
      endTime: "10:00 AM (Next Day)",
      location: "Ludhiana, Punjab",
      venue: "Main Auditorium, Block-A",
      address: "LPU Campus, Jalandhar-Delhi G.T. Road, Phagwara, Punjab 144411",
      price: 150,
      attendees: 180,
      maxAttendees: 200,
      category: "Hackathon",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
      organizer: {
        name: "CODECAMPUS",
        avatar: "/api/placeholder/64/64",
        bio: "Premier coding club of Punjab fostering innovation through hackathons, workshops, and coding competitions since 2018.",
        eventsCount: 32,
        membersCount: 450
      },
      tags: ["Coding", "Competition", "Team Event", "Prizes", "24-Hour"],
      featured: true,
      requirements: [
        "Laptop with development environment setup",
        "Basic programming knowledge",
        "Team of 2-4 members (can form at venue)",
        "Valid college ID card"
      ],
      includes: [
        "24-hour access to venue and workstations",
        "Free meals (breakfast, lunch, dinner, snacks)",
        "Mentorship from industry experts",
        "Participation certificate",
        "Swag kit and goodies",
        "Networking with tech companies"
      ],
      speakers: [
        {
          name: "Rajesh Kumar",
          role: "Senior Software Engineer, Google India",
          avatar: "/api/placeholder/48/48",
          topic: "Building Scalable Systems"
        },
        {
          name: "Priya Sharma", 
          role: "Tech Lead, Microsoft Gurugram",
          avatar: "/api/placeholder/48/48",
          topic: "Modern Web Architecture"
        },
        {
          name: "Arjun Singh",
          role: "Founder, TechStartup Punjab",
          avatar: "/api/placeholder/48/48",
          topic: "From Idea to Product"
        }
      ],
      schedule: [
        { time: "10:00 AM", title: "Registration & Team Formation", type: "registration" },
        { time: "11:00 AM", title: "Opening Ceremony & Problem Statement Release", speaker: "Organizing Team", type: "ceremony" },
        { time: "12:00 PM", title: "Coding Begins!", type: "coding" },
        { time: "2:00 PM", title: "Lunch Break", type: "break" },
        { time: "3:00 PM", title: "Mentor Session: Building Scalable Systems", speaker: "Rajesh Kumar", type: "mentoring" },
        { time: "5:00 PM", title: "Evening Snacks", type: "break" },
        { time: "8:00 PM", title: "Dinner", type: "break" },
        { time: "11:00 PM", title: "Midnight Snacks & Energy Drinks", type: "break" },
        { time: "6:00 AM", title: "Breakfast", type: "break" },
        { time: "9:00 AM", title: "Final Touches & Code Submission", type: "coding" },
        { time: "10:00 AM", title: "Presentations Begin", type: "presentation" },
        { time: "1:00 PM", title: "Winner Announcement & Prize Distribution", type: "ceremony" }
      ]
    }
  };

  const event = events[id as keyof typeof events] || events["1"];

  const handleRegister = () => {
    if (isRegistered) {
      toast({
        title: "Registration Cancelled",
        description: "Your registration has been cancelled successfully.",
        variant: "destructive"
      });
      setIsRegistered(false);
    } else {
      toast({
        title: "Registration Successful! 🎉",
        description: `You're registered for ${event.title}. Check your email for details.`,
      });
      setIsRegistered(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from Favorites" : "Added to Favorites ❤️",
      description: isLiked ? "Event removed from your favorites" : "Event saved to your favorites",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 🔗",
        description: "Event link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Share Event",
        description: "Share this event with your friends!",
      });
    }
  };

  const spotsRemaining = event.maxAttendees - event.attendees;
  const capacityPercentage = (event.attendees / event.maxAttendees) * 100;
  const isAlmostFull = spotsRemaining <= 20;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4 hover:bg-muted/50 transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8 group">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            {event.featured && (
              <Badge className="bg-primary text-white shadow-lg animate-pulse">
                Featured Event
              </Badge>
            )}
            <Badge className="bg-black/50 backdrop-blur-sm text-white">{event.category}</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Buttons */}
          <div className="flex items-center justify-between p-4 glass rounded-xl">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="font-bold text-lg">{event.rating}</span>
                <span className="text-muted-foreground ml-1 text-sm">({event.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span className="font-medium">{event.attendees} registered</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`glass transition-all ${isLiked ? "text-red-500 border-red-300 bg-red-50 dark:bg-red-950/20" : ""}`}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="glass">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Event Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="speakers" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Mentors
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Venue
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card className="gradient-card border-0 hover-lift transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Event</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {event.description}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="gradient-card border-0 hover-lift transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.includes.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="gradient-card border-0 hover-lift transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <XCircle className="mr-2 h-5 w-5 text-blue-600" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="gradient-card border-0 hover-lift transition-all">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Event Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 mt-6">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Event Schedule</CardTitle>
                  <CardDescription>Complete day timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all hover-lift">
                        <div className="text-sm font-bold text-primary min-w-[90px] bg-primary/10 px-3 py-2 rounded-lg">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{item.title}</h4>
                          {item.speaker && (
                            <p className="text-sm text-muted-foreground mt-1">by {item.speaker}</p>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${item.type === 'coding' ? 'border-blue-300 bg-blue-50 text-blue-800 dark:bg-blue-950/30' : ''}
                            ${item.type === 'mentoring' ? 'border-green-300 bg-green-50 text-green-800 dark:bg-green-950/30' : ''}
                            ${item.type === 'presentation' ? 'border-purple-300 bg-purple-50 text-purple-800 dark:bg-purple-950/30' : ''}
                            ${item.type === 'ceremony' ? 'border-yellow-300 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/30' : ''}
                            ${item.type === 'break' ? 'border-gray-300 bg-gray-50 text-gray-800 dark:bg-gray-950/30' : ''}
                            ${item.type === 'registration' ? 'border-pink-300 bg-pink-50 text-pink-800 dark:bg-pink-950/30' : ''}
                          `}
                        >
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speakers" className="space-y-4 mt-6">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Featured Mentors</CardTitle>
                  <CardDescription>Learn from experienced professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-start space-x-4 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all hover-lift">
                        <Avatar className="h-20 w-20 border-2 border-primary/20">
                          <AvatarImage src={speaker.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                            {speaker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-bold text-xl">{speaker.name}</h4>
                          <p className="text-primary font-semibold">{speaker.role}</p>
                          <p className="text-muted-foreground mt-2">{speaker.topic}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-6">
              <Card className="gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Event Venue</CardTitle>
                  <CardDescription>Location details and directions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xl mb-2">{event.venue}</h4>
                    <p className="text-muted-foreground flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {event.address}
                    </p>
                  </div>
                  
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                    <div className="text-center text-muted-foreground p-8">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">Google Maps integration would appear here</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="glass">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm" className="glass">
                      View on Google Maps
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
          <Card className="gradient-card border-0 sticky top-6 hover-lift transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  {event.price === 0 ? (
                    <div className="text-4xl font-bold text-green-600">FREE</div>
                  ) : (
                    <div className="text-4xl font-bold text-primary">₹{event.price}</div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">per participant</p>
                </div>
                <Badge 
                  variant={isAlmostFull ? "destructive" : "secondary"} 
                  className={`text-xs px-3 py-1 ${isAlmostFull ? 'animate-pulse' : ''}`}
                >
                  {spotsRemaining} spots left
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Registration Status</span>
                  <span className="text-primary">{event.attendees}/{event.maxAttendees}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      capacityPercentage >= 90 ? 'bg-red-500' : 
                      capacityPercentage >= 70 ? 'bg-yellow-500' : 
                      'bg-primary'
                    }`}
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>
                {isAlmostFull && (
                  <p className="text-xs text-destructive font-medium">⚠️ Limited spots remaining!</p>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center p-2 rounded-lg bg-muted/30">
                  <Calendar className="mr-3 h-5 w-5 text-primary" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center p-2 rounded-lg bg-muted/30">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <span className="font-medium">{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-start p-2 rounded-lg bg-muted/30">
                  <MapPin className="mr-3 h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{event.venue}, {event.location}</span>
                </div>
              </div>
              
              <Separator />
              
              <Button 
                onClick={handleRegister}
                className={`w-full h-12 text-base font-bold ${
                  isRegistered 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "gradient-primary"
                } text-white transition-all hover:scale-[1.02]`}
                size="lg"
              >
                {isRegistered ? "✓ Registered" : "Register Now"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Free cancellation up to 24 hours before the event starts
              </p>
            </CardContent>
          </Card>

          {/* Organizer Card */}
          <Card className="gradient-card border-0 hover-lift transition-all">
            <CardHeader>
              <CardTitle className="text-lg">Organized By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                    {event.organizer.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{event.organizer.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{event.organizer.bio}</p>
                </div>
              </div>
              <div className="flex items-center justify-around p-3 bg-muted/30 rounded-lg mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{event.organizer.eventsCount}</div>
                  <div className="text-xs text-muted-foreground">Events</div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{event.organizer.membersCount}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full glass hover:bg-primary hover:text-white transition-all">
                <User className="mr-2 h-4 w-4" />
                View Club Profile
              </Button>
            </CardContent>
          </Card>

          {/* Similar Events */}
          <Card className="gradient-card border-0 hover-lift transition-all">
            <CardHeader>
              <CardTitle className="text-lg">More Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 2, title: "AI & ML Workshop", date: "18 Dec, 2025", price: 100, rating: 4.9, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=80&fit=crop" },
                { id: 3, title: "Tech Talk Series", date: "20 Dec, 2025", price: 0, rating: 4.7, img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=80&h=80&fit=crop" }
              ].map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/event/${item.id}`)}
                  className="flex space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all cursor-pointer hover-lift"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-sm line-clamp-2 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.date}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {item.price === 0 ? 'FREE' : `₹${item.price}`}
                      </span>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{item.rating}</span>
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