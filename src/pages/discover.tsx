import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Users, Star, SlidersHorizontal, Grid, List } from "lucide-react";
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
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Link } from "react-router-dom";

export default function Discover() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("date");

  const categories = ["Technology", "Design", "Business", "Health", "Arts", "Education", "Sports", "Music"];
  
  const events = [
    {
      id: 1,
      title: "React Developer Conference 2024",
      description: "Join us for a full day of React insights, best practices, and networking with industry experts.",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "San Francisco, CA",
      venue: "Moscone Center",
      price: 89,
      originalPrice: 120,
      attendees: 450,
      maxAttendees: 500,
      category: "Technology",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=240&fit=crop",
      organizer: "React Community SF",
      featured: true,
      tags: ["React", "JavaScript", "Frontend", "Development"]
    },
    {
      id: 2,
      title: "UX/UI Design Workshop",
      description: "Learn modern design principles and create stunning user interfaces with hands-on exercises.",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Online",
      venue: "Virtual Event",
      price: 45,
      originalPrice: 60,
      attendees: 89,
      maxAttendees: 120,
      category: "Design",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop",
      organizer: "Design Academy",
      featured: false,
      tags: ["UX", "UI", "Design", "Figma"]
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Watch innovative startups pitch their ideas to top investors and industry leaders.",
      date: "Dec 20, 2024",
      time: "6:00 PM",
      location: "New York, NY",
      venue: "WeWork Times Square",
      price: 25,
      originalPrice: 25,
      attendees: 180,
      maxAttendees: 200,
      category: "Business",
      rating: 4.7,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
      organizer: "StartupHub NYC",
      featured: true,
      tags: ["Startup", "Investment", "Pitch", "Networking"]
    },
    {
      id: 4,
      title: "AI & Machine Learning Summit",
      description: "Explore the latest developments in artificial intelligence and machine learning applications.",
      date: "Dec 22, 2024",
      time: "9:00 AM",
      location: "Austin, TX",
      venue: "Austin Convention Center",
      price: 150,
      originalPrice: 200,
      attendees: 340,
      maxAttendees: 400,
      category: "Technology",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop",
      organizer: "AI Research Institute",
      featured: true,
      tags: ["AI", "Machine Learning", "Data Science", "Research"]
    },
    {
      id: 5,
      title: "Creative Photography Masterclass",
      description: "Master the art of creative photography with professional techniques and editing workflows.",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      location: "Los Angeles, CA",
      venue: "Hollywood Studio",
      price: 75,
      originalPrice: 95,
      attendees: 45,
      maxAttendees: 60,
      category: "Arts",
      rating: 4.9,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=240&fit=crop",
      organizer: "Pro Photography School",
      featured: false,
      tags: ["Photography", "Creative", "Art", "Editing"]
    },
    {
      id: 6,
      title: "Digital Marketing Bootcamp",
      description: "Comprehensive training on modern digital marketing strategies and tools for business growth.",
      date: "Dec 28, 2024",
      time: "9:00 AM",
      location: "Chicago, IL",
      venue: "Marketing Hub Chicago",
      price: 120,
      originalPrice: 160,
      attendees: 95,
      maxAttendees: 150,
      category: "Business",
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
      organizer: "Digital Growth Agency",
      featured: false,
      tags: ["Marketing", "Digital", "SEO", "Social Media"]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const EventCard = ({ event, isListView = false }: { event: typeof events[0], isListView?: boolean }) => (
    <Card className={`gradient-card border-0 hover-lift transition-smooth overflow-hidden ${isListView ? 'flex' : ''}`}>
      <div className={`${isListView ? 'w-64 flex-shrink-0' : 'aspect-video'} relative overflow-hidden`}>
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-white">
            Featured
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 bg-black/70 text-white">
          {event.category}
        </Badge>
        {event.originalPrice > event.price && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="destructive" className="text-xs">
              Save ${event.originalPrice - event.price}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
            <div className="text-right flex-shrink-0 ml-4">
              <div className="text-2xl font-bold text-primary">${event.price}</div>
              {event.originalPrice > event.price && (
                <div className="text-sm text-muted-foreground line-through">${event.originalPrice}</div>
              )}
            </div>
          </div>
          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {event.date} at {event.time}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location} • {event.venue}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {event.attendees}/{event.maxAttendees} attending
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium">{event.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">({event.reviews})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">by {event.organizer}</span>
            <Link to={`/event/${event.id}`}>
              <Button size="sm" className="gradient-primary text-white">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
        <p className="text-muted-foreground">Find amazing events happening in your area and online</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, topics, or organizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Categories Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass">
                <Filter className="mr-2 h-4 w-4" />
                Categories
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass">
              <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="glass">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Price: ${priceRange[0]} - ${priceRange[1]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 glass">
              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              <div className="mt-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Range Filter */}
          <DatePickerWithRange />

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 glass">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass">
              <SelectItem value="date">Date (Earliest)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Rating (Highest)</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md glass">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                "{searchQuery}" ✕
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge 
                key={category} 
                variant="secondary" 
                className="cursor-pointer"
                onClick={() => handleCategoryChange(category, false)}
              >
                {category} ✕
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
                setPriceRange([0, 500]);
              }}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedEvents.length} of {events.length} events
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
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategories([]);
              setPriceRange([0, 500]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {sortedEvents.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      )}
    </div>
  );
}