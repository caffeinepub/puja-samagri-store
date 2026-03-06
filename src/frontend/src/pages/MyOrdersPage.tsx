import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { OrderStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useMyOrders } from "../hooks/useQueries";

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-amber-100 text-amber-800 border-amber-200",
  [OrderStatus.processed]: "bg-blue-100 text-blue-800 border-blue-200",
  [OrderStatus.shipped]: "bg-green-100 text-green-800 border-green-200",
  [OrderStatus.cancelled]: "bg-red-100 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "⏳ Pending",
  [OrderStatus.processed]: "🔄 Processing",
  [OrderStatus.shipped]: "🚚 Shipped",
  [OrderStatus.cancelled]: "❌ Cancelled",
};

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

function OrderSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-8 w-28" />
      </CardContent>
    </Card>
  );
}

export function MyOrdersPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useMyOrders();
  const { identity, login } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Login Required
        </h2>
        <p className="font-body text-muted-foreground mb-6 text-center max-w-xs">
          Please login to view your order history
        </p>
        <Button
          className="bg-saffron hover:bg-saffron-dark text-white font-body"
          onClick={() => login()}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 container mx-auto px-4 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
            My Orders
          </h1>
          <p className="font-body text-muted-foreground text-sm">
            Track your puja samagri orders
          </p>
        </div>
        <Button
          variant="outline"
          className="font-body border-saffron text-saffron hover:bg-saffron/5"
          onClick={() =>
            navigate({ to: "/catalog", search: { category: undefined } })
          }
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Shop More
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          data-ocid="myOrders.order.empty_state"
        >
          <div className="text-5xl">📦</div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            No orders yet
          </h3>
          <p className="font-body text-muted-foreground max-w-xs">
            Start shopping for fresh puja samagri delivered to your doorstep
          </p>
          <Button
            className="bg-saffron hover:bg-saffron-dark text-white font-body mt-2"
            onClick={() =>
              navigate({ to: "/catalog", search: { category: undefined } })
            }
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id.toString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              data-ocid={`myOrders.order.item.${idx + 1}`}
            >
              <Card className="bg-card border-border shadow-card overflow-hidden">
                <div className="h-1 gradient-saffron" />
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-saffron" />
                      <span className="font-body font-semibold text-sm text-foreground">
                        Order #{order.id.toString()}
                      </span>
                    </div>
                    <Badge
                      className={`text-xs border ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Items */}
                  <div className="space-y-1.5 mb-3">
                    {order.items.map((item, itemIdx) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: order items don't have unique IDs
                        key={itemIdx}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-body text-foreground/80">
                          {item.product.name}{" "}
                          <span className="text-muted-foreground">
                            × {item.quantity.toString()}
                          </span>
                        </span>
                        <span className="font-body font-medium text-saffron">
                          {formatPrice(
                            BigInt(
                              Number(item.product.price) *
                                Number(item.quantity),
                            ),
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-center justify-between">
                    <div className="font-body text-xs text-muted-foreground">
                      📍 {order.address}
                    </div>
                    <div className="text-right">
                      <span className="font-body text-xs text-muted-foreground block">
                        Total
                      </span>
                      <span className="font-display font-bold text-lg text-saffron">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
