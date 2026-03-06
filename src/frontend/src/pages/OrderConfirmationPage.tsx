import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function OrderConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
        data-ocid="checkout.success_state"
      >
        <Card className="bg-card border-border shadow-warm text-center overflow-hidden">
          {/* Top banner */}
          <div className="h-2 gradient-saffron" />
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-5"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Order Placed! 🌸
              </h1>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Your puja samagri order has been received. Our team will prepare
                your fresh flowers and deliver them at your doorstep.
              </p>

              <div className="bg-cream-dark rounded-xl p-4 mb-6 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="font-body text-sm text-foreground">
                    Order confirmed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <span className="font-body text-sm text-muted-foreground">
                    Being prepared
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚚</span>
                  <span className="font-body text-sm text-muted-foreground">
                    Delivery scheduled
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-saffron hover:bg-saffron-dark text-white font-body font-semibold"
                  onClick={() =>
                    navigate({
                      to: "/catalog",
                      search: { category: undefined },
                    })
                  }
                  data-ocid="orderConfirmation.continueShopping.button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-body border-saffron text-saffron hover:bg-saffron/5"
                  onClick={() => navigate({ to: "/my-orders" })}
                  data-ocid="orderConfirmation.viewOrders.button"
                >
                  <Package className="w-4 h-4 mr-2" />
                  View My Orders
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
