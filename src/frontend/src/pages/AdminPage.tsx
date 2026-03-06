import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Lock,
  Package,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { type Order, OrderStatus, type Product } from "../backend.d";
import { PANDITS } from "../data/pandits";
import {
  useAllOrders,
  useAllProducts,
  useIsAdmin,
  usePanditAvailabilities,
  useSetPanditAvailability,
  useUpdateOrderStatus,
  useUpdateProductStock,
} from "../hooks/useQueries";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toLocaleString("en-IN")}`;
}

function orderStatusConfig(status: OrderStatus) {
  const map: Record<
    OrderStatus,
    { label: string; className: string; icon: string }
  > = {
    [OrderStatus.pending]: {
      label: "Pending",
      className: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "⏳",
    },
    [OrderStatus.processed]: {
      label: "Processed",
      className: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "⚙️",
    },
    [OrderStatus.shipped]: {
      label: "Shipped",
      className: "bg-green-100 text-green-800 border-green-200",
      icon: "🚚",
    },
    [OrderStatus.cancelled]: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700 border-red-200",
      icon: "❌",
    },
  };
  return map[status] ?? map[OrderStatus.pending];
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

type OrderFilter = "all" | OrderStatus;

function OrderRow({
  order,
  index,
  onStatusChange,
  isUpdating,
}: {
  order: Order;
  index: number;
  onStatusChange: (orderId: bigint, status: OrderStatus) => void;
  isUpdating: boolean;
}) {
  const config = orderStatusConfig(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`admin.order.item.${index + 1}`}
    >
      <Card className="border-border bg-card hover:shadow-card transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Order info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-display text-sm font-bold text-foreground">
                  #{order.id.toString()}
                </span>
                <Badge className={`${config.className} text-xs`}>
                  {config.icon} {config.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 flex-wrap text-xs font-body text-muted-foreground">
                <span className="font-semibold text-foreground/80">
                  {order.customerName}
                </span>
                <span>📱 {order.phone}</span>
                <span className="font-display text-saffron font-bold text-sm">
                  {formatPrice(order.total)}
                </span>
                <span>
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-1">
                📍 {order.address}
              </p>
            </div>

            {/* Status selector */}
            <div className="shrink-0">
              <Select
                value={order.status}
                onValueChange={(val) =>
                  onStatusChange(order.id, val as OrderStatus)
                }
                disabled={isUpdating || order.status === OrderStatus.cancelled}
              >
                <SelectTrigger
                  className="font-body text-xs w-36 h-8 border-border"
                  data-ocid={`admin.order.status.select.${index + 1}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value={OrderStatus.pending}
                    className="font-body text-xs"
                  >
                    ⏳ Pending
                  </SelectItem>
                  <SelectItem
                    value={OrderStatus.processed}
                    className="font-body text-xs"
                  >
                    ⚙️ Processed
                  </SelectItem>
                  <SelectItem
                    value={OrderStatus.shipped}
                    className="font-body text-xs"
                  >
                    🚚 Shipped
                  </SelectItem>
                  <SelectItem
                    value={OrderStatus.cancelled}
                    className="font-body text-xs"
                  >
                    ❌ Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OrdersTab() {
  const { data: orders = [], isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  function handleStatusChange(orderId: bigint, status: OrderStatus) {
    setUpdatingId(orderId);
    updateStatus.mutate(
      { orderId, status },
      {
        onSuccess: () => {
          toast.success("Order status updated");
          setUpdatingId(null);
        },
        onError: () => {
          toast.error("Failed to update order status");
          setUpdatingId(null);
        },
      },
    );
  }

  const filterOptions: { value: OrderFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: OrderStatus.pending, label: "Pending" },
    { value: OrderStatus.processed, label: "Processed" },
    { value: OrderStatus.shipped, label: "Shipped" },
    { value: OrderStatus.cancelled, label: "Cancelled" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            count: orders.length,
            color: "bg-saffron/10 text-saffron",
          },
          {
            label: "Pending",
            count: orders.filter((o) => o.status === OrderStatus.pending)
              .length,
            color: "bg-amber-100 text-amber-700",
          },
          {
            label: "Shipped",
            count: orders.filter((o) => o.status === OrderStatus.shipped)
              .length,
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Cancelled",
            count: orders.filter((o) => o.status === OrderStatus.cancelled)
              .length,
            color: "bg-red-100 text-red-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-3 text-center ${stat.color} border border-current/10`}
          >
            <p className="font-display text-2xl font-bold">{stat.count}</p>
            <p className="font-body text-xs mt-0.5 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div
        className="flex flex-wrap gap-1.5 p-1 bg-cream-dark rounded-xl"
        data-ocid="admin.orders.filter.tab"
      >
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all duration-200 ${
              filter === opt.value
                ? "bg-saffron text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/60"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span
                className={`ml-1.5 rounded-full px-1 text-xs ${
                  filter === opt.value ? "bg-white/20" : "bg-black/5"
                }`}
              >
                {
                  orders.filter(
                    (o) => opt.value === "all" || o.status === opt.value,
                  ).length
                }
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 gap-3"
          data-ocid="admin.orders.empty_state"
        >
          <ClipboardList className="w-12 h-12 text-muted-foreground/30" />
          <p className="font-body text-muted-foreground text-sm">
            No orders found for this filter
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-2">
            {filteredOrders.map((order, idx) => (
              <OrderRow
                key={order.id.toString()}
                order={order}
                index={idx}
                onStatusChange={handleStatusChange}
                isUpdating={updatingId === order.id}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── Pandit Availability Tab ───────────────────────────────────────────────────

function PanditAvailabilityTab() {
  const { data: availabilities = [], isLoading } = usePanditAvailabilities();
  const setAvailability = useSetPanditAvailability();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const panditsWithAvailability = PANDITS.map((p) => {
    const backend = availabilities.find((a) => a.panditId === p.id);
    return backend ? { ...p, available: backend.available } : p;
  });

  function handleToggle(panditId: string, available: boolean) {
    setTogglingId(panditId);
    setAvailability.mutate(
      { panditId, available },
      {
        onSuccess: () => {
          toast.success(
            `${available ? "Enabled" : "Disabled"} pandit availability`,
          );
          setTogglingId(null);
        },
        onError: () => {
          toast.error("Failed to update availability");
          setTogglingId(null);
        },
      },
    );
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-muted-foreground">
        Toggle availability for each pandit. Changes are reflected immediately
        on the Book a Pandit page.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {panditsWithAvailability.map((pandit, idx) => (
              <motion.div
                key={pandit.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-ocid={`admin.pandit.item.${idx + 1}`}
              >
                <Card
                  className={`border-border bg-card transition-all duration-300 hover:shadow-card ${
                    pandit.available
                      ? "border-green-200/60"
                      : "border-red-200/40 opacity-80"
                  }`}
                >
                  {/* Accent gradient bar */}
                  <div
                    className={`h-1 rounded-t-lg ${
                      pandit.available ? "gradient-saffron" : "bg-muted"
                    }`}
                  />
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-saffron/15 to-maroon/15 flex items-center justify-center text-2xl border border-saffron/15 shrink-0">
                        {pandit.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-sm font-bold text-foreground leading-tight">
                              {pandit.name}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">
                              📍 {pandit.area}
                            </p>
                          </div>
                          <Switch
                            checked={pandit.available}
                            onCheckedChange={(checked) =>
                              handleToggle(pandit.id, checked)
                            }
                            disabled={togglingId === pandit.id}
                            className="shrink-0 data-[state=checked]:bg-saffron"
                            data-ocid={`admin.pandit.availability.switch.${idx + 1}`}
                          />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pandit.specializations.slice(0, 2).map((spec) => (
                            <Badge
                              key={spec}
                              variant="outline"
                              className="text-xs border-saffron/30 text-saffron bg-saffron/5 font-body py-0"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        <p
                          className={`font-body text-xs mt-2 font-semibold ${
                            pandit.available ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {togglingId === pandit.id
                            ? "Updating..."
                            : pandit.available
                              ? "● Available"
                              : "○ Unavailable"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductRow({
  product,
  index,
  onToggleStock,
  isUpdating,
}: {
  product: Product;
  index: number;
  onToggleStock: (product: Product, inStock: boolean) => void;
  isUpdating: boolean;
}) {
  const categoryEmoji: Record<string, string> = {
    flowers: "🌸",
    haar: "💐",
    books: "📚",
    pujaEssentials: "🪔",
    thaliSets: "🥣",
    occasionPackages: "📦",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      data-ocid={`admin.product.item.${index + 1}`}
      className="flex items-center gap-3 py-3 px-4 rounded-xl border border-border bg-card hover:bg-cream/50 transition-colors group"
    >
      <span className="text-xl shrink-0">
        {categoryEmoji[product.category] ?? "🌿"}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-bold text-foreground truncate">
          {product.name}
        </p>
        <p className="font-body text-xs text-muted-foreground">
          {product.category} · {formatPrice(product.price)}/{product.unit}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          className={`font-body text-xs font-medium hidden sm:block ${
            product.inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        <Switch
          checked={product.inStock}
          onCheckedChange={(checked) => onToggleStock(product, checked)}
          disabled={isUpdating}
          className="data-[state=checked]:bg-saffron"
          data-ocid={`admin.product.stock.switch.${index + 1}`}
        />
      </div>
    </motion.div>
  );
}

function ProductsTab() {
  const { data: products = [], isLoading } = useAllProducts();
  const updateStock = useUpdateProductStock();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  function handleToggleStock(product: Product, inStock: boolean) {
    setUpdatingId(product.id);
    updateStock.mutate(
      { product, inStock },
      {
        onSuccess: () => {
          toast.success(
            `${product.name} marked as ${inStock ? "in stock" : "out of stock"}`,
          );
          setUpdatingId(null);
        },
        onError: () => {
          toast.error("Failed to update product stock");
          setUpdatingId(null);
        },
      },
    );
  }

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="font-body text-sm font-semibold text-green-700">
            {inStockCount} In Stock
          </span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="font-body text-sm font-semibold text-red-600">
            {outOfStockCount} Out of Stock
          </span>
        </div>
      </div>

      {/* Product list */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3"
          data-ocid="admin.products.empty_state"
        >
          <Package className="w-12 h-12 text-muted-foreground/30" />
          <p className="font-body text-muted-foreground text-sm">
            No products found
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <AnimatePresence>
            {products.map((product, idx) => (
              <ProductRow
                key={product.id.toString()}
                product={product}
                index={idx}
                onToggleStock={handleToggleStock}
                isUpdating={updatingId === product.id}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─── Admin Guard ──────────────────────────────────────────────────────────────

function AdminAccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card
          className="max-w-sm w-full border-maroon/20 bg-gradient-to-br from-amber-50/60 to-orange-50/40 text-center shadow-warm"
          data-ocid="admin.access_denied.card"
        >
          <CardContent className="pt-10 pb-8 px-8">
            <div className="w-16 h-16 rounded-full bg-maroon/10 border border-maroon/20 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-maroon" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              Admin Access Required
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              You do not have admin privileges to view this page. Please contact
              the site administrator.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Main AdminPage Component ─────────────────────────────────────────────────

export function AdminPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  // While loading admin status
  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1,
            ease: "linear",
          }}
        >
          <RefreshCw className="w-8 h-8 text-saffron" />
        </motion.div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return <AdminAccessDenied />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon via-maroon/90 to-amber-900 py-10 px-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-3 left-6 text-6xl">🕉️</div>
          <div className="absolute bottom-3 right-10 text-5xl">📋</div>
        </div>
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white leading-tight">
                Admin Panel
              </h1>
              <p className="font-body text-sm text-white/70 mt-0.5">
                Manage orders, pandit availability & product inventory
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders">
          <TabsList className="mb-8 bg-cream-dark p-1 rounded-xl flex flex-wrap h-auto gap-1">
            <TabsTrigger
              value="orders"
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-5 py-2 flex items-center gap-2"
              data-ocid="admin.orders.tab"
            >
              <ClipboardList className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="pandits"
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-5 py-2 flex items-center gap-2"
              data-ocid="admin.pandit.tab"
            >
              <Users className="w-4 h-4" />
              Pandit Availability
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-5 py-2 flex items-center gap-2"
              data-ocid="admin.products.tab"
            >
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xs">
              <CardHeader className="pb-2 border-b border-border">
                <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-saffron" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <OrdersTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pandits">
            <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xs">
              <CardHeader className="pb-2 border-b border-border">
                <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-saffron" />
                  Pandit Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <PanditAvailabilityTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="border-border bg-card/60 backdrop-blur-sm shadow-xs">
              <CardHeader className="pb-2 border-b border-border">
                <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-saffron" />
                  Product Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <ProductsTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
