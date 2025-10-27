import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Users, Download, Search, Filter, Check, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function Registrations() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "1";
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegistrations, setSelectedRegistrations] = useState<number[]>([]);
  const { toast } = useToast();

  // Mock event data
  const event = {
    id: eventId,
    title: "AI Innovation Summit 2025",
    date: "2025-03-15",
    capacity: 100,
    registered: 85
  };

  const registrations = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1-555-0101",
      ticketType: "VIP",
      status: "registered",
      registeredAt: "2025-02-15T10:30:00Z",
      attended: false
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com", 
      phone: "+1-555-0102",
      ticketType: "General",
      status: "registered",
      registeredAt: "2025-02-16T14:20:00Z",
      attended: true
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+1-555-0103", 
      ticketType: "Student",
      status: "cancelled",
      registeredAt: "2025-02-14T09:15:00Z",
      attended: false
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1-555-0104",
      ticketType: "General", 
      status: "registered",
      registeredAt: "2025-02-17T16:45:00Z",
      attended: false
    }
  ];

  const getStatusBadge = (status: string, attended: boolean) => {
    if (attended) {
      return <Badge className="bg-success/20 text-success">Attended</Badge>;
    }
    
    const variants: Record<string, string> = {
      registered: "bg-primary/20 text-primary",
      cancelled: "bg-destructive/20 text-destructive",
      no_show: "bg-muted text-muted-foreground"
    };
    
    return <Badge className={variants[status] || variants.registered}>{status}</Badge>;
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "attended" && reg.attended) ||
                         (statusFilter === "no_show" && !reg.attended && reg.status === "registered") ||
                         (statusFilter === reg.status);
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    toast({
      title: "Export started",
      description: "Registration data is being prepared for download.",
    });
  };

  const handleMarkAttendance = (registrationId: number, attended: boolean) => {
    toast({
      title: attended ? "Marked as attended" : "Marked as no-show",
      description: "Attendance status updated successfully.",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRegistrations(checked ? filteredRegistrations.map(r => r.id) : []);
  };

  const handleSelectRegistration = (id: number, checked: boolean) => {
    setSelectedRegistrations(prev => 
      checked ? [...prev, id] : prev.filter(regId => regId !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Event Registrations</h1>
            <p className="text-muted-foreground">Manage attendees for {event.title}</p>
          </div>

          {/* Event Overview */}
          <Card className="glass border-primary/20 shadow-neumorphic mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-light">{event.title}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString()} • {event.registered}/{event.capacity} registered
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleExportCSV}
                    variant="outline" 
                    className="glass hover:shadow-glow"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Filters */}
          <Card className="glass border-primary/20 shadow-neumorphic mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search registrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass focus:shadow-glow"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] glass">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="attended">Attended</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Registrations Table */}
          <Card className="glass border-primary/20 shadow-neumorphic">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Registrations ({filteredRegistrations.length})
                </CardTitle>
                {selectedRegistrations.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Selected ({selectedRegistrations.length})
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRegistrations.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ticket Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedRegistrations.includes(registration.id)}
                            onCheckedChange={(checked) => 
                              handleSelectRegistration(registration.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {registration.name}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {registration.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {registration.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{registration.ticketType}</Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(registration.status, registration.attended)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(registration.registeredAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {registration.status === "registered" && !registration.attended && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 glass hover:shadow-glow"
                                  onClick={() => handleMarkAttendance(registration.id, true)}
                                >
                                  <Check className="h-4 w-4 text-success" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 glass hover:shadow-glow"
                                  onClick={() => handleMarkAttendance(registration.id, false)}
                                >
                                  <X className="h-4 w-4 text-destructive" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-light mb-2">No registrations found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your filters"
                      : "Registrations will appear here as people sign up"
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}