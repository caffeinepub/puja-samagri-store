import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  Package,
  Pause,
  Play,
  ShoppingBag,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { OrderStatus } from "../backend.d";
import { LoginPrompt } from "../components/LoginPrompt";
import { useActor } from "../hooks/useActor";
import { useBookings } from "../hooks/useBookings";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useMyOrders } from "../hooks/useQueries";
import { TIME_SLOTS, useSchedule } from "../hooks/useSchedule";

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-amber-100 text-amber-800 border-amber-200",
  [OrderStatus.processed]: "bg-blue-100 text-blue-800 border-blue-200",
  [OrderStatus.shipped]: "bg-green-100 text-green-800 border-green-200",
  [OrderStatus.cancelled]: "bg-red-100 text-red-700 border-red-200",
};

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "⏳ Pending",
  [OrderStatus.processed]: "🔄 Processing",
  [OrderStatus.shipped]: "🚚 Shipped",
  [OrderStatus.cancelled]: "❌ Cancelled",
};

function prasadStatusColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "confirmed":
      return "bg-green-100 text-green-800 border-green-200";
    case "dispatched":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function panditStatusColor(status: string): string {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function scheduleStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "paused":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function CardSkeleton() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="h-1 gradient-saffron" />
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function MyDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();

  const { data: prasadOrders = [], isLoading: prasadLoading } = useQuery({
    queryKey: ["prasadOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrasadOrders();
    },
    enabled: !!actor && !actorFetching && !!identity,
  });

  const { bookings, cancelBooking } = useBookings();
  const { schedules, pauseSchedule, resumeSchedule, cancelSchedule } =
    useSchedule();

  const activeOrders = orders.filter((o) => o.status !== OrderStatus.cancelled);
  const activePrasad = prasadOrders.filter(
    (o) => String(o.status) !== "cancelled",
  );
  const activeBookings = bookings.filter((b) => b.status !== "cancelled");
  const activeSchedules = schedules.filter((s) => s.status !== "cancelled");

  if (!identity) {
    return (
      <LoginPrompt
        title="Login to View Your Dashboard"
        description="See all your orders, prasad bookings, pandit appointments, and delivery schedules in one place."
        showBackButton
        onBack={() => navigate({ to: "/" })}
      />
    );
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Banner */}
      <section
        className="relative py-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.13 16) 0%, oklch(0.35 0.12 22) 50%, oklch(0.42 0.14 38) 100%)",
        }}
      >
        {/* Decorative lattice */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.88 0.18 82) 0px, oklch(0.88 0.18 82) 1px, transparent 1px, transparent 20px)",
          }}
        />
        {/* OM watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none">
          <span
            className="text-[10rem] opacity-[0.06] leading-none"
            style={{ color: "oklch(0.88 0.18 82)" }}
          >
            ॐ
          </span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: "oklch(0.68 0.22 45 / 0.25)",
                  border: "1px solid oklch(0.68 0.22 45 / 0.5)",
                  color: "oklch(0.88 0.18 82)",
                }}
              >
                ॐ
              </div>
              <span
                className="font-body text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.88 0.18 82 / 0.7)" }}
              >
                My Account
              </span>
            </div>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: "oklch(0.97 0.02 80)" }}
            >
              My Dashboard
            </h1>
            <p
              className="font-body text-sm mt-2 max-w-md"
              style={{ color: "oklch(1 0 0 / 0.55)" }}
            >
              Your orders, prasad bookings, pandit appointments and daily
              schedules — all in one place.
            </p>

            {/* Summary stats */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { icon: "🛍️", label: "Orders", count: activeOrders.length },
                { icon: "🪔", label: "Prasad", count: activePrasad.length },
                { icon: "🙏", label: "Pandits", count: activeBookings.length },
                {
                  icon: "📅",
                  label: "Schedules",
                  count: activeSchedules.length,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-full font-body text-sm"
                  style={{
                    background: "oklch(1 0 0 / 0.08)",
                    border: "1px solid oklch(1 0 0 / 0.15)",
                    color: "oklch(0.97 0.02 80)",
                  }}
                >
                  <span>{stat.icon}</span>
                  <span className="font-semibold">{stat.count}</span>
                  <span style={{ color: "oklch(1 0 0 / 0.55)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 max-w-4xl mt-8">
        <Tabs defaultValue="orders">
          <TabsList
            className="mb-8 w-full grid grid-cols-4"
            style={{
              background: "oklch(0.97 0.01 60)",
              border: "1px solid oklch(0.90 0.04 60)",
            }}
          >
            <TabsTrigger
              value="orders"
              className="font-body text-xs sm:text-sm gap-1.5"
              data-ocid="dashboard.orders.tab"
            >
              🛍️
              <span className="hidden sm:inline">Orders</span>
              {activeOrders.length > 0 && (
                <Badge className="ml-1 h-4 min-w-4 p-0 px-1 text-[10px] bg-saffron text-white">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="prasad"
              className="font-body text-xs sm:text-sm gap-1.5"
              data-ocid="dashboard.prasad.tab"
            >
              🪔<span className="hidden sm:inline">Prasad</span>
              {activePrasad.length > 0 && (
                <Badge className="ml-1 h-4 min-w-4 p-0 px-1 text-[10px] bg-saffron text-white">
                  {activePrasad.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="pandits"
              className="font-body text-xs sm:text-sm gap-1.5"
              data-ocid="dashboard.pandits.tab"
            >
              🙏<span className="hidden sm:inline">Pandits</span>
              {activeBookings.length > 0 && (
                <Badge className="ml-1 h-4 min-w-4 p-0 px-1 text-[10px] bg-saffron text-white">
                  {activeBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="schedules"
              className="font-body text-xs sm:text-sm gap-1.5"
              data-ocid="dashboard.schedules.tab"
            >
              📅<span className="hidden sm:inline">Schedules</span>
              {activeSchedules.length > 0 && (
                <Badge className="ml-1 h-4 min-w-4 p-0 px-1 text-[10px] bg-saffron text-white">
                  {activeSchedules.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── ORDERS ── */}
          <TabsContent value="orders">
            {ordersLoading ? (
              <div
                className="space-y-4"
                data-ocid="dashboard.orders.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                data-ocid="dashboard.orders.empty_state"
              >
                <Package className="w-12 h-12 text-muted-foreground/40" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  No orders yet
                </h3>
                <p className="font-body text-muted-foreground max-w-xs text-sm">
                  Start shopping for fresh puja samagri delivered to your
                  doorstep.
                </p>
                <Button
                  className="bg-saffron hover:bg-saffron-dark text-white font-body mt-1"
                  onClick={() =>
                    navigate({
                      to: "/catalog",
                      search: { category: undefined },
                    })
                  }
                  data-ocid="dashboard.orders.primary_button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Browse Products
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {orders.map((order, idx) => (
                  <motion.div
                    key={order.id.toString()}
                    variants={itemVariants}
                    data-ocid={`dashboard.orders.item.${idx + 1}`}
                  >
                    <Card className="bg-card border-border shadow-card overflow-hidden">
                      <div className="h-1 gradient-saffron" />
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-saffron" />
                            <span className="font-body font-semibold text-sm">
                              Order #{order.id.toString()}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs border ${ORDER_STATUS_COLORS[order.status]}`}
                          >
                            {ORDER_STATUS_LABELS[order.status]}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1.5 mb-3">
                          {order.items.map((item, iIdx) => (
                            <div
                              key={`${item.product.name}-${iIdx}`}
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
                          <div className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" /> {order.address}
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
              </motion.div>
            )}
          </TabsContent>

          {/* ── PRASAD ── */}
          <TabsContent value="prasad">
            {prasadLoading ? (
              <div
                className="space-y-4"
                data-ocid="dashboard.prasad.loading_state"
              >
                {[1, 2].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : prasadOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                data-ocid="dashboard.prasad.empty_state"
              >
                <span className="text-5xl">🪔</span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  No prasad orders yet
                </h3>
                <p className="font-body text-muted-foreground max-w-xs text-sm">
                  Order authentic prasad from sacred temples across India.
                </p>
                <Button
                  className="bg-saffron hover:bg-saffron-dark text-white font-body mt-1"
                  onClick={() => navigate({ to: "/prasad" })}
                  data-ocid="dashboard.prasad.primary_button"
                >
                  🙏 Browse Temples
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {prasadOrders.map((order, idx) => (
                  <motion.div
                    key={String(order.id)}
                    variants={itemVariants}
                    data-ocid={`dashboard.prasad.item.${idx + 1}`}
                  >
                    <Card className="bg-card border-border shadow-card overflow-hidden">
                      <div
                        className="h-1"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.52 0.18 38), oklch(0.68 0.22 45))",
                        }}
                      />
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🛕</span>
                            <span className="font-body font-semibold text-sm">
                              {order.templeName}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs border ${prasadStatusColor(String(order.status))}`}
                          >
                            {String(order.status).charAt(0).toUpperCase() +
                              String(order.status).slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="font-body text-sm text-foreground/80 mb-2">
                          {order.prasadItemName} × {String(order.quantity)} box
                          {Number(order.quantity) > 1 ? "es" : ""}
                        </p>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 font-body text-xs text-muted-foreground max-w-[60%]">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">
                              {order.deliveryAddress}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-body text-xs text-muted-foreground block">
                              Total
                            </span>
                            <span className="font-display font-bold text-lg text-saffron">
                              ₹{String(order.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* ── PANDIT BOOKINGS ── */}
          <TabsContent value="pandits">
            {bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                data-ocid="dashboard.pandits.empty_state"
              >
                <User className="w-12 h-12 text-muted-foreground/40" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  No pandit bookings yet
                </h3>
                <p className="font-body text-muted-foreground max-w-xs text-sm">
                  Book a qualified pandit for your next ceremony or ritual.
                </p>
                <Button
                  className="bg-saffron hover:bg-saffron-dark text-white font-body mt-1"
                  onClick={() => navigate({ to: "/book-pandit" })}
                  data-ocid="dashboard.pandits.primary_button"
                >
                  🙏 Book a Pandit
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {bookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    variants={itemVariants}
                    data-ocid={`dashboard.pandits.item.${idx + 1}`}
                  >
                    <Card className="bg-card border-border shadow-card overflow-hidden">
                      <div
                        className="h-1"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.42 0.12 22), oklch(0.52 0.14 32))",
                        }}
                      />
                      <CardHeader className="pb-2 pt-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-maroon" />
                            <span className="font-body font-semibold text-sm">
                              {booking.panditName}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs border ${panditStatusColor(booking.status)}`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-sm">
                          <div className="flex items-center gap-1.5 font-body text-foreground/80">
                            <CalendarDays className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1.5 font-body text-foreground/80">
                            <Clock className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                            {booking.timeSlot}
                          </div>
                          <div className="col-span-2 flex items-start gap-1.5 font-body text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            {booking.address}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className="font-body text-xs px-2 py-1 rounded-md"
                            style={{
                              background: "oklch(0.95 0.03 50)",
                              color: "oklch(0.42 0.12 22)",
                            }}
                          >
                            {booking.ceremonyType}
                          </span>
                          {booking.status !== "cancelled" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-body text-xs text-red-600 border-red-200 hover:bg-red-50"
                                  data-ocid={`dashboard.pandits.delete_button.${idx + 1}`}
                                >
                                  <XCircle className="w-3 h-3 mr-1" /> Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-ocid="dashboard.pandits.dialog">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-display">
                                    Cancel Booking?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="font-body">
                                    Are you sure you want to cancel your booking
                                    with {booking.panditName} for {booking.date}
                                    ? This cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    className="font-body"
                                    data-ocid="dashboard.pandits.cancel_button"
                                  >
                                    Keep Booking
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className="font-body bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => cancelBooking(booking.id)}
                                    data-ocid="dashboard.pandits.confirm_button"
                                  >
                                    Yes, Cancel
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          {/* ── SCHEDULES ── */}
          <TabsContent value="schedules">
            {schedules.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                data-ocid="dashboard.schedules.empty_state"
              >
                <CalendarDays className="w-12 h-12 text-muted-foreground/40" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  No schedules set up yet
                </h3>
                <p className="font-body text-muted-foreground max-w-xs text-sm">
                  Set up a daily flower or haar schedule for your morning puja.
                </p>
                <Button
                  className="bg-saffron hover:bg-saffron-dark text-white font-body mt-1"
                  onClick={() => navigate({ to: "/schedule" })}
                  data-ocid="dashboard.schedules.primary_button"
                >
                  📅 Create Schedule
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {schedules.map((schedule, idx) => {
                  const timeSlot = TIME_SLOTS.find(
                    (t) => t.id === schedule.timeSlotId,
                  );
                  return (
                    <motion.div
                      key={schedule.id}
                      variants={itemVariants}
                      data-ocid={`dashboard.schedules.item.${idx + 1}`}
                    >
                      <Card className="bg-card border-border shadow-card overflow-hidden">
                        <div
                          className="h-1"
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.55 0.16 180), oklch(0.50 0.14 200))",
                          }}
                        />
                        <CardHeader className="pb-2 pt-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <CalendarDays
                                className="w-4 h-4"
                                style={{ color: "oklch(0.55 0.16 180)" }}
                              />
                              <span className="font-body font-semibold text-sm">
                                {schedule.items
                                  .map((i) => i.productName)
                                  .join(", ")}
                              </span>
                            </div>
                            <Badge
                              className={`text-xs border ${scheduleStatusColor(schedule.status)}`}
                            >
                              {schedule.status.charAt(0).toUpperCase() +
                                schedule.status.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-sm">
                            {timeSlot && (
                              <div className="flex items-center gap-1.5 font-body text-foreground/80">
                                <Clock className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                                {timeSlot.icon} {timeSlot.label} (
                                {timeSlot.time})
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                              <CalendarDays className="w-3 h-3 flex-shrink-0" />
                              {schedule.startDate}
                              {schedule.noEndDate
                                ? " – ongoing"
                                : schedule.endDate
                                  ? ` – ${schedule.endDate}`
                                  : ""}
                            </div>
                            <div className="col-span-2 font-body text-xs text-muted-foreground">
                              Days: {schedule.days.join(", ")}
                            </div>
                          </div>
                          {schedule.status !== "cancelled" && (
                            <div className="flex items-center gap-2 flex-wrap">
                              {schedule.status === "active" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-body text-xs"
                                  onClick={() => pauseSchedule(schedule.id)}
                                  data-ocid={`dashboard.schedules.secondary_button.${idx + 1}`}
                                >
                                  <Pause className="w-3 h-3 mr-1" /> Pause
                                </Button>
                              ) : schedule.status === "paused" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-body text-xs text-green-700 border-green-200 hover:bg-green-50"
                                  onClick={() => resumeSchedule(schedule.id)}
                                  data-ocid={`dashboard.schedules.secondary_button.${idx + 1}`}
                                >
                                  <Play className="w-3 h-3 mr-1" /> Resume
                                </Button>
                              ) : null}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="font-body text-xs text-red-600 border-red-200 hover:bg-red-50"
                                    data-ocid={`dashboard.schedules.delete_button.${idx + 1}`}
                                  >
                                    <XCircle className="w-3 h-3 mr-1" /> Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent data-ocid="dashboard.schedules.dialog">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="font-display">
                                      Cancel Schedule?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="font-body">
                                      This will stop your daily delivery
                                      schedule. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      className="font-body"
                                      data-ocid="dashboard.schedules.cancel_button"
                                    >
                                      Keep It
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="font-body bg-red-600 hover:bg-red-700 text-white"
                                      onClick={() =>
                                        cancelSchedule(schedule.id)
                                      }
                                      data-ocid="dashboard.schedules.confirm_button"
                                    >
                                      Yes, Cancel
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
