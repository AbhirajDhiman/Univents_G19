import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Calendar, Circle, Sparkles, Zap, Shield, BarChart3, Users, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8 md:mb-12 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-rose-400" />
            <span className="text-sm text-white/70 tracking-wide font-medium">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-rose-400"
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/50 mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              Crafting exceptional digital experiences through innovative design and cutting-edge technology. Where creativity meets functionality.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/discover">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 shadow-2xl px-8 py-6 text-base font-semibold rounded-full group">
                Explore Events
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full backdrop-blur-sm">
                Create Event
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export default function Landing() {
  const features = [
    {
      icon: Zap,
      title: "Intelligent Discovery",
      description: "AI-powered event recommendations tailored to your preferences and location.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Sparkles,
      title: "Seamless Creation", 
      description: "Sophisticated tools that make event planning effortless and professional.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Trusted Security",
      description: "Enterprise-grade security ensuring your events and data remain protected.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive insights to optimize your events and engage your audience.",
      color: "from-green-500 to-emerald-500"
    }
  ];

    const stats = [
      { value: "10K+", label: "Events Hosted", icon: Calendar },
      { value: "500K+", label: "Attendees", icon: Users },
      { value: "2K+", label: "Organizers", icon: Star },
      { value: "50+", label: "Cities", icon: Globe }
    ];

  const testimonials = [
    {
      quote: "Univents transformed how we manage campus events. The interface is intuitive and the features are powerful.",
      author: "Sarah Chen",
      role: "Event Coordinator",
      avatar: "SC"
    },
    {
      quote: "Best event platform I've used. Real-time analytics helped us double our attendance rates.",
      author: "Michael Rodriguez",
      role: "Student Union President",
      avatar: "MR"
    },
    {
      quote: "Creating and managing events has never been this easy. Highly recommended for any organizer.",
      author: "Emily Thompson",
      role: "Club President",
      avatar: "ET"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Univents</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Stats
              </a>
              <Link to="/blogs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 shadow-lg font-medium rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HeroGeometric Section */}
      <HeroGeometric 
        badge="✨ Event Management Revolution"
        title1="A New"
        title2="Generation"
      />

      {/* Stats Section with improved design */}
      <section id="stats" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 p-6 text-center group">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with icons and improved cards */}
      <section id="features" className="px-6 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="w-3 h-3 mr-2" />
              Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Built for the future
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Every detail crafted with precision. Every interaction designed for excellence. 
              This is how event management should feel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card hover:bg-card/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 group">
                <CardContent className="p-0">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg",
                    feature.color
                  )}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="px-6 py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Star className="w-3 h-3 mr-2 fill-current" />
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Loved by organizers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what event organizers are saying about Univents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 bg-card p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with improved gradient */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0 p-16 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djRoLTJ2LTRoLTR2LTJoNHYtNGgydjRoNHYyaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NEg2VjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to elevate your events?
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of organizers who trust Univents to create exceptional experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 px-10 py-6 text-base font-semibold rounded-full shadow-2xl">
                    Start Free
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/discover">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-base font-semibold rounded-full backdrop-blur-sm">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Improved Footer */}
      <footer className="border-t border-border/50 px-6 py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Univents</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                The sophisticated platform for modern event management. 
                Designed for the next generation of organizers.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                  <span className="sr-only">Twitter</span>
                  𝕏
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  in
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                  <span className="sr-only">Instagram</span>
                  IG
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <div className="space-y-3 text-sm">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors block">Features</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Pricing</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Security</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Roadmap</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-3 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">About</a>
                <Link to="/blogs" className="text-muted-foreground hover:text-foreground transition-colors block">Blog</Link>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Careers</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors block">Contact</a>
              </div>
            </div>
          </div>
              
          {/* Copyright */}
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Univents. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}