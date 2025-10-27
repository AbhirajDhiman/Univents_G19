import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Revolutionizing Campus Event Management",
      excerpt:
        "How UniVents is solving the fragmented event discovery problem in universities",
      date: "October 27, 2025",
      readTime: "5 min read",
      category: "Product",
      slug: "revolutionizing-campus-events",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            UniVents{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, updates, and stories about transforming campus event
            experiences
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 max-w-5xl mx-auto">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.slug}`}>
              <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer group">
                <CardHeader className="p-0">
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop"
                      alt="University Campus"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-primary/90">
                      {blog.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{blog.excerpt}</p>

                  <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
