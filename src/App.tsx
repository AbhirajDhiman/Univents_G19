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
import Discover from "./pages/discover";
import EventDetail from "./pages/event-detail";
import ParticipantDashboard from "./pages/dashboard/participant-dashboard";
import OrganizerDashboard from "./pages/dashboard/organizer-dashboard";
import AdminDashboard from "./pages/dashboard/admin-dashboard";
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
    <ThemeProvider defaultTheme="dark" storageKey="eventflow-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/discover" element={<DashboardLayout><Discover /></DashboardLayout>} />
            <Route path="/event/:id" element={<DashboardLayout><EventDetail /></DashboardLayout>} />
            <Route path="/dashboard" element={<DashboardLayout><ParticipantDashboard /></DashboardLayout>} />
            <Route path="/dashboard/organizer" element={<DashboardLayout><OrganizerDashboard /></DashboardLayout>} />
            <Route path="/dashboard/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
