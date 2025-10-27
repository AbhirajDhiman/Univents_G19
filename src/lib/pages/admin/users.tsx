import { useState } from "react";
import { Users, Search, Filter, Plus, Edit, Ban, CheckCircle, MoreHorizontal, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Organizer",
      status: "active",
      joinedDate: "2023-01-15",
      eventsCreated: 5,
      eventsAttended: 12,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com", 
      role: "Participant",
      status: "active",
      joinedDate: "2023-02-20",
      eventsCreated: 0,
      eventsAttended: 8,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      role: "Admin",
      status: "active",
      joinedDate: "2022-12-01",
      eventsCreated: 0,
      eventsAttended: 3,
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      role: "Participant",
      status: "suspended",
      joinedDate: "2023-03-10",
      eventsCreated: 0,
      eventsAttended: 2,
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Emma Thompson",
      email: "emma@example.com",
      role: "Organizer",
      status: "active",
      joinedDate: "2023-01-25",
      eventsCreated: 8,
      eventsAttended: 15,
      avatar: "/placeholder.svg"
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      Admin: "bg-primary/20 text-primary",
      Organizer: "bg-secondary/20 text-secondary",
      Participant: "bg-accent/20 text-accent"
    };
    return variants[role] || variants.Participant;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-success/20 text-success",
      suspended: "bg-destructive/20 text-destructive",
      pending: "bg-warning/20 text-warning"
    };
    return variants[status] || variants.active;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleChangeRole = (userId: number, newRole: string) => {
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleSuspendUser = (userId: number, userName: string) => {
    toast({
      title: "User suspended",
      description: `${userName} has been suspended.`,
      variant: "destructive"
    });
  };

  const handleActivateUser = (userId: number, userName: string) => {
    toast({
      title: "User activated",
      description: `${userName} has been reactivated.`,
    });
  };

  const handleSendEmail = (userEmail: string) => {
    toast({
      title: "Email sent",
      description: `Message sent to ${userEmail}.`,
    });
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'Admin').length,
    organizers: users.filter(u => u.role === 'Organizer').length,
    participants: users.filter(u => u.role === 'Participant').length
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">User Management</h1>
              <p className="text-muted-foreground">Manage users, roles, and permissions</p>
            </div>
            <Button className="bg-gradient-primary text-white hover:shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="glass border-primary/20 shadow-neumorphic">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-light text-primary mb-1">{stats.totalUsers}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20 shadow-neumorphic">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-light text-success mb-1">{stats.activeUsers}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20 shadow-neumorphic">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-light text-primary mb-1">{stats.admins}</div>
                <div className="text-xs text-muted-foreground">Admins</div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20 shadow-neumorphic">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-light text-secondary mb-1">{stats.organizers}</div>
                <div className="text-xs text-muted-foreground">Organizers</div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20 shadow-neumorphic">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-light text-accent mb-1">{stats.participants}</div>
                <div className="text-xs text-muted-foreground">Participants</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="glass border-primary/20 shadow-neumorphic mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass focus:shadow-glow"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[160px] glass">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Organizer">Organizer</SelectItem>
                    <SelectItem value="Participant">Participant</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] glass">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="glass">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="glass border-primary/20 shadow-neumorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-xs bg-gradient-primary text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadge(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Created: {user.eventsCreated}</div>
                            <div className="text-muted-foreground">Attended: {user.eventsAttended}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass">
                              <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="h-4 w-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              {user.status === "active" ? (
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleSuspendUser(user.id, user.name)}
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  className="text-success"
                                  onClick={() => handleActivateUser(user.id, user.name)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-light mb-2">No users found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                      ? "Try adjusting your filters"
                      : "No users have been created yet"
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