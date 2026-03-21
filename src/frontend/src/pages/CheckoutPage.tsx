import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Package,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoginPrompt } from "../components/LoginPrompt";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllProducts,
  useCart,
  useCreateCheckoutSession,
  usePlaceOrder,
} from "../hooks/useQueries";

function formatPrice(paise: number) {
  return `₹${(paise / 100).toFixed(0)}`;
}

const VALID_COUPONS: Record<
  string,
  { type: "percent" | "flat"; value: number; label: string }
> = {
  SAMUDRAJ10: { type: "percent", value: 10, label: "10% off" },
  LAUNCH20: { type: "percent", value: 20, label: "20% off" },
  WELCOME5: { type: "flat", value: 500, label: "₹5 off" },
};

const COD_FEE = 4000; // ₹40 in paise

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

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online",
  );

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const enrichedItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const subtotal = enrichedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + Number(item.product.price) * Number(item.quantity);
  }, 0);

  const couponDiscount = (() => {
    if (!appliedCoupon) return 0;
    const c = VALID_COUPONS[appliedCoupon];
    if (!c) return 0;
    if (c.type === "percent") return Math.round((subtotal * c.value) / 100);
    return c.value;
  })();

  const codFee = paymentMethod === "cod" ? COD_FEE : 0;
  const total = subtotal - couponDiscount + codFee;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      toast.success(`Coupon ${code} applied! ${VALID_COUPONS[code].label}`);
    } else {
      setCouponError(
        "Invalid coupon code. Try SAMUDRAJ10, LAUNCH20, or WELCOME5",
      );
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

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

  const createCheckoutSession = useCreateCheckoutSession();

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

    if (paymentMethod === "online") {
      // Stripe payment flow
      const shoppingItems = enrichedItems
        .filter((item) => item.product)
        .map((item) => ({
          productName: item.product!.name,
          currency: "inr",
          quantity: item.quantity,
          priceInCents: item.product!.price,
          productDescription: item.product!.description,
        }));
      try {
        const session = await createCheckoutSession.mutateAsync(shoppingItems);
        if (session.url) {
          window.location.href = session.url;
        }
      } catch (err: any) {
        toast.error(`Payment failed: ${err.message}`);
      }
    } else {
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
    }
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
        <div className="space-y-5">
          {/* Delivery Details */}
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
                  disabled={
                    placeOrder.isPending ||
                    createCheckoutSession.isPending ||
                    cartItems.length === 0
                  }
                  data-ocid="checkout.submit.button"
                >
                  {placeOrder.isPending || createCheckoutSession.isPending ? (
                    <>
                      <Loader2
                        className="w-4 h-4 mr-2 animate-spin"
                        data-ocid="checkout.loading_state"
                      />
                      {createCheckoutSession.isPending
                        ? "Redirecting to Payment..."
                        : "Placing Order..."}
                    </>
                  ) : (
                    <>
                      {paymentMethod === "online"
                        ? "Pay Online — "
                        : "Place Order — "}
                      {formatPrice(total)}
                    </>
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

          {/* Payment Method */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-saffron" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all font-body text-sm ${
                  paymentMethod === "online"
                    ? "border-saffron bg-saffron/5 text-foreground"
                    : "border-border text-muted-foreground hover:border-saffron/50"
                }`}
                data-ocid="checkout.payment.toggle"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    paymentMethod === "online"
                      ? "border-saffron bg-saffron"
                      : "border-muted-foreground"
                  }`}
                />
                <span className="font-semibold">
                  💳 UPI / Net Banking / Cards
                </span>
                <span className="ml-auto text-xs text-green-600 font-medium">
                  Recommended
                </span>
              </button>

              {paymentMethod === "online" && (
                <p className="text-xs text-muted-foreground font-body px-1">
                  🔐 You'll be redirected to Stripe to complete payment
                  securely.
                </p>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`w-full flex flex-col gap-1 p-3 rounded-lg border transition-all font-body text-sm ${
                  paymentMethod === "cod"
                    ? "border-saffron bg-saffron/5"
                    : "border-border text-muted-foreground hover:border-saffron/50"
                }`}
                data-ocid="checkout.cod.toggle"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      paymentMethod === "cod"
                        ? "border-saffron bg-saffron"
                        : "border-muted-foreground"
                    }`}
                  />
                  <span className="font-semibold text-foreground">
                    💵 Cash on Delivery (COD)
                  </span>
                </div>
                {paymentMethod === "cod" && (
                  <p className="text-xs text-amber-600 font-medium ml-7">
                    + ₹40 COD handling fee added to total
                  </p>
                )}
              </button>

              {/* Security badges */}
              <div
                className="flex flex-wrap gap-2 pt-2"
                data-ocid="checkout.security.section"
              >
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-green-50 text-green-700 border border-green-200">
                  🔒 SSL Secured
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  ✅ 100% Secure Payment
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  🛡️ Buyer Protected
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Truck className="w-5 h-5 text-saffron" />
                Coupon / Discount Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <div>
                    <p className="font-body text-sm font-semibold text-green-700">
                      🎉 {appliedCoupon} applied!
                    </p>
                    <p className="font-body text-xs text-green-600">
                      {VALID_COUPONS[appliedCoupon]?.label} discount
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-500 hover:text-red-700 font-body underline"
                    data-ocid="checkout.coupon.remove"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="font-body flex-1"
                      data-ocid="checkout.coupon.input"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyCoupon}
                      className="font-body border-saffron text-saffron hover:bg-saffron/10"
                      data-ocid="checkout.coupon.button"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p
                      className="text-destructive text-xs font-body"
                      data-ocid="checkout.coupon.error_state"
                    >
                      {couponError}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground font-body">
                    Try: SAMUDRAJ10 · LAUNCH20 · WELCOME5
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-card border-border shadow-card sticky top-4">
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
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between font-body text-sm text-amber-600">
                        <span>COD Handling Fee</span>
                        <span>+₹40</span>
                      </div>
                    )}
                    {appliedCoupon && couponDiscount > 0 && (
                      <div className="flex justify-between font-body text-sm text-green-600">
                        <span>Discount ({appliedCoupon})</span>
                        <span>−{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    {/* GST info */}
                    <div className="flex justify-between font-body text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        GSTIN: 27AABCS1429B1ZZ
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </span>
                      <span className="text-green-600">GST included</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span className="text-saffron">{formatPrice(total)}</span>
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
