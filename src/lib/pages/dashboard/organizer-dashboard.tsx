import { Plus, Calendar, Users, TrendingUp, Eye, Edit, MoreHorizontal, BarChart3, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
  const stats = [
    { label: "Total Events", value: "12", change: "+2 this month", icon: Calendar },
    { label: "Total Registrations", value: "1,248", change: "+156 this month", icon: Users },
    { label: "Avg. Attendance", value: "87%", change: "+5% this month", icon: TrendingUp },
    { label: "Revenue", value: "$4,890", change: "+$680 this month", icon: BarChart3 }
  ];

  const myEvents = [
    {
      id: 1,
      title: "React Developer Meetup",
      date: "Dec 15, 2024",
      time: "7:00 PM",
      status: "live",
      registrations: 85,
      capacity: 100,
      revenue: "$850",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Design System Workshop",
      date: "Dec 18, 2024",
      time: "2:00 PM", 
      status: "approved",
      registrations: 45,
      capacity: 60,
      revenue: "$540",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Tech Innovation Summit",
      date: "Dec 22, 2024",
      time: "9:00 AM",
      status: "pending",
      registrations: 0,
      capacity: 200,
      revenue: "$0",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop"
    }
  ];

  const recentRegistrations = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      event: "React Developer Meetup",
      time: "2 hours ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      event: "Design System Workshop",
      time: "4 hours ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@example.com",
      event: "React Developer Meetup",
      time: "6 hours ago",
      avatar: "/api/placeholder/32/32"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Event Organizer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and track performance
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Link to="/manage-events">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View All Events
            </Button>
          </Link>
          <Link to="/create-event">
            <Button className="gradient-primary text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
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
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className="h-12 w-12 gradient-primary rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* My Events */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  My Events
                </CardTitle>
                <CardDescription>Your upcoming and recent events</CardDescription>
              </div>
              <Link to="/manage-events">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg hover-lift transition-smooth">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {event.registrations}/{event.capacity}
                        </div>
                        <div className="font-medium text-green-600">
                          {event.revenue}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16">
                          <Progress value={(event.registrations / event.capacity) * 100} className="h-2" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((event.registrations / event.capacity) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/create-event">
                  <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 gradient-primary rounded-lg flex items-center justify-center">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">New Event</p>
                        <p className="text-sm text-muted-foreground">Create event</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link to="/registrations">
                  <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 gradient-accent rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Registrations</p>
                        <p className="text-sm text-muted-foreground">Manage attendees</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-muted-foreground">View insights</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Registrations */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Recent Registrations</CardTitle>
              <CardDescription>Latest event sign-ups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRegistrations.map((registration) => (
                <div key={registration.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={registration.avatar} />
                    <AvatarFallback>{registration.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{registration.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{registration.event}</p>
                    <p className="text-xs text-muted-foreground">{registration.time}</p>
                  </div>
                </div>
              ))}
              <Link to="/registrations">
                <Button variant="outline" size="sm" className="w-full">
                  View All Registrations
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Performance This Month */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
              <CardDescription>Your event performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Events Created</span>
                  <span className="font-medium">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Registration Goal</span>
                  <span className="font-medium">156/200</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue Goal</span>
                  <span className="font-medium">$680/$1000</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium mb-1">Boost Registrations</p>
                <p className="text-xs text-muted-foreground">Add compelling event descriptions and high-quality images</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <p className="text-sm font-medium mb-1">Engage Attendees</p>
                <p className="text-xs text-muted-foreground">Send reminder emails 24 hours before your event</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}