import { Calendar, Clock, MapPin, Users, Star, TrendingUp, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function ParticipantDashboard() {
  const upcomingEvents = [
    {
      id: 1,
      title: "React Developer Meetup",
      date: "Dec 15, 2024",
      time: "7:00 PM",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
      status: "registered"
    },
    {
      id: 2,
      title: "Design System Workshop",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Online",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      status: "registered"
    }
  ];

  const recommendedEvents = [
    {
      id: 3,
      title: "AI & Machine Learning Summit",
      date: "Dec 22, 2024",
      time: "9:00 AM",
      location: "New York, NY",
      attendees: 340,
      category: "Technology",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Startup Networking Event",
      date: "Dec 25, 2024",
      time: "6:00 PM",
      location: "Austin, TX",
      attendees: 120,
      category: "Business",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Creative Photography Workshop",
      date: "Dec 28, 2024",
      time: "10:00 AM",
      location: "Los Angeles, CA",
      attendees: 85,
      category: "Arts",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300&h=200&fit=crop"
    }
  ];

  const interests = ["Technology", "Design", "Business", "Arts", "Health"];
  const stats = [
    { label: "Events Attended", value: "12", change: "+3 this month" },
    { label: "Hours Learned", value: "48", change: "+12 this month" },
    { label: "Connections Made", value: "26", change: "+8 this month" },
    { label: "Certificates Earned", value: "4", change: "+1 this month" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
          <p className="text-muted-foreground mt-1">
            Discover amazing events and continue your learning journey
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Customize
          </Button>
          <Link to="/discover">
            <Button className="gradient-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              Find Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="gradient-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Your Upcoming Events
                </CardTitle>
                <CardDescription>Events you've registered for</CardDescription>
              </div>
              <Link to="/my-events">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg hover-lift transition-smooth">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{event.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {event.location}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Registered
                  </Badge>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 opacity-50 mb-3" />
                  <p>No upcoming events</p>
                  <Link to="/discover">
                    <Button variant="link" className="mt-2">Discover Events</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Events */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Recommended for You
              </CardTitle>
              <CardDescription>Based on your interests and past events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendedEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg hover-lift transition-smooth">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-3 w-3" />
                          {event.attendees} attending
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{event.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="gradient-primary text-white">
                      Register
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Progress */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Learning Journey</CardTitle>
              <CardDescription>Your progress this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Events Goal</span>
                  <span>3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Learning Hours</span>
                  <span>12/20</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Networking</span>
                  <span>8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Your Interests */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Your Interests</CardTitle>
              <CardDescription>Customize your recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {interest}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Interest
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <p className="text-sm">Attended React Meetup</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <p className="text-sm">Registered for Design Workshop</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full" />
                <p className="text-sm">Earned JavaScript Certificate</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}