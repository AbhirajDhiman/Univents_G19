import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, CheckCircle, XCircle, User, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function MyEvents() {
  const { toast } = useToast();

  const upcomingEvents = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      date: "2025-03-15",
      time: "09:00 AM",
      location: "Tech Center Hall A",
      status: "registered",
      ticketType: "General Admission",
      organizer: "TechCorp Events"
    },
    {
      id: 2,
      title: "Creative Design Workshop",
      date: "2025-03-20",
      time: "02:00 PM", 
      location: "Online - Zoom",
      status: "registered",
      ticketType: "Premium",
      organizer: "Design Academy"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Startup Networking Mixer",
      date: "2025-02-10",
      time: "06:00 PM",
      location: "Innovation Hub",
      status: "attended",
      ticketType: "Free",
      organizer: "Entrepreneur Society"
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      date: "2025-01-25",
      time: "10:00 AM",
      location: "Online - Meet",
      status: "no_show",
      ticketType: "Student",
      organizer: "Code Institute"
    }
  ];

  const handleCancelRegistration = (eventId: number, eventTitle: string) => {
    toast({
      title: "Registration cancelled",
      description: `You have cancelled your registration for ${eventTitle}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      registered: {
        label: "Registered",
        className: "bg-primary/20 text-primary",
        icon: <CheckCircle className="h-3 w-3" />
      },
      attended: {
        label: "Attended", 
        className: "bg-success/20 text-success",
        icon: <CheckCircle className="h-3 w-3" />
      },
      no_show: {
        label: "No Show",
        className: "bg-destructive/20 text-destructive",
        icon: <XCircle className="h-3 w-3" />
      },
      cancelled: {
        label: "Cancelled",
        className: "bg-muted text-muted-foreground",
        icon: <XCircle className="h-3 w-3" />
      }
    };

    const { label, className, icon } = config[status] || config.registered;
    
    return (
      <Badge className={className}>
        {icon}
        <span className="ml-1">{label}</span>
      </Badge>
    );
  };

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Card className="glass border-primary/20 shadow-neumorphic hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl font-light">{event.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            </CardDescription>
          </div>
          {getStatusBadge(event.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {event.organizer}
            </span>
            <span className="flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              {event.ticketType}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/event/${event.id}`}>
              <Button variant="outline" size="sm" className="glass hover:shadow-glow">
                View Details
              </Button>
            </Link>
            
            {!isPast && event.status === "registered" && (
              <Button 
                variant="outline" 
                size="sm" 
                className="glass hover:shadow-glow text-destructive hover:text-destructive"
                onClick={() => handleCancelRegistration(event.id, event.title)}
              >
                Cancel Registration
              </Button>
            )}
            
            {isPast && event.status === "attended" && (
              <Button variant="outline" size="sm" className="glass hover:shadow-glow">
                <Ticket className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">My Events</h1>
            <p className="text-muted-foreground">Track your event journey and upcoming experiences</p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass mb-8">
              <TabsTrigger value="upcoming" className="text-sm">
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="text-sm">
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingEvents.length > 0 ? (
                <div className="grid gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card className="glass border-primary/20 shadow-neumorphic">
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-light mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">
                      Discover amazing events happening around you
                    </p>
                    <Link to="/discover">
                      <Button className="bg-gradient-primary text-white hover:shadow-glow">
                        Explore Events
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastEvents.length > 0 ? (
                <div className="grid gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast={true} />
                  ))}
                </div>
              ) : (
                <Card className="glass border-primary/20 shadow-neumorphic">
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-light mb-2">No past events</h3>
                    <p className="text-muted-foreground">
                      Your event history will appear here after attending events
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}