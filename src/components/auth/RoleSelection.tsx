import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar } from 'lucide-react';

export const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<'participant' | 'organizer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRoleSubmit = async () => {
    if (!selectedRole || !user) return;

    setIsLoading(true);
    try {
      // Update user metadata with selected role
      await user.update({
        unsafeMetadata: {
          role: selectedRole,
        },
      });

      // Redirect based on role
      if (selectedRole === 'participant') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard/organizer');
      }
    } catch (error) {
      console.error('Error setting role:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Univents!</h1>
          <p className="text-muted-foreground">Choose your role to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Participant Card */}
          <Card 
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedRole === 'participant' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedRole('participant')}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Participant</CardTitle>
              <CardDescription>
                Discover and join amazing events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Browse events</li>
                <li>✓ Register for events</li>
                <li>✓ Track your registrations</li>
                <li>✓ Get notifications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Organizer Card */}
          <Card 
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedRole === 'organizer' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedRole('organizer')}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Organizer</CardTitle>
              <CardDescription>
                Create and manage events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Create events</li>
                <li>✓ Manage registrations</li>
                <li>✓ Track analytics</li>
                <li>✓ Everything participants can do</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={handleRoleSubmit}
            disabled={!selectedRole || isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? 'Setting up...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};