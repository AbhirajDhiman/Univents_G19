// client/src/hooks/useUserRole.ts
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

export type UserRole = 'admin' | 'organizer' | 'participant';

export const useUserRole = () => {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<UserRole>('participant');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      // Get role from Clerk's public metadata
      // You need to set this in Clerk Dashboard or via API
      const userRole = user.publicMetadata?.role as UserRole;
      
      setRole(userRole || 'participant'); // Default to participant
      setIsLoading(false);
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [user, isLoaded]);

  return {
    role,
    isLoading,
    isAdmin: role === 'admin',
    isOrganizer: role === 'organizer',
    isParticipant: role === 'participant',
    canCreateEvents: role === 'admin' || role === 'organizer',
    canModerate: role === 'admin',
  };
};