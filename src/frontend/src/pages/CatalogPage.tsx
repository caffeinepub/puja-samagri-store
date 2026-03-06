import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Plus, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Product, ProductCategory } from "../backend.d";
import { useCartDrawer } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart, useAllProducts } from "../hooks/useQueries";

type CategoryTab = "all" | ProductCategory;

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  [ProductCategory.flowers]: "Flowers",
  [ProductCategory.haar]: "Haar",
  [ProductCategory.books]: "Ritual Books",
  [ProductCategory.pujaEssentials]: "Puja Essentials",
  [ProductCategory.thaliSets]: "Thali Sets",
  [ProductCategory.occasionPackages]: "Occasion Packages",
};

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3 mb-3" />
        <Skeleton className="h-6 w-1/3" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

function ProductCard({
  product,
  index,
  onAddToCart,
  isAdding,
  justAdded,
}: {
  product: Product;
  index: number;
  onAddToCart: (productId: bigint) => void;
  isAdding: boolean;
  justAdded: boolean;
}) {
  const categoryEmoji: Record<string, string> = {
    [ProductCategory.flowers]: "🌸",
    [ProductCategory.haar]: "💐",
    [ProductCategory.books]: "📚",
    [ProductCategory.pujaEssentials]: "🪔",
    [ProductCategory.thaliSets]: "🥣",
    [ProductCategory.occasionPackages]: "📦",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(217,119,6,0.18)" }}
      whileTap={{ scale: 0.97 }}
      data-ocid={`catalog.product.item.${index + 1}`}
      style={{ position: "relative" }}
    >
      {/* Success shimmer overlay */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-green-400/20 rounded-lg z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <Card className="overflow-hidden bg-card border-border hover:shadow-xl hover:border-saffron/30 transition-all duration-300 h-full flex flex-col">
        {/* Color header */}
        <div className="h-2 gradient-saffron" />
        <CardContent className="p-4 flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-2xl">
              {categoryEmoji[product.category] ?? "🌿"}
            </div>
            <Badge
              variant={product.inStock ? "default" : "secondary"}
              className={
                product.inStock
                  ? "bg-green-100 text-green-800 border-green-200 text-xs"
                  : "bg-red-100 text-red-700 border-red-200 text-xs"
              }
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-foreground mb-1 text-base leading-tight">
            {product.name}
          </h3>
          <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-saffron">
              {formatPrice(product.price)}
            </span>
            <span className="font-body text-xs text-muted-foreground">
              /{product.unit}
            </span>
          </div>
          {product.occasionTag && (
            <Badge
              variant="outline"
              className="mt-2 text-xs border-amber-300 text-amber-700 bg-amber-50"
            >
              {product.occasionTag}
            </Badge>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <motion.div className="w-full" whileTap={{ scale: 0.92 }}>
            <Button
              className={`w-full font-body text-sm transition-all duration-300 ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-saffron hover:bg-saffron-dark text-white"
              }`}
              disabled={!product.inStock || isAdding}
              onClick={() => onAddToCart(product.id)}
              data-ocid={`catalog.addtocart.button.${index + 1}`}
            >
              {justAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Added!
                </>
              ) : isAdding ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function CatalogPage() {
  const search = useSearch({ from: "/catalog" });
  const navigate = useNavigate();
  const { openCart } = useCartDrawer();

  const defaultCategory = (search as { category?: string }).category || "all";
  const [activeTab, setActiveTab] = useState<CategoryTab>(
    defaultCategory as CategoryTab,
  );
  const [addingIds, setAddingIds] = useState<Set<string>>(new Set());
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const { data: allProducts = [], isLoading } = useAllProducts();
  const addToCart = useAddToCart();
  const { identity, login } = useInternetIdentity();

  useEffect(() => {
    const cat = (search as { category?: string }).category;
    if (cat) setActiveTab(cat as CategoryTab);
  }, [search]);

  const filteredProducts =
    activeTab === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeTab);

  const handleAddToCart = (productId: bigint) => {
    if (!identity) {
      toast.error("Please login to add items to cart", {
        action: { label: "Login", onClick: login },
      });
      return;
    }
    const key = productId.toString();
    setAddingIds((prev) => new Set(prev).add(key));
    addToCart.mutate(
      { productId, quantity: BigInt(1) },
      {
        onSuccess: () => {
          setAddingIds((prev) => {
            const n = new Set(prev);
            n.delete(key);
            return n;
          });
          setAddedIds((prev) => new Set(prev).add(key));
          setTimeout(() => {
            setAddedIds((prev) => {
              const n = new Set(prev);
              n.delete(key);
              return n;
            });
          }, 2000);
          toast.success("Added to cart!", {
            action: { label: "View Cart", onClick: openCart },
          });
        },
        onError: () => {
          setAddingIds((prev) => {
            const n = new Set(prev);
            n.delete(key);
            return n;
          });
          toast.error("Failed to add to cart");
        },
      },
    );
  };

  const handleTabChange = (val: string) => {
    setActiveTab(val as CategoryTab);
    navigate({
      to: "/catalog",
      search: { category: val !== "all" ? val : undefined },
    });
  };

  return (
    <div className="min-h-screen py-8 container mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Our Products
        </h1>
        <p className="font-body text-muted-foreground">
          Fresh puja samagri — flowers, garlands & more
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList
          className="flex flex-wrap h-auto gap-1 bg-cream-dark p-1 rounded-xl mb-6"
          data-ocid="catalog.category.tab"
        >
          {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
            <TabsTrigger
              key={val}
              value={val}
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-3 py-1.5"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(CATEGORY_LABELS).map((cat) => (
          <TabsContent key={cat} value={cat}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 gap-4"
                data-ocid="catalog.product.empty_state"
              >
                <div className="text-5xl">🌿</div>
                <p className="font-body text-muted-foreground">
                  No products found in this category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={idx}
                    onAddToCart={handleAddToCart}
                    isAdding={addingIds.has(product.id.toString())}
                    justAdded={addedIds.has(product.id.toString())}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick add notice for non-logged users */}
      {!identity && (
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => login()}
              className="text-saffron font-semibold hover:underline"
            >
              Login
            </button>{" "}
            to add products to your cart
          </p>
        </div>
      )}

      {/* Sticky cart button */}
      <button
        type="button"
        onClick={openCart}
        className="fixed bottom-6 right-6 bg-saffron hover:bg-saffron-dark text-white rounded-full px-5 py-3 shadow-warm flex items-center gap-2 font-body font-semibold text-sm transition-all duration-300 hover:scale-105 md:hidden z-40"
        data-ocid="nav.cart.button"
      >
        <Plus className="w-4 h-4" /> View Cart
      </button>
    </div>
  );
}
