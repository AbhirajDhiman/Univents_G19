import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Copy, Archive, Users, Calendar, MapPin, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ManageEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "AI Innovation Summit 2025",
      status: "approved",
      registrations: 85,
      capacity: 100,
      date: "2025-03-15",
      location: "Tech Center",
      category: "Technology"
    },
    {
      id: 2,
      title: "Creative Design Workshop",
      status: "pending",
      registrations: 23,
      capacity: 50,
      date: "2025-03-20",
      location: "Online",
      category: "Arts"
    },
    {
      id: 3,
      title: "Startup Networking Event",
      status: "draft",
      registrations: 0,
      capacity: 200,
      date: "2025-04-01",
      location: "Innovation Hub",
      category: "Business"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      approved: "bg-success/20 text-success",
      pending: "bg-warning/20 text-warning", 
      draft: "bg-muted text-muted-foreground",
      rejected: "bg-destructive/20 text-destructive"
    };
    return variants[status] || variants.draft;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Manage Events</h1>
            <p className="text-muted-foreground">Organize and track your event portfolio</p>
          </div>
          <Link to="/create-event">
            <Button className="bg-gradient-primary text-white hover:shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="glass border-primary/20 shadow-neumorphic mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass focus:shadow-glow"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] glass">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="glass border-primary/20 shadow-neumorphic hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl font-light">{event.title}</CardTitle>
                      <Badge className={getStatusBadge(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        View Registrations
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.registrations}/{event.capacity} registered
                    </span>
                    <div className="flex-1 max-w-xs">
                      <div className="bg-muted/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass hover:shadow-glow">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Link to={`/registrations?eventId=${event.id}`}>
                      <Button variant="outline" size="sm" className="glass hover:shadow-glow">
                        <Users className="h-4 w-4 mr-2" />
                        Registrations
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="glass border-primary/20 shadow-neumorphic">
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-light mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your filters"
                  : "Create your first event to get started"
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link to="/create-event">
                  <Button className="bg-gradient-primary text-white hover:shadow-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}