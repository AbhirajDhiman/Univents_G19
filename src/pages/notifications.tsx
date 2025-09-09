import { useState } from "react";
import { Bell, Check, Trash2, Filter, Calendar, Users, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      type: "event_reminder",
      title: "Event Reminder",
      message: "AI Innovation Summit 2024 starts in 2 hours",
      timestamp: "2024-03-15T07:00:00Z",
      read: false,
      event: "AI Innovation Summit 2024",
      icon: Calendar
    },
    {
      id: 2,
      type: "registration",
      title: "Registration Confirmed",
      message: "You're registered for Creative Design Workshop",
      timestamp: "2024-03-14T16:30:00Z",
      read: false,
      event: "Creative Design Workshop",
      icon: Check
    },
    {
      id: 3,
      type: "announcement",
      title: "Platform Update",
      message: "New features available: Enhanced event discovery and better notifications",
      timestamp: "2024-03-13T10:00:00Z",
      read: true,
      icon: Settings
    },
    {
      id: 4,
      type: "event_update",
      title: "Event Location Changed",
      message: "Startup Networking Event venue has been updated",
      timestamp: "2024-03-12T14:20:00Z",
      read: true,
      event: "Startup Networking Event",
      icon: Users
    },
    {
      id: 5,
      type: "featured",
      title: "Featured Event",
      message: "Check out this week's featured event: Tech Leadership Summit",
      timestamp: "2024-03-11T09:00:00Z",
      read: true,
      event: "Tech Leadership Summit",
      icon: Star
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      event_reminder: "bg-warning/20 text-warning",
      registration: "bg-success/20 text-success",
      announcement: "bg-primary/20 text-primary",
      event_update: "bg-secondary/20 text-secondary",
      featured: "bg-accent/20 text-accent"
    };
    return colors[type] || colors.announcement;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: `${unreadCount} notifications marked as read.`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your events and activities</p>
            </div>
            {unreadCount > 0 && (
              <Button 
                onClick={handleMarkAllAsRead}
                variant="outline" 
                className="glass hover:shadow-glow"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read ({unreadCount})
              </Button>
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              {/* Filters */}
              <Card className="glass border-primary/20 shadow-neumorphic mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-[200px] glass">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter notifications" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="all">All Notifications</SelectItem>
                        <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="event_reminder">Event Reminders</SelectItem>
                        <SelectItem value="registration">Registrations</SelectItem>
                        <SelectItem value="announcement">Announcements</SelectItem>
                        <SelectItem value="event_update">Event Updates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications List */}
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card 
                      key={notification.id} 
                      className={`glass border-primary/20 shadow-neumorphic transition-all duration-300 hover:shadow-glow ${
                        !notification.read ? 'ring-1 ring-primary/30' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${getTypeColor(notification.type)} flex-shrink-0`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <div className="h-2 w-2 bg-primary rounded-full" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {timeAgo(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-3">
                              {notification.message}
                            </p>
                            
                            {notification.event && (
                              <Badge variant="outline" className="mb-3">
                                {notification.event}
                              </Badge>
                            )}
                            
                            <div className="flex gap-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="glass hover:shadow-glow"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="glass hover:shadow-glow text-destructive"
                                onClick={() => handleDelete(notification.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredNotifications.length === 0 && (
                <Card className="glass border-primary/20 shadow-neumorphic">
                  <CardContent className="text-center py-12">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-light mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {filter === "unread" 
                        ? "All caught up! No unread notifications."
                        : "You're all set! New notifications will appear here."
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Notification Preferences Sidebar */}
            <div className="w-80">
              <Card className="glass border-primary/20 shadow-neumorphic sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg font-light">Notification Preferences</CardTitle>
                  <CardDescription>Control what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Reminders</span>
                      <input type="checkbox" defaultChecked className="accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Registration Updates</span>
                      <input type="checkbox" defaultChecked className="accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform Announcements</span>
                      <input type="checkbox" defaultChecked className="accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Updates</span>
                      <input type="checkbox" defaultChecked className="accent-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Featured Events</span>
                      <input type="checkbox" className="accent-primary" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-3">Email Notifications</h4>
                    <Select defaultValue="important">
                      <SelectTrigger className="glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full glass hover:shadow-glow">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}