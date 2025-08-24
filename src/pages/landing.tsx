import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Star, Search, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Join industry leaders for a day of innovation and networking",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "San Francisco, CA",
      attendees: 250,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop",
      organizer: "TechCorp Events"
    },
    {
      id: 2,
      title: "Creative Design Workshop",
      description: "Learn modern design principles from expert designers",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Online",
      attendees: 85,
      category: "Design",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop",
      organizer: "Design Academy"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Watch promising startups pitch to top investors",
      date: "Dec 20, 2024",
      time: "6:00 PM",
      location: "New York, NY",
      attendees: 180,
      category: "Business",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
      organizer: "StartupHub"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description: "Create and manage events with our intuitive multi-step wizard"
    },
    {
      icon: Users,
      title: "Smart Discovery",
      description: "Find events that match your interests with AI-powered recommendations"
    },
    {
      icon: Shield,
      title: "Secure Registration",
      description: "Safe and secure event registration with instant confirmation"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications about events you care about"
    }
  ];

  const stats = [
    { label: "Events Created", value: "2,500+" },
    { label: "Happy Attendees", value: "50,000+" },
    { label: "Event Organizers", value: "800+" },
    { label: "Cities Covered", value: "120+" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b glass">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">EventFlow</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary text-white hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Sparkles className="mr-1 h-3 w-3" />
              Discover Amazing Events Near You
            </Badge>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Where Great Events
              <span className="block text-primary-glow">Come to Life</span>
            </h1>
            
            <p className="mb-8 text-xl text-white/90 sm:text-2xl max-w-2xl mx-auto">
              Join thousands of event organizers and attendees who trust EventFlow 
              to create unforgettable experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-primary">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Events
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover upcoming events that are trending in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="hover-lift transition-smooth overflow-hidden gradient-card border-0">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
                    {event.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event.attendees} attending
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">by {event.organizer}</span>
                    <Button size="sm" className="gradient-primary text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/discover">
              <Button size="lg" variant="outline" className="group">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EventFlow?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, discover, and manage amazing events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift transition-smooth gradient-card border-0">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of event creators and attendees who trust EventFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-primary">
                <Star className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 gradient-primary rounded-md flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gradient">EventFlow</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 EventFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}