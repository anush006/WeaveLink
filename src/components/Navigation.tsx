import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Package, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">WeaveLink</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            
            {profile?.role === 'weaver' && (
              <Link to="/weaver-dashboard">
                <Button variant="ghost" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  My Products
                </Button>
              </Link>
            )}
            
            {profile?.role === 'buyer' && (
              <Link to="/marketplace">
                <Button variant="ghost" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Marketplace
                </Button>
              </Link>
            )}
            
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{profile?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};