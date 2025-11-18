import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Users, Star, SlidersHorizontal, Grid, List, X, TrendingUp, Zap, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

export default function Discover() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("date");

  const categories = ["Technical", "Cultural", "Workshop", "Hackathon", "Sports", "Seminar", "Competition"];
  
  const events = [
    {
      id: 1,
      title: "CodeFest 2025: 24-Hour Hackathon",
      description: "Join Punjab's biggest coding marathon! Build innovative solutions, compete with the best minds, and win exciting prizes.",
      date: "15 Dec, 2025",
      time: "10:00 AM",
      location: "Ludhiana, Punjab",
      venue: "Main Auditorium, Block-A",
      price: 150,
      attendees: 180,
      maxAttendees: 200,
      category: "Hackathon",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=240&fit=crop",
      organizer: "CODECAMPUS",
      featured: true,
      tags: ["Coding", "Competition", "Team Event", "Prizes"]
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop on building AI models using Python. Learn from industry experts and get practical experience.",
      date: "18 Dec, 2025",
      time: "2:00 PM",
      location: "Ludhiana, Punjab",
      venue: "Computer Lab, Block-C",
      price: 100,
      attendees: 75,
      maxAttendees: 80,
      category: "Workshop",
      rating: 4.9,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
      organizer: "IEEE",
      featured: true,
      tags: ["AI", "Machine Learning", "Python", "Hands-on"]
    },
    {
      id: 3,
      title: "Tech Talk: Web Development Trends",
      description: "Industry experts share insights on latest web development technologies, frameworks, and career opportunities.",
      date: "20 Dec, 2025",
      time: "4:00 PM",
      location: "Ludhiana, Punjab",
      venue: "Seminar Hall, Block-B",
      price: 0,
      attendees: 150,
      maxAttendees: 200,
      category: "Seminar",
      rating: 4.7,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=240&fit=crop",
      organizer: "GDG",
      featured: false,
      tags: ["Web Dev", "Career", "Networking", "Free"]
    },
    {
      id: 4,
      title: "Annual Cultural Fest - Virsa 2025",
      description: "Celebrate Punjabi culture with music, dance, food, and traditional performances. Open to all students!",
      date: "22 Dec, 2025",
      time: "6:00 PM",
      location: "Ludhiana, Punjab",
      venue: "Open Ground, Main Campus",
      price: 50,
      attendees: 450,
      maxAttendees: 500,
      category: "Cultural",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=240&fit=crop",
      organizer: "IEI",
      featured: true,
      tags: ["Cultural", "Music", "Dance", "Food"]
    },
    {
      id: 5,
      title: "IoT Innovation Challenge",
      description: "Build smart solutions using IoT technology. Present your projects to judges and win cash prizes.",
      date: "25 Dec, 2025",
      time: "11:00 AM",
      location: "Ludhiana, Punjab",
      venue: "Innovation Lab, Block-D",
      price: 200,
      attendees: 60,
      maxAttendees: 100,
      category: "Competition",
      rating: 4.6,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=240&fit=crop",
      organizer: "DGIT",
      featured: false,
      tags: ["IoT", "Hardware", "Innovation", "Prize Money"]
    },
    {
      id: 6,
      title: "Cricket Tournament 2025",
      description: "Inter-department cricket championship. Form your team and compete for the trophy!",
      date: "28 Dec, 2025",
      time: "8:00 AM",
      location: "Ludhiana, Punjab",
      venue: "Sports Ground",
      price: 300,
      attendees: 120,
      maxAttendees: 160,
      category: "Sports",
      rating: 4.8,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=240&fit=crop",
      organizer: "IEI",
      featured: false,
      tags: ["Cricket", "Sports", "Team", "Tournament"]
    },
    {
      id: 7,
      title: "Cloud Computing Masterclass",
      description: "Learn AWS, Azure, and Google Cloud fundamentals. Industry certification guidance included.",
      date: "30 Dec, 2025",
      time: "10:00 AM",
      location: "Ludhiana, Punjab",
      venue: "IT Lab, Block-E",
      price: 250,
      attendees: 85,
      maxAttendees: 100,
      category: "Workshop",
      rating: 4.7,
      reviews: 25,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop",
      organizer: "CODECAMPUS",
      featured: true,
      tags: ["Cloud", "AWS", "Certification", "Career"]
    },
    {
      id: 8,
      title: "Design Thinking Workshop",
      description: "Learn human-centered design approach. Perfect for aspiring entrepreneurs and product managers.",
      date: "2 Jan, 2025",
      time: "3:00 PM",
      location: "Ludhiana, Punjab",
      venue: "Innovation Center",
      price: 150,
      attendees: 55,
      maxAttendees: 60,
      category: "Workshop",
      rating: 4.8,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop",
      organizer: "GDG",
      featured: false,
      tags: ["Design", "Innovation", "UX", "Startup"]
    }
  ];

  // Filtering logic
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(event.category);
    
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting logic
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
        return b.attendees - a.attendees;
      default:
        return 0;
    }
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy("date");
  };

  // Quick stats
  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { label: "Free Events", value: events.filter(e => e.price === 0).length, icon: Zap, color: "from-green-500 to-emerald-500" },
    { label: "Featured", value: events.filter(e => e.featured).length, icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    { label: "Happening Soon", value: events.filter((_, i) => i < 3).length, icon: Clock, color: "from-orange-500 to-red-500" },
  ];

  const EventCard = ({ event, isListView = false }: { event: typeof events[0], isListView?: boolean }) => {
    const fillRate = (event.attendees / event.maxAttendees) * 100;
    const isAlmostFull = fillRate > 80;

    return (
      <Link to={`/event/${event.id}`} className="block group">
        <Card className={`h-full border-2 border-transparent hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isListView ? 'flex flex-row' : 'flex flex-col'} bg-card`}>
          <div className={`${isListView ? 'w-80 flex-shrink-0' : 'w-full'} relative overflow-hidden`}>
            <div className="aspect-video relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlays */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {event.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
                {isAlmostFull && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                    <Zap className="w-3 h-3 mr-1" />
                    Almost Full
                  </Badge>
                )}
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                <Badge className="bg-black/70 backdrop-blur-md text-white border-0">
                  {event.category}
                </Badge>
                {event.price === 0 && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                    FREE
                  </Badge>
                )}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/90 text-sm backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                  <Users className="h-3 w-3" />
                  <span className="font-semibold">{event.attendees}/{event.maxAttendees}</span>
                </div>
                <div className="flex items-center gap-1 text-white backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{event.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3 mb-2">
                <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {event.title}
                </CardTitle>
                <div className="text-right flex-shrink-0">
                  {event.price === 0 ? (
                    <div className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      FREE
                    </div>
                  ) : (
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      ₹{event.price}
                    </div>
                  )}
                </div>
              </div>
              <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                {event.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{event.date}</span>
                    <span className="mx-2">•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="line-clamp-1">{event.venue}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Registration</span>
                    <span className="font-semibold">{Math.round(fillRate)}% filled</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isAlmostFull 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                          : 'bg-gradient-to-r from-primary to-purple-600'
                      }`}
                      style={{ width: `${fillRate}%` }}
                    />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Bottom section */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                    {event.organizer.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{event.organizer}</span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 shadow-md group/btn">
                  View
                  <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discover Events
            </h1>
            <p className="text-muted-foreground text-lg">
              Find and join exciting campus events
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-2 border-border/50 hover:border-primary/20 transition-all hover:shadow-lg group cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search events, organizers, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-base border-2 focus:border-primary transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Categories Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="border-2 hover:border-primary/50 transition-all shadow-sm">
                <Filter className="mr-2 h-4 w-4" />
                Categories
                {selectedCategories.length > 0 && (
                  <Badge variant="default" className="ml-2 bg-primary">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="border-2 hover:border-primary/50 transition-all shadow-sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4">
              <DropdownMenuLabel>Price Range (₹)</DropdownMenuLabel>
              <div className="mt-4 space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹0 (Free)</span>
                  <span>₹1000+</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-56 border-2 hover:border-primary/50 transition-all shadow-sm h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (Earliest)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Rating (Highest)</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border-2 rounded-lg overflow-hidden shadow-sm ml-auto">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="lg"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="lg"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || searchQuery || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Active Filters:</span>
                {searchQuery && (
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" 
                    onClick={() => setSearchQuery("")}
                  >
                    "{searchQuery}" <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedCategories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-xs ml-auto hover:text-destructive"
                >
                  Clear all
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-primary font-bold text-base">{sortedEvents.length}</span> of <span className="font-bold text-base">{events.length}</span> events
        </p>
      </div>

      {/* Events Grid/List */}
      {sortedEvents.length > 0 ? (
        <div className={viewMode === "grid" 
          ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
        }>
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} isListView={viewMode === "list"} />
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-border/50">
          <CardContent className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any events matching your criteria. Try adjusting your filters.
            </p>
            <Button 
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90"
              size="lg"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {sortedEvents.length > 0 && sortedEvents.length >= 6 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-2 hover:border-primary/50 shadow-sm">
            Load More Events
          </Button>
        </div>
      )}
    </div>
  );
}