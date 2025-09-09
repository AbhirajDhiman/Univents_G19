import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function AdminModeration() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { toast } = useToast();

  const pendingEvents = [
    {
      id: 1,
      title: "AI Innovation Summit 2024",
      organizer: "Alice Johnson",
      organizerEmail: "alice@example.com",
      category: "Technology",
      submittedAt: "2024-03-10T14:30:00Z",
      startDate: "2024-04-15T09:00:00Z",
      endDate: "2024-04-15T18:00:00Z",
      location: "Tech Center Hall A",
      capacity: 100,
      description: "Join us for a comprehensive exploration of AI innovations shaping the future. This summit will feature keynote speakers, interactive workshops, and networking opportunities.",
      tags: ["AI", "Technology", "Innovation", "Networking"],
      bannerUrl: "/placeholder.svg",
      status: "pending"
    },
    {
      id: 2,
      title: "Creative Design Workshop",
      organizer: "Bob Smith",
      organizerEmail: "bob@example.com",
      category: "Arts & Culture",
      submittedAt: "2024-03-11T10:15:00Z",
      startDate: "2024-04-20T14:00:00Z",
      endDate: "2024-04-20T17:00:00Z",
      location: "Online - Zoom",
      capacity: 50,
      description: "A hands-on workshop exploring modern design principles and creative processes. Perfect for designers, artists, and creative professionals.",
      tags: ["Design", "Creative", "Workshop", "Art"],
      bannerUrl: "/placeholder.svg",
      status: "pending"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      organizer: "Carol Davis",
      organizerEmail: "carol@example.com",
      category: "Business",
      submittedAt: "2024-03-09T16:45:00Z",
      startDate: "2024-04-25T18:00:00Z",
      endDate: "2024-04-25T21:00:00Z",
      location: "Innovation Hub Auditorium",
      capacity: 200,
      description: "Watch emerging startups pitch their innovative ideas to a panel of expert judges and investors. Network with entrepreneurs and industry leaders.",
      tags: ["Startup", "Pitch", "Business", "Innovation"],
      bannerUrl: "/placeholder.svg",
      status: "pending"
    }
  ];

  const recentDecisions = [
    {
      id: 4,
      title: "Web Development Bootcamp",
      decision: "approved",
      decidedAt: "2024-03-08T11:20:00Z",
      reason: "High quality content and experienced organizer"
    },
    {
      id: 5,
      title: "Cryptocurrency Conference",
      decision: "rejected",
      decidedAt: "2024-03-07T15:30:00Z",
      reason: "Event content violates platform guidelines regarding financial advice"
    }
  ];

  const handleApprove = (eventId: number, reason: string) => {
    toast({
      title: "Event approved",
      description: "The event has been approved and is now live.",
    });
    // Remove from pending list logic would go here
  };

  const handleReject = (eventId: number, reason: string) => {
    toast({
      title: "Event rejected",
      description: "The event has been rejected and the organizer has been notified.",
      variant: "destructive"
    });
    // Remove from pending list logic would go here
  };

  const ModerationCard = ({ event }: { event: any }) => (
    <Card className="glass border-primary/20 shadow-neumorphic hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl font-light">{event.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.startDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.capacity} capacity
              </span>
            </CardDescription>
          </div>
          <Badge className="bg-warning/20 text-warning">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Organizer:</span>
            <span>{event.organizer}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="outline">{event.category}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Submitted:</span>
            <span>{new Date(event.submittedAt).toLocaleDateString()}</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Description:</p>
            <p className="text-sm line-clamp-3">{event.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              className="glass hover:shadow-glow"
              onClick={() => setSelectedEvent(event)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Review Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ReviewModal = ({ event, onClose }: { event: any; onClose: () => void }) => {
    const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
      if (decision && reason.trim()) {
        if (decision === "approve") {
          handleApprove(event.id, reason);
        } else {
          handleReject(event.id, reason);
        }
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="glass border-primary/20 shadow-neumorphic w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-xl font-light">Review Event</CardTitle>
            <CardDescription>Carefully review this event before making a decision</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{event.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Organizer:</span>
                  <div>{event.organizer}</div>
                  <div className="text-muted-foreground">{event.organizerEmail}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <div>{event.category}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Date & Time:</span>
                  <div>{new Date(event.startDate).toLocaleString()}</div>
                  <div className="text-muted-foreground">to {new Date(event.endDate).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <div>{event.location}</div>
                </div>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Description:</span>
                <p className="mt-1">{event.description}</p>
              </div>
              
              <div>
                <span className="text-muted-foreground text-sm">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <Label>Decision</Label>
              <div className="flex gap-2">
                <Button
                  variant={decision === "approve" ? "default" : "outline"}
                  className={decision === "approve" ? "bg-success text-success-foreground" : "glass"}
                  onClick={() => setDecision("approve")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant={decision === "reject" ? "default" : "outline"}
                  className={decision === "reject" ? "bg-destructive text-destructive-foreground" : "glass"}
                  onClick={() => setDecision("reject")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">
                  {decision === "approve" ? "Approval Notes" : "Rejection Reason"}
                </Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    decision === "approve" 
                      ? "Optional notes for the organizer..." 
                      : "Please provide a clear reason for rejection..."
                  }
                  className="glass focus:shadow-glow"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose} className="glass">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!decision || !reason.trim()}
                className="bg-gradient-primary text-white hover:shadow-glow"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Decision
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extralight mb-2 text-foreground tracking-tight">Event Moderation</h1>
            <p className="text-muted-foreground">Review and approve events submitted by organizers</p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass mb-8">
              <TabsTrigger value="pending" className="text-sm">
                Pending Review ({pendingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="text-sm">
                Decision History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {pendingEvents.length > 0 ? (
                <div className="grid gap-6">
                  {pendingEvents.map((event) => (
                    <ModerationCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card className="glass border-primary/20 shadow-neumorphic">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-light mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">
                      No events pending review at the moment
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="space-y-4">
                {recentDecisions.map((decision) => (
                  <Card key={decision.id} className="glass border-primary/20 shadow-neumorphic">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{decision.title}</h4>
                          <p className="text-sm text-muted-foreground">{decision.reason}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(decision.decidedAt).toLocaleString()}
                          </p>
                        </div>
                        <Badge className={
                          decision.decision === "approved" 
                            ? "bg-success/20 text-success" 
                            : "bg-destructive/20 text-destructive"
                        }>
                          {decision.decision === "approved" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {decision.decision}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {selectedEvent && (
            <ReviewModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}