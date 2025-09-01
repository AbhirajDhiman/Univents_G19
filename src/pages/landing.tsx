import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Play, Calendar, Users, Shield, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const features = [
    {
      title: "Intelligent Discovery",
      description: "AI-powered event recommendations tailored to your preferences and location."
    },
    {
      title: "Seamless Creation", 
      description: "Sophisticated tools that make event planning effortless and professional."
    },
    {
      title: "Trusted Security",
      description: "Enterprise-grade security ensuring your events and data remain protected."
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive insights to optimize your events and engage your audience."
    }
  ];

  const stats = [
    { value: "10K+", label: "Events Hosted" },
    { value: "500K+", label: "Attendees" },
    { value: "2K+", label: "Organizers" },
    { value: "50+", label: "Cities" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">EventFlow</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover">
                Features
              </a>
              <a href="#discover" className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover">
                Discover
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover">
                Pricing
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground mb-8">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Introducing the future of event management</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-semibold text-foreground mb-8 tracking-tight leading-none">
              A New
              <br />
              <span className="text-gradient">Generation</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Experience event management reimagined for the modern world. 
              Where sophisticated design meets intelligent functionality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
              <Link to="/discover">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary px-8 py-6 text-base">
                  Explore Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-border hover:bg-muted px-8 py-6 text-base group">
                  Watch Demo
                  <Play className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-32"></div>

      {/* Features Section */}
      <section id="features" className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 tracking-tight">
              Built for the future
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every detail crafted with precision. Every interaction designed for excellence. 
              This is how event management should feel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card hover:bg-muted/30 hover:shadow-soft transition-all duration-300 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-primary text-primary-foreground border-0 p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
              Ready to elevate your events?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of organizers who trust EventFlow to create exceptional experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-muted px-8 py-6">
                  Start Free Trial
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/discover">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6">
                  Browse Events
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Logo & Description */}
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">EventFlow</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The sophisticated platform for modern event management. 
                Designed for the next generation of organizers.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-3">Product</h4>
                <div className="space-y-2">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Features</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Pricing</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Security</a>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3">Company</h4>
                <div className="space-y-2">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">About</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Blog</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Careers</a>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3">Support</h4>
                <div className="space-y-2">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Help</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Contact</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Status</a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 EventFlow. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-micro">Privacy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-micro">Terms</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-micro">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}