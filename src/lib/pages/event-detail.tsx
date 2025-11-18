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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  XCircle,
  AlertCircle,
  Info,
  Mail,
  User,
  Phone
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
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Mock data
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
    isUserOrganizer: false,
    price: "Free",
    tags: ["Web Development", "React", "TypeScript", "Coding"],
    requirements: "Laptop with VS Code installed",
  });

  const canManageEvent = event.isUserOrganizer || isAdmin;
  const isFull = event.attendees >= event.maxAttendees;
  const availableSeats = event.maxAttendees - event.attendees;

  // Validation functions
  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!email.endsWith('@chitkara.edu.in')) {
      return 'Please use your Chitkara email (@chitkara.edu.in)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return 'Invalid phone number (10 digits starting with 6-9)';
    return '';
  };

  const validateName = (name: string) => {
    if (!name) return 'Name is required';
    if (name.length < 3) return 'Name must be at least 3 characters';
    return '';
  };

  // Handle input changes with validation
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone)
    };

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.phone;
  };

  // Open registration modal
  const handleRegisterClick = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to register for this event.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (isFull) {
      toast({
        title: "Event Full 😔",
        description: "Sorry, this event has reached maximum capacity.",
        variant: "destructive",
      });
      return;
    }

    // Pre-fill form with user data if available
    setFormData({
      name: user?.fullName || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
      phone: ''
    });

    setShowRegistrationModal(true);
  };

  // Submit registration
  const handleSubmitRegistration = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would make actual API call:
      /*
      const response = await fetch(`/api/events/${id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...formData
        })
      });
      */

      setIsRegistered(true);
      setEvent(prev => ({
        ...prev,
        attendees: prev.attendees + 1
      }));

      setShowRegistrationModal(false);

      toast({
        title: "Registration Successful! 🎉",
        description: `Confirmation sent to ${formData.email}`,
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '' });

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!confirm('Are you sure you want to unregister from this event?')) {
      return;
    }

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
        title: "Failed to Unregister",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
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
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Event link has been copied to clipboard.",
      });
    }
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

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary" className="text-sm">{event.category}</Badge>
          <Badge variant="outline" className="text-sm">{event.price}</Badge>
          {isFull && (
            <Badge variant="destructive" className="text-sm">
              <AlertCircle className="w-3 h-3 mr-1" />
              Sold Out
            </Badge>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {event.title}
        </h1>
        <p className="text-muted-foreground">
          Organized by <span className="font-semibold text-foreground">{event.organizer}</span>
        </p>
      </div>

      <Separator />

      {/* Alert for participants who haven't registered */}
      {isParticipant && !canManageEvent && !isRegistered && (
        <Alert className={isFull ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10"}>
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              {isFull 
                ? "This event is fully booked. No seats available." 
                : `${availableSeats} seat${availableSeats !== 1 ? 's' : ''} available. Register now!`
              }
            </span>
            <Button 
              onClick={handleRegisterClick}
              disabled={isFull}
              size="sm"
              className="ml-4"
            >
              <UserCheck className="h-3 w-3 mr-2" />
              Register
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Alert for registered participants */}
      {isParticipant && !canManageEvent && isRegistered && (
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-green-700 font-medium">
              ✅ You're registered for this event!
            </span>
            <Button 
              onClick={handleUnregister}
              variant="outline"
              size="sm"
              disabled={isRegistering}
              className="ml-4"
            >
              {isRegistering ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Unregister'
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Event Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About This Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-base">
                {event.fullDescription}
              </p>

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

              <div>
                <h4 className="font-semibold mb-2">What to Bring</h4>
                <p className="text-muted-foreground">{event.requirements}</p>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Actions */}
          {canManageEvent && (
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Event Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your event, view attendees, and track registrations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => navigate(`/edit-event/${id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Event
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Attendees
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={handleDelete}
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
                        Delete Event
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
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
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full transition-all ${
                        isFull ? 'bg-destructive' : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                      }`}
                      style={{ width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isFull ? 'Event is full' : `${availableSeats} seats remaining`}
                  </p>
                </div>
              </div>

              <Separator />

              {/* PRIMARY REGISTRATION BUTTON */}
              {isParticipant && !canManageEvent && (
                <div className="space-y-2">
                  {!isRegistered ? (
                    <Button 
                      onClick={handleRegisterClick}
                      disabled={isFull}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white"
                      size="lg"
                    >
                      {isFull ? (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Event Full
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Register for Event
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                        size="lg"
                        disabled
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Already Registered
                      </Button>
                      <Button 
                        onClick={handleUnregister}
                        variant="ghost"
                        size="sm"
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={isRegistering}
                      >
                        {isRegistering ? (
                          <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-2" />
                        )}
                        Cancel Registration
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Organizer Stats */}
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
                  <span className="text-2xl font-bold">{availableSeats}</span>
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

      {/* Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Register for Event</DialogTitle>
            <DialogDescription>
              Please fill in your details to complete registration for {event.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={formErrors.name ? 'border-destructive' : ''}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Chitkara Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@chitkara.edu.in"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={formErrors.email ? 'border-destructive' : ''}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.email}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Only @chitkara.edu.in emails are allowed
              </p>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                maxLength={10}
                className={formErrors.phone ? 'border-destructive' : ''}
              />
              {formErrors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.phone}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                10-digit Indian mobile number
              </p>
            </div>

            {/* Info Alert */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                A confirmation email will be sent to your registered email address with event details and QR code.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRegistrationModal(false)}
              disabled={isRegistering}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRegistration}
              disabled={isRegistering}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}