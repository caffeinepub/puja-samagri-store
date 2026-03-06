import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Package, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCartDrawer } from "../context/CartContext";
import { SEED_PRODUCTS } from "../data/seedProducts";
import {
  useAllProducts,
  useCart,
  useRemoveFromCart,
} from "../hooks/useQueries";

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

export function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer();
  const { data: cartItems = [], isLoading: cartLoading } = useCart();
  const { data: products = [] } = useAllProducts();
  const removeFromCart = useRemoveFromCart();
  const navigate = useNavigate();

  const allProducts = products.length > 0 ? products : SEED_PRODUCTS;

  const enrichedItems = cartItems.map((item) => {
    const product = allProducts.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const total = enrichedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.price) * Number(item.quantity);
  }, 0);

  const handleCheckout = () => {
    closeCart();
    navigate({ to: "/checkout" });
  };

  const handleRemove = (productId: bigint, index: number) => {
    removeFromCart.mutate(productId, {
      onSuccess: () => toast.success("Item removed from cart"),
      onError: () => toast.error("Failed to remove item"),
    });
    void index;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="cart.drawer"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="font-display text-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-saffron" />
            Your Cart
            {cartItems.length > 0 && (
              <Badge className="bg-saffron text-white ml-1">
                {cartItems.length}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {cartLoading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : enrichedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Package className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground font-body text-sm">
                Your cart is empty
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  closeCart();
                  navigate({ to: "/catalog", search: { category: undefined } });
                }}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {enrichedItems.map((item, index) => (
                <div
                  key={item.productId.toString()}
                  className="flex items-center gap-3 p-3 rounded-lg bg-cream-dark"
                  data-ocid={`cart.item.${index + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-foreground truncate">
                      {item.product?.name ?? "Unknown Product"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.quantity.toString()} ×{" "}
                      {item.product ? formatPrice(item.product.price) : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-saffron">
                      {item.product
                        ? `₹${((Number(item.product.price) * Number(item.quantity)) / 100).toFixed(0)}`
                        : "—"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => handleRemove(item.productId, index)}
                    data-ocid={`cart.remove.button.${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {enrichedItems.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-3">
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-body font-semibold text-foreground">
                Total
              </span>
              <span className="font-display text-lg font-bold text-saffron">
                ₹{(total / 100).toFixed(0)}
              </span>
            </div>
            <Button
              className="w-full bg-saffron hover:bg-saffron-dark text-white font-body"
              onClick={handleCheckout}
              data-ocid="cart.checkout.button"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
