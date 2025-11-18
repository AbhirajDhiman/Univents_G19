import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "./components/layout/footer";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { RoleSelection } from './components/auth/RoleSelection';
import { RoleProtectedRoute } from './components/auth/RoleProtectedRoute';

// Pages
import Landing from "./lib/pages/landing";
import Discover from "./lib/pages/discover";
import EventDetail from "./lib/pages/event-detail";
import CreateEvent from "./lib/pages/create-event";
import ManageEvents from "./lib/pages/manage-events";
import MyEvents from "./lib/pages/my-events";
import Registrations from "./lib/pages/registrations";
import Notifications from "./lib/pages/notifications";
import Profile from "./lib/pages/profile";
import Settings from "./lib/pages/settings";
import ParticipantDashboard from "./lib/pages/dashboard/participant-dashboard";
import OrganizerDashboard from "./lib/pages/dashboard/organizer-dashboard";
import AdminDashboard from "./lib/pages/dashboard/admin-dashboard";
import AdminUsers from "./lib/pages/admin/users";
import AdminModeration from "./lib/pages/admin/moderation";
import AdminSettings from "./lib/pages/admin/settings";
import NotFound from "./lib/pages/NotFound";
import Blogs from "./lib/pages/Blogs";
import SetupAdmin from "./lib/pages/setup-admin";
import { HeroScrollDemo } from './components/HeroScrollDemo';

// Footer pages
import Help from "./lib/pages/help";
import Contact from "./lib/pages/Contact";
import FAQ from "./lib/pages/FAQ";
import Feedback from "./lib/pages/feedback";
import Privacy from "./lib/pages/privacy";
import Terms from "./lib/pages/terms";
import About from "./lib/pages/about";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 py-6 flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has selected a role
  const hasRole = user?.unsafeMetadata?.role;
  if (!hasRole && window.location.pathname !== '/select-role') {
    return <Navigate to="/select-role" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/discover" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="Univents-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Landing />} />
            
            {/* Demo route */}
            <Route 
              path="/demo" 
              element={
                <div className="min-h-screen bg-background">
                  <HeroScrollDemo />
                </div>
              } 
            />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <div className="flex items-center justify-center min-h-screen bg-[#030303]">
                    <div className="w-full max-w-md p-8">
                      <SignIn 
                        signUpUrl="/signup"
                        afterSignInUrl="/select-role"
                        appearance={{
                          elements: {
                            rootBox: "mx-auto",
                            card: "bg-card shadow-2xl border-border/50",
                            headerTitle: "text-foreground",
                            headerSubtitle: "text-muted-foreground",
                            socialButtonsBlockButton: "bg-card border-border/50 hover:bg-muted",
                            formButtonPrimary: "bg-primary hover:bg-primary/90",
                            footerActionLink: "text-primary hover:text-primary/80",
                            identityPreviewText: "text-foreground",
                            identityPreviewEditButton: "text-primary",
                            formFieldLabel: "text-foreground",
                            formFieldInput: "bg-background border-border/50 text-foreground",
                            dividerLine: "bg-border",
                            dividerText: "text-muted-foreground"
                          }
                        }}
                      />
                    </div>
                  </div>
                </PublicRoute>
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <div className="flex items-center justify-center min-h-screen bg-[#030303]">
                    <div className="w-full max-w-md p-8">
                      <SignUp 
                        signInUrl="/login"
                        afterSignUpUrl="/select-role"
                        appearance={{
                          elements: {
                            rootBox: "mx-auto",
                            card: "bg-card shadow-2xl border-border/50",
                            headerTitle: "text-foreground",
                            headerSubtitle: "text-muted-foreground",
                            socialButtonsBlockButton: "bg-card border-border/50 hover:bg-muted",
                            formButtonPrimary: "bg-primary hover:bg-primary/90",
                            footerActionLink: "text-primary hover:text-primary/80",
                            identityPreviewText: "text-foreground",
                            identityPreviewEditButton: "text-primary",
                            formFieldLabel: "text-foreground",
                            formFieldInput: "bg-background border-border/50 text-foreground",
                            dividerLine: "bg-border",
                            dividerText: "text-muted-foreground"
                          }
                        }}
                      />
                    </div>
                  </div>
                </PublicRoute>
              } 
            />

            {/* Role Selection */}
            <Route 
              path="/select-role" 
              element={
                <ProtectedRoute>
                  <RoleSelection />
                </ProtectedRoute>
              } 
            />

            {/* Setup Admin (One-time use) */}
            <Route path="/setup-admin" element={<SetupAdmin />} />

            {/* Unauthorized Page */}
            <Route 
              path="/unauthorized" 
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
                    <p className="text-muted-foreground">You don't have permission to access this page.</p>
                  </div>
                </div>
              } 
            />
            
            {/* Protected Routes - Main App */}
            <Route 
              path="/discover" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Discover /></DashboardLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/blogs" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Blogs /></DashboardLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/event/:id" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><EventDetail /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/my-events" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><MyEvents /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/registrations" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Registrations /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Notifications /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Profile /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Settings /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><ParticipantDashboard /></DashboardLayout>
                </ProtectedRoute>
              } 
            />

            {/* Organizer Routes */}
            <Route 
              path="/create-event" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['organizer', 'admin']}>
                    <DashboardLayout><CreateEvent /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/manage-events" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['organizer', 'admin']}>
                    <DashboardLayout><ManageEvents /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard/organizer" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['organizer', 'admin']}>
                    <DashboardLayout><OrganizerDashboard /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout><AdminDashboard /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout><AdminUsers /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/moderation" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout><AdminModeration /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout><AdminSettings /></DashboardLayout>
                  </RoleProtectedRoute>
                </ProtectedRoute>
              } 
            />

            {/* Footer Pages - Public */}
            <Route path="/help" element={<DashboardLayout><Help /></DashboardLayout>} />
            <Route path="/contact" element={<DashboardLayout><Contact /></DashboardLayout>} />
            <Route path="/faq" element={<DashboardLayout><FAQ /></DashboardLayout>} />
            <Route path="/feedback" element={<DashboardLayout><Feedback /></DashboardLayout>} />
            <Route path="/privacy" element={<DashboardLayout><Privacy /></DashboardLayout>} />
            <Route path="/terms" element={<DashboardLayout><Terms /></DashboardLayout>} />
            <Route path="/about" element={<DashboardLayout><About /></DashboardLayout>} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;