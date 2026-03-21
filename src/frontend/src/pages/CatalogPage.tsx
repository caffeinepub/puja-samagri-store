import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Eye, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Product, ProductCategory } from "../backend.d";
import { useCartDrawer } from "../context/CartContext";
import { PRODUCT_IMAGES } from "../data/productImages";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart, useAllProducts } from "../hooks/useQueries";

type CategoryTab = "all" | ProductCategory;

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  all: { label: "All", emoji: "🛍️" },
  [ProductCategory.flowers]: { label: "Flowers", emoji: "🌸" },
  [ProductCategory.haar]: { label: "Haar", emoji: "💐" },
  [ProductCategory.books]: { label: "Ritual Books", emoji: "📚" },
  [ProductCategory.pujaEssentials]: { label: "Puja Essentials", emoji: "🪔" },
  [ProductCategory.thaliSets]: { label: "Thali Sets", emoji: "🥣" },
  [ProductCategory.occasionPackages]: { label: "Occasions", emoji: "📦" },
};

// Category gradient backgrounds for the image block
const CATEGORY_GRADIENTS: Record<string, string> = {
  [ProductCategory.flowers]:
    "linear-gradient(135deg, oklch(0.85 0.14 55), oklch(0.75 0.18 45))",
  [ProductCategory.haar]:
    "linear-gradient(135deg, oklch(0.88 0.12 0), oklch(0.75 0.18 355))",
  [ProductCategory.books]:
    "linear-gradient(135deg, oklch(0.78 0.14 280), oklch(0.65 0.2 265))",
  [ProductCategory.pujaEssentials]:
    "linear-gradient(135deg, oklch(0.90 0.14 85), oklch(0.78 0.2 72))",
  [ProductCategory.thaliSets]:
    "linear-gradient(135deg, oklch(0.85 0.16 72), oklch(0.72 0.21 55))",
  [ProductCategory.occasionPackages]:
    "linear-gradient(135deg, oklch(0.78 0.18 30), oklch(0.60 0.2 20))",
};

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-36 w-full rounded-t-lg rounded-b-none" />
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

function StarRating({
  count = 5,
  rating = 4,
}: { count?: number; rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative stars
          key={i}
          className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
        />
      ))}
    </div>
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
  const navigate = useNavigate();
  const categoryEmoji: Record<string, string> = {
    [ProductCategory.flowers]: "🌸",
    [ProductCategory.haar]: "💐",
    [ProductCategory.books]: "📚",
    [ProductCategory.pujaEssentials]: "🪔",
    [ProductCategory.thaliSets]: "🥣",
    [ProductCategory.occasionPackages]: "📦",
  };

  const productImage = PRODUCT_IMAGES[Number(product.id)];

  const handleCardClick = () => {
    navigate({ to: "/product/$id", params: { id: product.id.toString() } });
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  // Static pseudo-random rating 3–5 based on product id
  const rating = 3 + (Number(product.id) % 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      data-ocid={`catalog.product.item.${index + 1}`}
      style={{ position: "relative" }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      {/* Added shimmer overlay */}
      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-green-400/20 rounded-2xl z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <Card className="overflow-hidden bg-card border-border/70 hover:shadow-elevated hover:border-saffron/25 transition-all duration-300 h-full flex flex-col rounded-2xl">
        {/* Product image block — h-48 */}
        <div
          className="group relative overflow-hidden"
          style={{
            height: "12rem",
            borderRadius: "var(--radius) var(--radius) 0 0",
          }}
        >
          {productImage ? (
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  CATEGORY_GRADIENTS[product.category] ||
                  "linear-gradient(135deg, oklch(0.85 0.12 70), oklch(0.75 0.18 55))",
              }}
            >
              <span className="text-7xl select-none drop-shadow-sm">
                {categoryEmoji[product.category] ?? "🌿"}
              </span>
            </div>
          )}

          {/* Dark gradient overlay at bottom for readability */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* View detail overlay button */}
          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            data-ocid={`catalog.view.button.${index + 1}`}
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* In/Out of stock badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className={`text-xs font-body border-0 ${
                product.inStock
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          {/* Low stock badge */}
          {product.inStock && Number(product.id) % 3 === 1 && (
            <div className="absolute top-3 right-3">
              <Badge className="text-xs font-body border-0 bg-orange-500/90 text-white">
                Low Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1">
          {/* Star rating */}
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={rating} />
            <span className="font-body text-xs text-muted-foreground">
              ({20 + (Number(product.id) % 80)})
            </span>
          </div>

          <h3 className="font-display font-bold text-foreground mb-1 text-sm leading-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold text-saffron">
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
          <motion.div className="w-full" whileTap={{ scale: 0.93 }}>
            <Button
              className={`w-full font-body text-sm font-semibold transition-all duration-300 rounded-xl border-0 ${
                justAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "text-white"
              }`}
              style={
                justAdded
                  ? {}
                  : {
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.21 50), oklch(0.55 0.2 40))",
                    }
              }
              disabled={!product.inStock || isAdding}
              onClick={handleAddToCartClick}
              data-ocid={`catalog.addtocart.button.${index + 1}`}
            >
              {justAdded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Added to Cart!
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
    <div className="min-h-screen">
      {/* ── Mini hero strip ── */}
      <div className="devotional-section border-b border-border py-10 relative overflow-hidden">
        {/* Faint mandala right side */}
        <div className="absolute right-0 top-0 w-48 h-full pointer-events-none select-none opacity-30">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            fill="none"
            stroke="oklch(0.68 0.22 45)"
            strokeWidth="0.6"
            role="img"
            aria-label="Decorative pattern"
          >
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="65" />
            <circle cx="100" cy="100" r="40" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1={100 + 10 * Math.cos(rad)}
                  y1={100 + 10 * Math.sin(rad)}
                  x2={100 + 90 * Math.cos(rad)}
                  y2={100 + 90 * Math.sin(rad)}
                />
              );
            })}
          </svg>
        </div>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 relative">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Samudraj
            </h1>
            <p className="font-body text-muted-foreground text-sm">
              Fresh flowers, sacred essentials & ritual kits for your daily
              devotion
            </p>
          </div>
          <Badge className="w-fit font-body text-sm bg-saffron/10 text-saffron border border-saffron/20">
            {allProducts.length} products available
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* Pill-style tab list */}
          <TabsList
            className="flex flex-wrap gap-2 bg-transparent p-0 h-auto mb-8"
            data-ocid="catalog.category.tab"
          >
            {Object.entries(CATEGORY_LABELS).map(([val, { label, emoji }]) => (
              <TabsTrigger
                key={val}
                value={val}
                className="rounded-full px-5 py-2.5 font-body text-sm border border-border bg-card text-foreground/70 data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:border-saffron data-[state=active]:shadow-[0_2px_12px_oklch(0.68_0.22_45_/_0.3)] transition-all duration-200 hover:border-saffron/40"
              >
                <span className="mr-1.5">{emoji}</span>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(CATEGORY_LABELS).map((cat) => (
            <TabsContent key={cat} value={cat}>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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

        {/* Login prompt */}
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
      </div>
    </div>
  );
}
