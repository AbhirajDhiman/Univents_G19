import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Calendar, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
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
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Crafting exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
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
      {/* HeroGeometric Section */}
      <HeroGeometric 
        badge="Event Management Revolution"
        title1="A New"
        title2="Generation"
      />

      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Univents</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover">
                Features
              </a>
              <a href="#discover" className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover">
                Discover
                </a>
              <Link
                to="/blogs"
                className="text-sm text-muted-foreground hover:text-foreground transition-micro letter-spacing-hover"
              >
                Blogs
              </Link>
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

      {/* Content Section - Placed after the HeroGeometric */}
      <section className="pt-20 pb-20 px-6 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-center leading-relaxed">
            Experience event management reimagined for the modern world. 
            Where sophisticated design meets intelligent functionality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
            <Link to="/discover">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary px-8 py-6 text-base">
                Explore Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="px-8 py-6 text-base">
                Create Event
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
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
              Join thousands of organizers who trust Univents to create exceptional experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-muted px-8 py-6">
                  Start 
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

      {/* Simple Footer */}
      <footer className="border-t border-border/50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Logo & Description */}
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">Univents</span>
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
                  <a href="#features" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Features</a>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-micro accent-underline">Pricing</a>
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
                © 2025 Univents. All rights reserved.
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