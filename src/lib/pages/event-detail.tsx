// FILE: src/lib/pages/event-detail.tsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Edit, 
  Trash2, 
  UserCheck,
  Download,
  Share2,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { isOrganizer, isAdmin, isParticipant } = useUserRole();
  const { toast } = useToast();

  // State management
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock data - replace with actual API call
  const [event, setEvent] = useState({
    id: id,
    title: "Tech Workshop 2024",
    description: "Learn the latest in web development with hands-on coding sessions.",
    fullDescription: "Join us for an intensive workshop covering React, TypeScript, and modern web development practices. This hands-on session will help you build real-world applications. You'll learn from industry experts and get hands-on experience with cutting-edge technologies.",
    date: "December 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium, Building A",
    category: "Workshop",
    organizer: "Tech Club",
    attendees: 45,
    maxAttendees: 100,
    isUserOrganizer: false, // Change based on actual user
    price: "Free",
    tags: ["Web Development", "React", "TypeScript", "Coding"],
    requirements: "Laptop with VS Code installed",
  });

  // Check if user can manage this event
  const canManageEvent = event.isUserOrganizer || isAdmin;
  const canCreateEvents = isOrganizer || isAdmin;
  const isFull = event.attendees >= event.maxAttendees;

  // Registration handler with proper feedback
  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (isFull) {
      toast({
        title: "Event Full",
        description: "Sorry, this event has reached maximum capacity.",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update local state
      setIsRegistered(true);
      setEvent(prev => ({
        ...prev,
        attendees: prev.attendees + 1
      }));

      // Show success toast
      toast({
        title: "Registration Successful! 🎉",
        description: "You've been registered for this event. Check your email for confirmation.",
      });

      // Here you would make actual API call:
      // const response = await fetch(`/api/events/${id}/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: user.id })
      // });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  // Unregister handler
  const handleUnregister = async () => {
    setIsRegistering(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsRegistered(false);
      setEvent(prev => ({
        ...prev,
        attendees: prev.attendees - 1
      }));

      toast({
        title: "Unregistered Successfully",
        description: "You've been removed from this event.",
      });

    } catch (error) {
      toast({
        title: "Unregister Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      });

      navigate('/manage-events');

    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportAttendees = () => {
    toast({
      title: "Exporting Attendees",
      description: "Your CSV file will download shortly.",
    });

    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Attendee list has been downloaded.",
      });
    }, 1500);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: url,
        });
      } catch (error) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className="text-sm">{event.category}</Badge>
            <Badge variant="outline" className="text-sm">{event.price}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {event.title}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Organized by <span className="font-semibold text-foreground">{event.organizer}</span>
          </p>
        </div>

        {/* Action Buttons - Role Based */}
        <div className="flex flex-wrap gap-2">
          {/* Participant Actions */}
          {isParticipant && !canManageEvent && (
            <>
              {!isRegistered ? (
                <Button 
                  onClick={handleRegister} 
                  size="lg"
                  disabled={isRegistering || isFull}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      {isFull ? 'Event Full' : 'Register Now'}
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Registered
                  </Button>
                  <Button 
                    onClick={handleUnregister}
                    variant="outline" 
                    size="lg"
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Organizer/Admin Actions */}
          {canManageEvent && (
            <>
              <Button onClick={handleEdit} variant="outline" size="lg">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleExportAttendees} variant="outline" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={handleDelete} 
                variant="destructive"
                size="lg"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Event Details Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About This Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-base">
                {event.fullDescription}
              </p>

              {/* Tags */}
              <div>
                <h4 className="font-semibold mb-3">Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold mb-2">What to Bring</h4>
                <p className="text-muted-foreground">{event.requirements}</p>
              </div>
            </CardContent>
          </Card>

          {/* Show attendee list only to organizers */}
          {canManageEvent && (
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Attendees Management ({event.attendees})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your event attendees, send notifications, and track registrations.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/event/${id}/attendees`)}
                  >
                    View All Attendees
                  </Button>
                  <Button variant="outline" onClick={handleExportAttendees}>
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Event Info Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.attendees} / {event.maxAttendees} registered
                  </p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Registration CTA for participants */}
              {isParticipant && !canManageEvent && !isRegistered && (
                <Button 
                  onClick={handleRegister} 
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
                  size="lg"
                  disabled={isRegistering || isFull}
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      {isFull ? 'Event Full' : 'Register for Event'}
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Show organizer stats only to organizers */}
          {canManageEvent && (
            <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Quick Stats
                  <Badge variant="secondary" className="ml-auto">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="text-2xl font-bold">{event.attendees}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="text-2xl font-bold">{event.maxAttendees - event.attendees}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fill Rate</span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round((event.attendees / event.maxAttendees) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}