import { Users, Calendar, AlertTriangle, TrendingUp, CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,456", change: "+12% this month", icon: Users, color: "text-blue-600" },
    { label: "Active Events", value: "89", change: "+8% this month", icon: Calendar, color: "text-green-600" },
    { label: "Pending Approvals", value: "7", change: "3 urgent", icon: AlertTriangle, color: "text-yellow-600" },
    { label: "Total Revenue", value: "$45,890", change: "+15% this month", icon: TrendingUp, color: "text-purple-600" }
  ];

  const pendingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Conference 2024",
      organizer: "TechCorp Events",
      category: "Technology",
      date: "Dec 20, 2024",
      registrations: 45,
      priority: "high",
      submittedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Creative Design Workshop",
      organizer: "Design Academy",
      category: "Design",
      date: "Dec 22, 2024",
      registrations: 23,
      priority: "medium",
      submittedAt: "4 hours ago"
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      organizer: "StartupHub",
      category: "Business",
      date: "Dec 25, 2024", 
      registrations: 67,
      priority: "high",
      submittedAt: "6 hours ago"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "organizer",
      joinedAt: "2 hours ago",
      status: "active",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "participant",
      joinedAt: "5 hours ago",
      status: "active",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "organizer",
      joinedAt: "1 day ago",
      status: "pending",
      avatar: "/api/placeholder/32/32"
    }
  ];

  const systemMetrics = [
    { label: "Server Uptime", value: "99.9%", status: "good" },
    { label: "Response Time", value: "245ms", status: "good" },
    { label: "Error Rate", value: "0.02%", status: "good" },
    { label: "Active Sessions", value: "1,234", status: "normal" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "organizer": return "bg-blue-100 text-blue-800";
      case "participant": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "suspended": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor platform activity and manage system operations
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Link to="/admin/moderation">
            <Button variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Moderation Queue ({pendingEvents.length})
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button className="gradient-primary text-white">
              <Shield className="mr-2 h-4 w-4" />
              Settings
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
                  <stat.icon className={`h-6 w-6 text-white`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Event Approvals */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Pending Event Approvals
                </CardTitle>
                <CardDescription>Events waiting for your review</CardDescription>
              </div>
              <Link to="/admin/moderation">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover-lift transition-smooth">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(event.priority)}>
                        {event.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="mr-1 h-3 w-3" />
                      by {event.organizer}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      {event.date} • {event.registrations} registrations
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Submitted {event.submittedAt}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>Real-time platform performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${
                      metric.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {metric.status === 'good' ? '● Good' : '● Normal'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/admin/users">
                  <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 gradient-primary rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Manage Users</p>
                        <p className="text-sm text-muted-foreground">User administration</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link to="/admin/moderation">
                  <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 gradient-accent rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Moderation</p>
                        <p className="text-sm text-muted-foreground">Review content</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Card className="p-4 hover-lift transition-smooth cursor-pointer bg-muted/20 border-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-muted-foreground">Platform insights</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Users */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Recent Users</CardTitle>
              <CardDescription>Latest user registrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{user.joinedAt}</p>
                      <span className={`text-xs ${getStatusColor(user.status)}`}>
                        ● {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/admin/users">
                <Button variant="outline" size="sm" className="w-full">
                  View All Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Platform Growth */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Platform Growth</CardTitle>
              <CardDescription>This month's progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User Growth</span>
                  <span className="font-medium">12%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Event Creation</span>
                  <span className="font-medium">8%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue Growth</span>
                  <span className="font-medium">15%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">🚨 Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium mb-1">7 Events Pending</p>
                <p className="text-xs text-muted-foreground">3 high priority events need review</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-200">
                <p className="text-sm font-medium mb-1">Server Performance</p>
                <p className="text-xs text-muted-foreground">All systems operating normally</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}