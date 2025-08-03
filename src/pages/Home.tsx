import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Package, Users, Heart, Sparkles, MapPin, Star } from 'lucide-react';

export default function Home() {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 handloom-pattern">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <Package className="h-16 w-16 mx-auto text-primary mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-balance">
              WeaveLink
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Connecting traditional Indian handloom weavers with buyers worldwide. 
              Discover authentic, handcrafted textiles directly from artisans.
            </p>
            <Link to="/auth">
              <Button size="lg" className="shadow-soft">
                Join Our Community
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="weave-texture shadow-soft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>For Weavers</CardTitle>
                    <CardDescription>Showcase your beautiful handloom creations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Share your craft with the world</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span>List your products easily</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Connect with your local heritage</span>
                  </li>
                </ul>
                <Link to="/auth" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Join as Weaver
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="weave-texture shadow-soft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>For Buyers</CardTitle>
                    <CardDescription>Discover authentic handloom treasures</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Browse authentic handloom products</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Support traditional artisans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span>Find unique, handcrafted items</span>
                  </li>
                </ul>
                <Link to="/auth" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-6">Preserving Traditional Craftsmanship</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Every thread tells a story. Every pattern carries centuries of tradition. 
              Join us in celebrating and preserving the rich heritage of Indian handloom weaving.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {profile?.name}!
          </h1>
          <p className="text-xl text-muted-foreground">
            {profile?.role === 'weaver' 
              ? 'Ready to showcase your beautiful handloom creations?' 
              : 'Discover amazing handloom products from talented weavers'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {profile?.role === 'weaver' ? (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Weaver Dashboard</CardTitle>
                <CardDescription>
                  Manage your products and showcase your craft
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/weaver-dashboard">
                  <Button className="w-full" size="lg">
                    <Package className="mr-2 h-5 w-5" />
                    Go to My Products
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full" size="lg">
                    <Users className="mr-2 h-5 w-5" />
                    Browse All Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Buyer Dashboard</CardTitle>
                <CardDescription>
                  Explore beautiful handloom products from talented weavers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/marketplace">
                  <Button className="w-full" size="lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}