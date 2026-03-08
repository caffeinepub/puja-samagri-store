import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoginPrompt } from "../components/LoginPrompt";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAllProducts, useCart, usePlaceOrder } from "../hooks/useQueries";

function formatPrice(paise: number) {
  return `₹${(paise / 100).toFixed(0)}`;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading: cartLoading } = useCart();
  const { data: products = [] } = useAllProducts();
  const placeOrder = usePlaceOrder();
  const { identity, login } = useInternetIdentity();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const enrichedItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const subtotal = enrichedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.price) * Number(item.quantity);
  }, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!address.trim() || address.trim().length < 10)
      errs.address = "Please enter a complete address";
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to place an order", {
        action: { label: "Login", onClick: login },
      });
      return;
    }
    if (!validate()) return;
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    placeOrder.mutate(
      { customerName: name, address, phone },
      {
        onSuccess: () => {
          navigate({ to: "/order-confirmation" });
        },
        onError: (err) => {
          toast.error(`Failed to place order: ${err.message}`);
        },
      },
    );
  };

  if (!identity) {
    return (
      <LoginPrompt
        title="Login to Checkout"
        description="Securely complete your order with Internet Identity — your gateway to the decentralized web."
        showBackButton
        onBack={() =>
          navigate({ to: "/catalog", search: { category: undefined } })
        }
      />
    );
  }

  return (
    <div className="min-h-screen py-8 container mx-auto px-4 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-saffron/10"
          onClick={() =>
            navigate({ to: "/catalog", search: { category: undefined } })
          }
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Checkout
          </h1>
          <p className="font-body text-muted-foreground text-sm">
            Complete your order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div>
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-saffron" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="font-body text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ramesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-body"
                    data-ocid="checkout.name.input"
                  />
                  {errors.name && (
                    <p
                      className="text-destructive text-xs mt-1 font-body"
                      data-ocid="checkout.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    className="font-body text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Delivery Address *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="House No., Street, Area, City, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="font-body min-h-[100px]"
                    data-ocid="checkout.address.textarea"
                  />
                  {errors.address && (
                    <p
                      className="text-destructive text-xs mt-1 font-body"
                      data-ocid="checkout.error_state"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="font-body text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-body"
                    data-ocid="checkout.phone.input"
                  />
                  {errors.phone && (
                    <p
                      className="text-destructive text-xs mt-1 font-body"
                      data-ocid="checkout.error_state"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-saffron hover:bg-saffron-dark text-white font-body font-semibold mt-2"
                  disabled={placeOrder.isPending || cartItems.length === 0}
                  data-ocid="checkout.submit.button"
                >
                  {placeOrder.isPending ? (
                    <>
                      <Loader2
                        className="w-4 h-4 mr-2 animate-spin"
                        data-ocid="checkout.loading_state"
                      />
                      Placing Order...
                    </>
                  ) : (
                    <>Place Order — {formatPrice(subtotal)}</>
                  )}
                </Button>

                {placeOrder.isError && (
                  <div
                    className="text-center p-3 bg-destructive/10 rounded-lg"
                    data-ocid="checkout.error_state"
                  >
                    <p className="text-destructive text-sm font-body">
                      Failed to place order. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-saffron" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 rounded-lg" />
                  ))}
                </div>
              ) : enrichedItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-body text-muted-foreground">
                    Cart is empty
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {enrichedItems.map((item, idx) => (
                      <div
                        key={item.productId.toString()}
                        className="flex items-center justify-between gap-3"
                        data-ocid={`cart.item.${idx + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-foreground truncate">
                            {item.product?.name ?? "Unknown"}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            Qty: {item.quantity.toString()}
                          </p>
                        </div>
                        <span className="font-body text-sm font-semibold text-saffron whitespace-nowrap">
                          {item.product
                            ? formatPrice(
                                Number(item.product.price) *
                                  Number(item.quantity),
                              )
                            : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div className="flex justify-between font-body text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span className="text-saffron">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
