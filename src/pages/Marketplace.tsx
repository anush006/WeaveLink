import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Search, Package, MapPin, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All',
  'Sarees',
  'Bedsheets', 
  'Shawls',
  'Dupattas',
  'Kurtas',
  'Table Runners',
  'Cushion Covers',
  'Wall Hangings',
  'Other'
];

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          profiles:user_id (
            name,
            location
          )
        `)
        .order('created_at', { ascending: false });

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Handloom Marketplace</h1>
          <p className="text-muted-foreground">
            Discover beautiful handloom products from talented weavers across India
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardHeader>
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle>No products found</CardTitle>
              <CardDescription>
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No products have been listed yet'
                }
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                {product.image_url && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {product.category}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span>By {product.profiles?.name || 'Anonymous Weaver'}</span>
                    </div>
                    
                    {product.profiles?.location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{product.profiles.location}</span>
                      </div>
                    )}
                    
                    <div className="text-muted-foreground">
                      Listed {new Date(product.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Supporting Traditional Craftsmanship</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Every purchase supports skilled artisans who have preserved these beautiful 
            handloom traditions for generations. Thank you for helping keep this heritage alive.
          </p>
        </div>
      </div>
    </div>
  );
}