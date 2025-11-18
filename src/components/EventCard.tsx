// FILE: src/components/events/EventCard.tsx
// Example of how to show different actions based on role

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    attendees: number;
    maxAttendees: number;
    isOrganizer?: boolean; // If current user is the organizer
  };
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const { isOrganizer, isAdmin, isParticipant } = useUserRole();

  // Check if user can manage this event
  const canManageEvent = event.isOrganizer || isAdmin;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <Badge>{event.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.attendees} / {event.maxAttendees} attendees</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* View Details - Everyone can see this */}
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          View Details
        </Button>

        {/* Register Button - Only for participants who aren't organizing this event */}
        {isParticipant && !canManageEvent && (
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            Register
          </Button>
        )}

        {/* Edit Button - Only for event organizers/admins */}
        {canManageEvent && (
          <>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(`/edit-event/${event.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {/* Handle delete */}}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};