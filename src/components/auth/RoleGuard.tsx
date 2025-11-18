import { useUserRole, UserRole } from '@/hooks/useUserRole';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * RoleGuard - Shows content only to users with specified roles
 * 
 * @example
 * // Show only to organizers and admins
 * <RoleGuard allowedRoles={['organizer', 'admin']}>
 *   <CreateEventButton />
 * </RoleGuard>
 * 
 * @example
 * // Show only to participants with fallback
 * <RoleGuard allowedRoles={['participant']} fallback={<p>Not available</p>}>
 *   <RegisterButton />
 * </RoleGuard>
 */
export const RoleGuard = ({ children, allowedRoles, fallback = null }: RoleGuardProps) => {
  const { role, isLoaded } = useUserRole();

  // Don't render anything while loading
  if (!isLoaded) {
    return null;
  }

  // Check if user's role is in allowed roles
  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  // Return fallback if provided
  return <>{fallback}</>;
};

// Convenience components for common cases
export const ParticipantOnly = ({ children }: { children: React.ReactNode }) => (
  <RoleGuard allowedRoles={['participant']}>{children}</RoleGuard>
);

export const OrganizerOnly = ({ children }: { children: React.ReactNode }) => (
  <RoleGuard allowedRoles={['organizer', 'admin']}>{children}</RoleGuard>
);

export const AdminOnly = ({ children }: { children: React.ReactNode }) => (
  <RoleGuard allowedRoles={['admin']}>{children}</RoleGuard>
);