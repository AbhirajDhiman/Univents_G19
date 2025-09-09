import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast({
        title: "Reset email sent!",
        description: "Check your inbox for password reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="mb-8 text-center text-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-light tracking-wide">EventFlow</span>
          </div>
          <h1 className="text-3xl font-extralight mb-2 tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
        </div>

        <Card className="glass border-primary/20 shadow-neumorphic">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-light">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              {emailSent ? "Instructions sent to your email" : "We'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="pl-10 glass focus:shadow-glow"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-white hover:shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Check your email and follow the link to reset your password
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}