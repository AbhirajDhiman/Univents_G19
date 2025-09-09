import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";

// Pages
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import Discover from "./pages/discover";
import EventDetail from "./pages/event-detail";
import CreateEvent from "./pages/create-event";
import ManageEvents from "./pages/manage-events";
import MyEvents from "./pages/my-events";
import Registrations from "./pages/registrations";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import ParticipantDashboard from "./pages/dashboard/participant-dashboard";
import OrganizerDashboard from "./pages/dashboard/organizer-dashboard";
import AdminDashboard from "./pages/dashboard/admin-dashboard";
import AdminUsers from "./pages/admin/users";
import AdminModeration from "./pages/admin/moderation";
import AdminSettings from "./pages/admin/settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-6">
      {children}
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="Univents-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes with Dashboard Layout */}
            <Route path="/discover" element={<DashboardLayout><Discover /></DashboardLayout>} />
            <Route path="/event/:id" element={<DashboardLayout><EventDetail /></DashboardLayout>} />
            <Route path="/create-event" element={<DashboardLayout><CreateEvent /></DashboardLayout>} />
            <Route path="/manage-events" element={<DashboardLayout><ManageEvents /></DashboardLayout>} />
            <Route path="/my-events" element={<DashboardLayout><MyEvents /></DashboardLayout>} />
            <Route path="/registrations" element={<DashboardLayout><Registrations /></DashboardLayout>} />
            <Route path="/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout><ParticipantDashboard /></DashboardLayout>} />
            <Route path="/dashboard/organizer" element={<DashboardLayout><OrganizerDashboard /></DashboardLayout>} />
            <Route path="/dashboard/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
            
            {/* Admin Routes */}
            <Route path="/admin/users" element={<DashboardLayout><AdminUsers /></DashboardLayout>} />
            <Route path="/admin/moderation" element={<DashboardLayout><AdminModeration /></DashboardLayout>} />
            <Route path="/admin/settings" element={<DashboardLayout><AdminSettings /></DashboardLayout>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
