import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Product, ProductCategory } from "../backend.d";
import type { Review } from "../backend.d";
import { useCartDrawer } from "../context/CartContext";
import { KIT_ITEMS } from "../data/kitItems";
import { PRODUCT_IMAGES } from "../data/productImages";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddReview,
  useAddToCart,
  useAllProducts,
  useProductReviews,
} from "../hooks/useQueries";

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

function formatPaiseFn(paise: number) {
  return `₹${(paise / 100).toFixed(0)}`;
}

const CATEGORY_EMOJI: Record<string, string> = {
  [ProductCategory.flowers]: "🌸",
  [ProductCategory.haar]: "💐",
  [ProductCategory.books]: "📚",
  [ProductCategory.pujaEssentials]: "🪔",
  [ProductCategory.thaliSets]: "🥣",
  [ProductCategory.occasionPackages]: "📦",
};

const CATEGORY_LABELS: Record<string, string> = {
  [ProductCategory.flowers]: "Flowers",
  [ProductCategory.haar]: "Haar / Garlands",
  [ProductCategory.books]: "Ritual Books",
  [ProductCategory.pujaEssentials]: "Puja Essentials",
  [ProductCategory.thaliSets]: "Thali Sets",
  [ProductCategory.occasionPackages]: "Occasion Packages",
};

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeCls = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeCls} ${
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-amber-300"
          }`}
        />
      ))}
    </div>
  );
}

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" data-ocid="review.rating.select" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          className="cursor-pointer transition-transform hover:scale-110"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              star <= (hover || value) ? "fill-amber-400 text-amber-400" : "fill-transparent text-amber-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ===================== Kit Customizer =====================

function KitCustomizer({
  productId,
  onPriceChange,
}: {
  productId: string;
  onPriceChange: (total: number) => void;
}) {
  const items = KIT_ITEMS[productId];
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set((KIT_ITEMS[productId] ?? []).filter((i) => i.essential).map((i) => i.id)),
  );

  // Calculate total price whenever selection changes
  useEffect(() => {
    if (!items) return;
    const total = items
      .filter((item) => selected.has(item.id))
      .reduce((sum, item) => sum + item.price, 0);
    onPriceChange(total);
  }, [selected, items, onPriceChange]);

  if (!items) return null;

  const toggleItem = (id: string, essential: boolean) => {
    if (essential) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedItems = items.filter((item) => selected.has(item.id));
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const selectedCount = selected.size;
  const totalCount = items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-8"
      data-ocid="kit.customizer.panel"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-saffron" />
          Customize Your Kit
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <p className="font-body text-sm text-muted-foreground mb-4">
        Select what you want included in your kit. Items marked as{" "}
        <span className="text-saffron font-semibold">Essential</span> are always included. Price updates automatically.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {items.map((item, idx) => {
          const isSelected = selected.has(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              data-ocid={`kit.item.${idx + 1}`}
            >
              <label
                htmlFor={`kit-item-${item.id}`}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected ? "border-saffron/50 bg-amber-50/60" : "border-border bg-card hover:border-saffron/20"
                } ${item.essential ? "cursor-default" : "cursor-pointer"}`}
              >
                <Checkbox
                  id={`kit-item-${item.id}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleItem(item.id, item.essential)}
                  disabled={item.essential}
                  className="mt-0.5 data-[state=checked]:bg-saffron data-[state=checked]:border-saffron"
                  data-ocid={`kit.item.checkbox.${idx + 1}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-base">{item.emoji}</span>
                    <span className="font-body font-semibold text-sm text-foreground">{item.name}</span>
                    {item.essential && (
                      <Badge className="text-xs bg-saffron/15 text-saffron border-saffron/30 px-1.5 py-0">
                        Essential
                      </Badge>
                    )}
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-body text-xs text-muted-foreground">{item.qty}</span>
                    <span className="font-display text-sm font-bold text-saffron">{formatPaiseFn(item.price)}</span>
                  </div>
                </div>
              </label>
            </motion.div>
          );
        })}
      </div>

      {/* Kit Summary */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body font-semibold text-amber-900 text-sm">Kit Summary</p>
            <p className="font-body text-xs text-amber-700 mt-0.5">
              {selectedCount} of {totalCount} items selected
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-amber-700 mb-0.5">Kit Total</p>
            <p className="font-display text-2xl font-bold text-saffron">{formatPaiseFn(totalPrice)}</p>
          </div>
        </div>
        {selectedCount === totalCount && (
          <p className="font-body text-xs text-green-700 flex items-center gap-1 mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> Full kit selected — best value!
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ===================== Review Card =====================

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const principal = review.reviewer.toString();
  const truncatedPrincipal = `${principal.slice(0, 10)}...${principal.slice(-6)}`;
  const rating = Number(review.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      data-ocid={`reviews.item.${index + 1}`}
      className="p-4 rounded-xl bg-card border border-border"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <StarDisplay rating={rating} size="sm" />
          <p className="font-body text-xs text-muted-foreground mt-1 font-mono">{truncatedPrincipal}</p>
        </div>
        <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          Verified
        </Badge>
      </div>
      {review.comment && (
        <p className="font-body text-sm text-foreground leading-relaxed mt-2">{review.comment}</p>
      )}
    </motion.div>
  );
}

// ===================== Write Review Form =====================

function WriteReviewForm({ productId }: { productId: bigint }) {
  const { identity, login } = useInternetIdentity();
  const addReview = useAddReview();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!identity) {
    return (
      <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-center">
        <p className="font-body text-sm text-amber-800 mb-3">Please login to write a review</p>
        <Button
          size="sm"
          onClick={() => login()}
          className="bg-saffron hover:bg-saffron-dark text-white font-body"
          data-ocid="review.login.button"
        >
          Login to Review
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-5 rounded-xl bg-green-50 border border-green-200 text-center" data-ocid="review.success_state">
        <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="font-body text-sm text-green-800 font-semibold">Review submitted! Thank you.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    addReview.mutate(
      { productId, rating: BigInt(rating), comment },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Review submitted!");
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : "Failed to submit review");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-card border border-border space-y-4" data-ocid="review.form">
      <h3 className="font-display font-bold text-foreground text-base">Write a Review</h3>
      <div>
        <Label className="font-body text-sm text-muted-foreground mb-2 block">Your Rating *</Label>
        <StarSelector value={rating} onChange={setRating} />
      </div>
      <div>
        <Label htmlFor="review-comment" className="font-body text-sm text-muted-foreground mb-2 block">
          Your Review (optional)
        </Label>
        <Textarea
          id="review-comment"
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="font-body text-sm resize-none"
          data-ocid="review.textarea"
        />
      </div>
      <Button
        type="submit"
        disabled={addReview.isPending || rating === 0}
        className="bg-saffron hover:bg-saffron-dark text-white font-body w-full"
        data-ocid="review.submit_button"
      >
        {addReview.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}

// ===================== Related Products =====================

function RelatedProductCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={() => navigate({ to: "/product/$id", params: { id: product.id.toString() } })}
      data-ocid={`related.product.item.${index + 1}`}
    >
      <div className="rounded-xl bg-card border border-border hover:border-saffron/30 hover:shadow-card transition-all duration-200 overflow-hidden">
        <div className="w-full h-28 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
          {PRODUCT_IMAGES[Number(product.id)] ? (
            <img
              src={PRODUCT_IMAGES[Number(product.id)]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <span className="text-3xl">{CATEGORY_EMOJI[product.category] ?? "🌿"}</span>
          )}
        </div>
        <div className="p-3">
          <p className="font-body font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-1">{product.name}</p>
          <p className="font-display text-base font-bold text-saffron">{formatPrice(product.price)}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ===================== Main Page =====================

export function ProductDetailPage() {
  const params = useParams({ from: "/product/$id" });
  const productId = params.id;
  const navigate = useNavigate();
  const { openCart } = useCartDrawer();
  const { identity, login } = useInternetIdentity();

  const { data: allProducts = [], isLoading: productsLoading } = useAllProducts();
  const product = allProducts.find((p) => p.id.toString() === productId);

  const productIdBigInt = product?.id ?? BigInt(0);
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(productIdBigInt);

  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [kitPrice, setKitPrice] = useState<number | null>(null);

  const relatedProducts = allProducts
    .filter((p) => product && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const avgRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length : 0;

  const handleAddToCart = () => {
    if (!identity) {
      toast.error("Please login to add items to cart", {
        action: { label: "Login", onClick: login },
      });
      return;
    }
    if (!product) return;

    setIsAdding(true);
    addToCart.mutate(
      { productId: product.id, quantity: BigInt(quantity) },
      {
        onSuccess: () => {
          setIsAdding(false);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2500);
          toast.success(`${product.name} added to cart!`, {
            action: { label: "View Cart", onClick: openCart },
          });
        },
        onError: (err) => {
          setIsAdding(false);
          const msg = err instanceof Error ? err.message : "Failed to add to cart";
          toast.error(
            msg.includes("not ready")
              ? "Still connecting, please try again in a moment."
              : "Failed to add to cart. Please try again.",
          );
        },
      },
    );
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen py-10 container mx-auto px-4">
        <div className="mb-6"><Skeleton className="h-4 w-56 mb-8" /></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-6xl">🔍</div>
        <h2 className="font-display text-2xl font-bold text-foreground">Product Not Found</h2>
        <p className="font-body text-muted-foreground">This product doesn't exist or may have been removed.</p>
        <Button
          onClick={() => navigate({ to: "/catalog", search: { category: undefined } })}
          className="bg-saffron hover:bg-saffron-dark text-white font-body mt-2"
          data-ocid="product.back.button"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const isKit = product.category === ProductCategory.occasionPackages;
  const emoji = CATEGORY_EMOJI[product.category] ?? "🌿";
  const productImage = PRODUCT_IMAGES[Number(product.id)];

  // Determine displayed price: dynamic kit price or product price
  const displayPrice = isKit && kitPrice !== null ? kitPrice : null;

  return (
    <div className="min-h-screen py-8 container mx-auto px-4 max-w-5xl">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6" data-ocid="product.breadcrumb.panel">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" data-ocid="product.home.link" className="font-body text-sm">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/catalog"
                search={{ category: product.category }}
                data-ocid="product.catalog.link"
                className="font-body text-sm"
              >
                {CATEGORY_LABELS[product.category] ?? "Shop"}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-body text-sm font-semibold">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate({ to: "/catalog", search: { category: undefined } })}
        className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-saffron transition-colors mb-6"
        data-ocid="product.back.button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </button>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-100 aspect-square flex items-center justify-center shadow-card">
            {productImage ? (
              <motion.img
                src={productImage}
                alt={product.name}
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-saffron/8" />
                <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-amber-400/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-amber-100/40" />
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-[9rem] leading-none select-none relative z-10 drop-shadow-sm"
                  aria-hidden="true"
                >
                  {emoji}
                </motion.div>
              </>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <Badge className={product.inStock ? "bg-green-500/90 text-white border-0 text-xs font-body" : "bg-red-500/90 text-white border-0 text-xs font-body"}>
                {product.inStock ? "✓ In Stock" : "Out of Stock"}
              </Badge>
              {product.occasionTag && (
                <Badge className="bg-amber-500/90 text-white border-0 text-xs font-body">{product.occasionTag}</Badge>
              )}
              {isKit && (
                <Badge className="bg-maroon/90 text-white border-0 text-xs font-body">Customizable Kit</Badge>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: <Truck className="w-4 h-4" />, text: "Same Day Delivery" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "100% Fresh" },
              { icon: <Package className="w-4 h-4" />, text: "Securely Packed" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-cream-dark/70 text-center">
                <span className="text-saffron">{item.icon}</span>
                <span className="font-body text-xs text-muted-foreground leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <p className="font-body text-sm text-saffron font-semibold tracking-wide uppercase">
            {CATEGORY_LABELS[product.category]}
          </p>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarDisplay rating={Math.round(avgRating)} size="sm" />
              <span className="font-body text-sm text-muted-foreground">
                {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}

          {/* Price — dynamic for kits */}
          <div className="flex items-baseline gap-2 flex-wrap">
            {displayPrice !== null ? (
              <>
                <span className="font-display text-4xl font-bold text-saffron">
                  {`₹${(displayPrice / 100).toFixed(0)}`}
                </span>
                <span className="font-body text-sm text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  customized price
                </span>
              </>
            ) : (
              <span className="font-display text-4xl font-bold text-saffron">{formatPrice(product.price)}</span>
            )}
            <span className="font-body text-base text-muted-foreground">/ {product.unit}</span>
          </div>

          {isKit && (
            <p className="font-body text-xs text-muted-foreground bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              💡 Price updates as you add or remove items in the kit customizer below.
            </p>
          )}

          <Separator />

          <p className="font-body text-base text-foreground/80 leading-relaxed">{product.description}</p>

          {product.inStock && (
            <div className="flex items-center gap-3">
              <span className="font-body text-sm font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center gap-1 bg-cream-dark rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-card hover:text-saffron transition-all"
                  disabled={quantity <= 1}
                  data-ocid="product.qty.minus.button"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-body font-bold text-foreground text-base">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-card hover:text-saffron transition-all"
                  disabled={quantity >= 10}
                  data-ocid="product.qty.plus.button"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={justAdded ? "added" : "default"}>
              <Button
                className={`w-full h-12 font-body font-semibold text-base transition-all duration-300 ${
                  justAdded ? "bg-green-600 hover:bg-green-700 text-white" : "bg-saffron hover:bg-saffron-dark text-white"
                }`}
                disabled={!product.inStock || isAdding}
                onClick={handleAddToCart}
                data-ocid="product.addtocart.button"
                size="lg"
              >
                {justAdded ? (
                  <><CheckCircle2 className="w-5 h-5 mr-2" />Added to Cart!</>
                ) : isAdding ? (
                  "Adding..."
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : (
                  <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>
                )}
              </Button>
            </motion.div>
          </AnimatePresence>

          {!identity && product.inStock && (
            <p className="font-body text-xs text-center text-muted-foreground">
              <button
                type="button"
                onClick={() => login()}
                className="text-saffron font-semibold hover:underline"
                data-ocid="product.login.button"
              >
                Login
              </button>{" "}
              to add this item to your cart
            </p>
          )}

          {product.occasionTag && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="font-body text-sm text-amber-800">
                🎉 <span className="font-semibold">Perfect for:</span> {product.occasionTag}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Kit Customizer */}
      {isKit && <KitCustomizer productId={productId} onPriceChange={setKitPrice} />}

      <Separator className="my-10" />

      {/* Reviews section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        data-ocid="reviews.section"
      >
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Customer Reviews</h2>
          {reviews.length > 0 && (
            <Badge className="bg-saffron/15 text-saffron border-saffron/30 font-body">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        {reviews.length > 0 && (
          <Card className="mb-6 bg-amber-50/50 border-amber-200">
            <CardContent className="p-5 flex items-center gap-6">
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-saffron">{avgRating.toFixed(1)}</div>
                <StarDisplay rating={Math.round(avgRating)} size="md" />
                <p className="font-body text-xs text-muted-foreground mt-1">out of 5</p>
              </div>
              <Separator orientation="vertical" className="h-16" />
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => Number(r.rating) === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="font-body text-xs text-muted-foreground w-3">{star}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-body text-xs text-muted-foreground w-4 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {reviewsLoading ? (
          <div className="space-y-3" data-ocid="reviews.loading_state">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="py-12 text-center rounded-xl bg-cream-dark/50 border border-dashed border-border mb-6"
            data-ocid="reviews.empty_state"
          >
            <div className="text-4xl mb-3">⭐</div>
            <p className="font-body text-base font-semibold text-foreground mb-1">No reviews yet</p>
            <p className="font-body text-sm text-muted-foreground">Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {reviews.map((review, idx) => (
              <ReviewCard key={`${review.reviewer.toString()}-${idx}`} review={review} index={idx} />
            ))}
          </div>
        )}

        <WriteReviewForm productId={productIdBigInt} />
      </motion.section>

      {relatedProducts.length > 0 && (
        <>
          <Separator className="my-10" />
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            data-ocid="related.products.section"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedProducts.map((p, idx) => (
                <RelatedProductCard key={p.id.toString()} product={p} index={idx} />
              ))}
            </div>
          </motion.section>
        </>
      )}

      <div className="h-12" />
    </div>
  );
}
