import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, User, Calendar, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user - in real app this would come from auth context
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "organizer",
    avatar: "/api/placeholder/32/32"
  };

  const notifications = [
    { id: 1, title: "Event approved", message: "Your Tech Meetup has been approved", time: "2 hours ago", unread: true },
    { id: 2, title: "New registration", message: "Someone registered for Design Workshop", time: "4 hours ago", unread: true },
    { id: 3, title: "Event reminder", message: "Your event starts in 2 days", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const query = formData.get("search") as string;
    if (query.trim()) {
      navigate(`/discover?q=${encodeURIComponent(query)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <div className="h-8 w-8 gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">EventFlow</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/discover" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/discover") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Discover
          </Link>
          <Link 
            to="/dashboard" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
          {user.role === 'organizer' && (
            <Link 
              to="/create-event" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/create-event") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Create Event
            </Link>
          )}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                name="search"
                placeholder="Search events..."
                className="pl-10 w-64 glass"
              />
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass">
              <div className="p-3 border-b">
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer",
                      notification.unread && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass">
              <div className="p-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              {user.role === 'organizer' && (
                <DropdownMenuItem onClick={() => navigate("/my-events")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  My Events
                </DropdownMenuItem>
              )}
              {user.role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate("/admin/users")}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="border-t p-4 sm:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Search events..."
              className="pl-10 glass"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col space-y-1 p-4">
            <Link
              to="/discover"
              className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {user.role === 'organizer' && (
              <Link
                to="/create-event"
                className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Event
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}