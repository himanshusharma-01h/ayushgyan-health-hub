import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Star, 
  ShoppingCart,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";

const categories = [
  { id: "all", name: "All", emoji: "🌿" },
  { id: "supplements", name: "Supplements", emoji: "💊" },
  { id: "oils", name: "Oils & Care", emoji: "🧴" },
  { id: "equipment", name: "Wellness", emoji: "🧘" },
];

const products = [
  {
    id: 1, name: "Ashwagandha Capsules", category: "supplements",
    price: 599, originalPrice: 799, rating: 4.8, reviews: 234, image: "🌿",
    description: "Premium organic Ashwagandha for stress relief and vitality",
    benefits: ["Reduces stress", "Boosts energy", "Improves sleep"],
  },
  {
    id: 2, name: "Triphala Churna", category: "supplements",
    price: 399, rating: 4.9, reviews: 456, image: "🍃",
    description: "Classic Ayurvedic formula for digestive health",
    benefits: ["Digestive support", "Detoxification", "Immunity boost"],
  },
  {
    id: 3, name: "Chyawanprash", category: "supplements",
    price: 449, originalPrice: 549, rating: 4.7, reviews: 189, image: "🍯",
    description: "Traditional immunity booster with 40+ herbs",
    benefits: ["Immunity", "Rejuvenation", "Energy"],
  },
  {
    id: 4, name: "Panchakarma Oil", category: "oils",
    price: 899, rating: 4.8, reviews: 167, image: "🧴",
    description: "Premium herbal oil blend for therapeutic massage",
    benefits: ["Relaxation", "Muscle relief", "Detox"],
  },
  {
    id: 5, name: "Brahmi Hair Oil", category: "oils",
    price: 349, rating: 4.6, reviews: 298, image: "💆",
    description: "Ayurvedic hair oil for healthy, strong hair",
    benefits: ["Hair growth", "Scalp health", "Anti-grey"],
  },
  {
    id: 6, name: "Kumkumadi Face Oil", category: "oils",
    price: 1299, originalPrice: 1599, rating: 4.9, reviews: 412, image: "✨",
    description: "Luxurious saffron-based oil for radiant skin",
    benefits: ["Brightening", "Anti-aging", "Glow"],
  },
  {
    id: 7, name: "Copper Tongue Scraper", category: "equipment",
    price: 249, rating: 4.7, reviews: 534, image: "🪥",
    description: "Pure copper tongue cleaner for oral hygiene",
    benefits: ["Oral detox", "Fresh breath", "Digestion"],
  },
  {
    id: 8, name: "Copper Water Bottle", category: "equipment",
    price: 799, rating: 4.8, reviews: 321, image: "🫗",
    description: "Handcrafted pure copper bottle for healthy water",
    benefits: ["Alkaline water", "Immunity", "Digestion"],
  },
  {
    id: 9, name: "Neti Pot (Ceramic)", category: "equipment",
    price: 449, rating: 4.5, reviews: 198, image: "🏺",
    description: "Traditional nasal cleansing pot for respiratory health",
    benefits: ["Sinus relief", "Breathing", "Allergy relief"],
  },
  {
    id: 10, name: "Yoga Mat (Organic)", category: "equipment",
    price: 1499, originalPrice: 1999, rating: 4.9, reviews: 267, image: "🧘",
    description: "Eco-friendly yoga mat made from natural materials",
    benefits: ["Non-slip", "Eco-friendly", "Comfortable"],
  },
  {
    id: 11, name: "Brahmi Capsules", category: "supplements",
    price: 549, rating: 4.7, reviews: 178, image: "🧠",
    description: "Brain tonic for memory and cognitive function",
    benefits: ["Memory boost", "Focus", "Mental clarity"],
  },
  {
    id: 12, name: "Sesame Massage Oil", category: "oils",
    price: 399, rating: 4.6, reviews: 234, image: "🌰",
    description: "Warming sesame oil for Abhyanga self-massage",
    benefits: ["Nourishing", "Warming", "Joint health"],
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) newCart[productId]--;
      else delete newCart[productId];
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === Number(productId));
    return total + (product?.price || 0) * quantity;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="bg-secondary/30 py-10 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] sm:text-xs font-medium text-accent-foreground uppercase tracking-wide">Authentic Ayurvedic</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
                Ayurvedic <span className="text-gradient-emerald">Products</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Verified supplements, oils, and wellness essentials for your health journey
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Search & Filter */}
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 rounded-xl h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Summary (sticky on mobile) */}
          {cartItemCount > 0 && (
            <div className="sticky top-16 z-40 mb-4 sm:mb-6">
              <div className="bg-card/90 backdrop-blur-lg border border-primary/20 rounded-2xl p-3 sm:p-4 shadow-elevated flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cartItemCount} items</p>
                    <p className="text-xs text-muted-foreground">in your cart</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-display font-bold text-primary">₹{cartTotal}</p>
                  <Button size="sm" className="rounded-full text-xs mt-1 h-7 px-3">
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id}
                className="group border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card hover:-translate-y-1 overflow-hidden rounded-2xl animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative h-28 sm:h-40 bg-secondary/50 flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-105 transition-transform duration-300">
                    {product.image}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-destructive text-[10px] sm:text-xs px-1.5 sm:px-2">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-0.5 sm:mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 line-clamp-2 hidden sm:block">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-2 hidden sm:flex">
                      {product.benefits.slice(0, 2).map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-ayush-gold text-ayush-gold" />
                      <span className="text-[10px] sm:text-xs font-medium text-foreground">{product.rating}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price & Cart */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-sm sm:text-base font-bold text-foreground">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-muted-foreground line-through ml-1">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {cart[product.id] ? (
                        <div className="flex items-center gap-1.5">
                          <button 
                            className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs sm:text-sm font-medium w-5 text-center">{cart[product.id]}</span>
                          <button 
                            className="w-6 sm:w-7 h-6 sm:h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          className="rounded-full text-[10px] sm:text-xs h-7 sm:h-8 px-2.5 sm:px-3" 
                          onClick={() => addToCart(product.id)}
                        >
                          <Plus className="w-3 h-3 mr-0.5 sm:mr-1" />
                          <span className="hidden sm:inline">Add</span>
                          <span className="sm:hidden">+</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-sm text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;