import { useUser } from '@clerk/clerk-react';

export type UserRole = 'participant' | 'organizer' | 'admin';

export const useUserRole = () => {
  const { user, isLoaded } = useUser();

  const role = (user?.unsafeMetadata?.role as UserRole) || null;
  const isAdmin = role === 'admin';
  const isOrganizer = role === 'organizer' || isAdmin;
  const isParticipant = role === 'participant';

  return {
    role,
    isAdmin,
    isOrganizer,
    isParticipant,
    hasRole: !!role,
    isLoaded,
  };
};