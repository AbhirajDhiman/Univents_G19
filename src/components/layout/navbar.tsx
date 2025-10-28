import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Bell, Plus } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Click to go home */}
          <Link 
            to={isSignedIn ? "/discover" : "/"} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Univents
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/discover" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Discover
            </Link>
            <Link 
              to="/my-events" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              My Events
            </Link>
            <Link 
              to="/manage-events" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Manage
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/create-event')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>

            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9"
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};