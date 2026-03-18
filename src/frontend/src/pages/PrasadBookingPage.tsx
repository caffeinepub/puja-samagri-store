import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LoginPrompt } from "../components/LoginPrompt";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface PrasadItem {
  name: string;
  price: number;
}

interface Temple {
  id: number;
  name: string;
  deity: string;
  location: string;
  state: string;
  description: string;
  famousFor: string;
  emoji: string;
  image: string;
  prasadItems: PrasadItem[];
  color: string;
}

const TEMPLES: Temple[] = [
  {
    id: 1,
    name: "Shirdi Sai Baba",
    deity: "Sai Baba",
    location: "Shirdi",
    state: "Maharashtra",
    description:
      "One of the most visited pilgrimage sites in India, drawing millions of devotees seeking blessings of Sai Baba.",
    famousFor: "Sai Baba Laddoo & Pedha",
    emoji: "🕌",
    image: "/assets/generated/temple-shirdi.dim_800x500.jpg",
    prasadItems: [
      { name: "Sai Baba Laddoo", price: 151 },
      { name: "Sai Pedha", price: 121 },
    ],
    color: "oklch(0.55 0.14 180)",
  },
  {
    id: 2,
    name: "Ram Mandir Ayodhya",
    deity: "Shri Ram",
    location: "Ayodhya",
    state: "Uttar Pradesh",
    description:
      "The grand Ram Mandir at the birthplace of Lord Ram, consecrated in 2024, stands as a symbol of devotion and faith.",
    famousFor: "Ram Lalla Laddoo & Peda",
    emoji: "🏯",
    image: "/assets/generated/temple-ayodhya.dim_800x500.jpg",
    prasadItems: [
      { name: "Ram Lalla Laddoo", price: 201 },
      { name: "Ram Peda", price: 151 },
    ],
    color: "oklch(0.55 0.18 38)",
  },
  {
    id: 3,
    name: "Siddhivinayak Mumbai",
    deity: "Lord Ganesha",
    location: "Prabhadevi, Mumbai",
    state: "Maharashtra",
    description:
      "The Siddhivinayak Temple is one of the most revered Ganesha temples, granting wishes and bringing prosperity.",
    famousFor: "Modak & Besan Laddoo",
    emoji: "🐘",
    image: "/assets/generated/temple-siddhivinayak.dim_800x500.jpg",
    prasadItems: [
      { name: "Modak", price: 151 },
      { name: "Besan Laddoo", price: 121 },
    ],
    color: "oklch(0.52 0.16 55)",
  },
  {
    id: 4,
    name: "Vaishno Devi",
    deity: "Mata Vaishno Devi",
    location: "Katra",
    state: "Jammu & Kashmir",
    description:
      "Nestled in the Trikuta mountains, Vaishno Devi is one of the holiest Hindu pilgrimages, attracting crores of devotees.",
    famousFor: "Charnamrit & Panchamrit Prasad",
    emoji: "⛰️",
    image: "/assets/generated/temple-vaishnodevi.dim_800x500.jpg",
    prasadItems: [
      { name: "Charnamrit Prasad", price: 251 },
      { name: "Panchamrit", price: 201 },
    ],
    color: "oklch(0.48 0.14 270)",
  },
  {
    id: 5,
    name: "Tirupati Balaji",
    deity: "Lord Venkateswara",
    location: "Tirumala",
    state: "Andhra Pradesh",
    description:
      "The richest temple in the world by donations, Tirupati Balaji draws 50,000–100,000 pilgrims every day.",
    famousFor: "Famous Tirupati Laddoo (GI tagged)",
    emoji: "🏔️",
    image: "/assets/generated/temple-tirupati.dim_800x500.jpg",
    prasadItems: [{ name: "Tirupati Laddoo", price: 251 }],
    color: "oklch(0.50 0.16 65)",
  },
  {
    id: 6,
    name: "Mathura Vrindavan",
    deity: "Lord Krishna",
    location: "Mathura",
    state: "Uttar Pradesh",
    description:
      "The birthplace of Lord Krishna, Mathura and Vrindavan are eternal pilgrimage towns with hundreds of temples.",
    famousFor: "Mathura Pedha & Chappan Bhog",
    emoji: "🪈",
    image: "/assets/generated/temple-mathura.dim_800x500.jpg",
    prasadItems: [
      { name: "Mathura Pedha", price: 101 },
      { name: "Chappan Bhog Prasad", price: 201 },
    ],
    color: "oklch(0.48 0.18 270)",
  },
  {
    id: 7,
    name: "Kashi Vishwanath",
    deity: "Lord Shiva",
    location: "Varanasi",
    state: "Uttar Pradesh",
    description:
      "One of the twelve Jyotirlingas, the Kashi Vishwanath temple on the banks of the Ganga is eternally sacred to Shiva devotees.",
    famousFor: "Bhasma Prasad & Panchamrit",
    emoji: "🔱",
    image: "/assets/generated/temple-kashi.dim_800x500.jpg",
    prasadItems: [
      { name: "Bhasma Prasad", price: 151 },
      { name: "Panchamrit", price: 121 },
    ],
    color: "oklch(0.45 0.10 0)",
  },
  {
    id: 8,
    name: "Mahakaleshwar Ujjain",
    deity: "Lord Mahakal",
    location: "Ujjain",
    state: "Madhya Pradesh",
    description:
      "The Mahakaleshwar Jyotirlinga in Ujjain is unique as the only south-facing Jyotirlinga, renowned for the Bhasma Aarti.",
    famousFor: "Bhasma Prasad & Laddoo",
    emoji: "🕉️",
    image: "/assets/generated/temple-mahakaleshwar.dim_800x500.jpg",
    prasadItems: [
      { name: "Bhasma Prasad", price: 151 },
      { name: "Laddoo", price: 121 },
    ],
    color: "oklch(0.42 0.12 22)",
  },
  {
    id: 9,
    name: "Jagannath Puri",
    deity: "Lord Jagannath",
    location: "Puri",
    state: "Odisha",
    description:
      "Lord Jagannath's Mahaprasad is considered so sacred it is cooked in the world's largest kitchen and blessed by the deity himself.",
    famousFor: "Mahaprasad & Khichdi Prasad",
    emoji: "🌊",
    image: "/assets/generated/temple-jagannath.dim_800x500.jpg",
    prasadItems: [
      { name: "Mahaprasad", price: 201 },
      { name: "Khichdi Prasad", price: 151 },
    ],
    color: "oklch(0.50 0.18 200)",
  },
  {
    id: 10,
    name: "Golden Temple Amritsar",
    deity: "Sri Guru Granth Sahib",
    location: "Amritsar",
    state: "Punjab",
    description:
      "The Harmandir Sahib (Golden Temple) is the holiest Sikh shrine; its langar serves free meals to 100,000+ people daily.",
    famousFor: "Kada Prasad & Langar Prasad",
    emoji: "✨",
    image: "/assets/generated/temple-golden.dim_800x500.jpg",
    prasadItems: [
      { name: "Kada Prasad", price: 101 },
      { name: "Langar Prasad", price: 151 },
    ],
    color: "oklch(0.68 0.22 82)",
  },
];

function statusColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "dispatched":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function statusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="w-3 h-3" />;
    case "confirmed":
      return <CheckCircle2 className="w-3 h-3" />;
    case "dispatched":
      return <Truck className="w-3 h-3" />;
    case "delivered":
      return <Package className="w-3 h-3" />;
    case "cancelled":
      return <XCircle className="w-3 h-3" />;
    default:
      return null;
  }
}

export function PrasadBookingPage() {
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Order form state
  const [selectedPrasad, setSelectedPrasad] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [instructions, setInstructions] = useState("");

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["prasadOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrasadOrders();
    },
    enabled: !!actor && !actorFetching && !!identity,
  });

  const bookMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const item = selectedTemple?.prasadItems.find(
        (p) => p.name === selectedPrasad,
      );
      if (!item || !selectedTemple) throw new Error("Invalid selection");
      await actor.bookPrasad(
        BigInt(selectedTemple.id),
        selectedTemple.name,
        item.name,
        BigInt(quantity),
        BigInt(item.price),
        address,
        contact,
        instructions,
      );
    },
    onSuccess: () => {
      toast.success(
        "Prasad booked successfully! 🙏 Your sacred prasad is on its way.",
      );
      queryClient.invalidateQueries({ queryKey: ["prasadOrders"] });
      setDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error("Failed to book prasad. Please try again.");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (orderId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.cancelPrasadOrder(orderId);
    },
    onSuccess: () => {
      toast.success("Order cancelled.");
      queryClient.invalidateQueries({ queryKey: ["prasadOrders"] });
    },
    onError: () => {
      toast.error("Failed to cancel order.");
    },
  });

  function resetForm() {
    setSelectedPrasad("");
    setQuantity("1");
    setAddress("");
    setContact("");
    setInstructions("");
  }

  function openBooking(temple: Temple) {
    if (!identity) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedTemple(temple);
    setSelectedPrasad(temple.prasadItems[0]?.name || "");
    setDialogOpen(true);
  }

  const selectedItem = selectedTemple?.prasadItems.find(
    (p) => p.name === selectedPrasad,
  );
  const totalPrice = selectedItem
    ? selectedItem.price * Number.parseInt(quantity || "1")
    : 0;

  const minPrice = (t: Temple) =>
    Math.min(...t.prasadItems.map((p) => p.price));
  const maxPrice = (t: Temple) =>
    Math.max(...t.prasadItems.map((p) => p.price));

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.98 0.01 60)" }}
    >
      {/* Hero Banner */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.13 16) 0%, oklch(0.35 0.12 22) 40%, oklch(0.42 0.14 38) 100%)",
        }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.88 0.18 82) 0px, oklch(0.88 0.18 82) 1px, transparent 1px, transparent 20px)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[18rem] opacity-[0.03] leading-none">🪔</span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border"
              style={{
                background: "oklch(0.68 0.22 45 / 0.15)",
                borderColor: "oklch(0.68 0.22 45 / 0.4)",
                color: "oklch(0.88 0.18 82)",
              }}
            >
              <span>🙏</span> Sacred Prasad Delivered to Your Door
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight"
              style={{ color: "oklch(0.97 0.02 80)" }}
            >
              Book Prasad from
              <span style={{ color: "oklch(0.88 0.18 82)" }}>
                {" "}
                Sacred Temples
              </span>
            </h1>
            <p
              className="font-body text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
              style={{ color: "oklch(1 0 0 / 0.65)" }}
            >
              Get authentic prasad from India's most revered temples delivered
              directly to your home. Choose your temple, select your prasad, and
              receive divine blessings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="temples">
            <TabsList
              className="mb-8 mx-auto flex w-fit"
              style={{
                background: "oklch(0.94 0.03 60)",
                border: "1px solid oklch(0.88 0.06 60)",
              }}
            >
              <TabsTrigger
                value="temples"
                className="font-body"
                data-ocid="prasad.temples.tab"
              >
                🛕 Choose Temple
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="font-body"
                data-ocid="prasad.orders.tab"
              >
                📦 My Prasad Orders
              </TabsTrigger>
            </TabsList>

            {/* Temple Grid */}
            <TabsContent value="temples">
              <div className="text-center mb-8">
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: "oklch(0.28 0.13 16)" }}
                >
                  Select Your Temple
                </h2>
                <p className="font-body text-muted-foreground">
                  10 sacred temples • Authentic prasad • Pan-India delivery
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {TEMPLES.map((temple, idx) => (
                  <motion.div
                    key={temple.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    data-ocid={`prasad.temple.item.${idx + 1}`}
                  >
                    <div
                      className="rounded-2xl overflow-hidden shadow-warm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white"
                      style={{ border: "1px solid oklch(0.92 0.04 60)" }}
                    >
                      {/* Temple Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={temple.image}
                          alt={temple.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (
                              parent &&
                              !parent.querySelector(".fallback-emoji")
                            ) {
                              const fallback = document.createElement("div");
                              fallback.className =
                                "fallback-emoji w-full h-full flex items-center justify-center text-6xl absolute inset-0";
                              fallback.style.background =
                                "linear-gradient(135deg, oklch(0.35 0.12 22), oklch(0.28 0.13 16))";
                              fallback.textContent = temple.emoji;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, oklch(0.15 0.05 30 / 0.8) 0%, transparent 50%)",
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          <span className="text-2xl">{temple.emoji}</span>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span
                            className="font-body text-xs font-semibold px-2 py-1 rounded-full"
                            style={{
                              background: "oklch(0.15 0.05 30 / 0.6)",
                              color: "oklch(0.88 0.18 82)",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            {temple.deity}
                          </span>
                        </div>
                      </div>

                      {/* Temple Info */}
                      <div className="p-4">
                        <h3
                          className="font-display text-base font-bold mb-1 leading-snug"
                          style={{ color: "oklch(0.28 0.13 16)" }}
                        >
                          {temple.name}
                        </h3>
                        <div
                          className="flex items-center gap-1 text-xs font-body mb-3"
                          style={{ color: "oklch(0.55 0.06 45)" }}
                        >
                          <MapPin className="w-3 h-3" />
                          {temple.location}, {temple.state}
                        </div>
                        <p
                          className="font-body text-xs leading-relaxed mb-3 line-clamp-2"
                          style={{ color: "oklch(0.45 0.06 40)" }}
                        >
                          {temple.description}
                        </p>
                        <div
                          className="text-xs font-body mb-3 px-2 py-1.5 rounded-lg"
                          style={{
                            background: "oklch(0.96 0.04 70)",
                            color: "oklch(0.42 0.12 40)",
                          }}
                        >
                          <span className="font-semibold">Famous for:</span>{" "}
                          {temple.famousFor}
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span
                              className="font-body text-xs"
                              style={{ color: "oklch(0.55 0.06 45)" }}
                            >
                              Starting from
                            </span>
                            <div
                              className="font-display font-bold text-base"
                              style={{ color: "oklch(0.52 0.18 38)" }}
                            >
                              ₹{minPrice(temple)}
                              {maxPrice(temple) !== minPrice(temple) && (
                                <span
                                  className="text-xs font-normal font-body"
                                  style={{ color: "oklch(0.55 0.06 45)" }}
                                >
                                  {" "}
                                  – ₹{maxPrice(temple)}/box
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full font-body font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.52 0.18 38), oklch(0.42 0.14 22))",
                            color: "white",
                            border: "none",
                          }}
                          onClick={() => openBooking(temple)}
                          data-ocid={`prasad.temple.primary_button.${idx + 1}`}
                        >
                          🙏 Book Prasad
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* My Orders Tab */}
            <TabsContent value="orders">
              {!identity ? (
                <div
                  className="max-w-md mx-auto text-center py-16"
                  data-ocid="prasad.orders.empty_state"
                >
                  <div className="text-5xl mb-4">🙏</div>
                  <h3
                    className="font-display text-xl font-bold mb-2"
                    style={{ color: "oklch(0.28 0.13 16)" }}
                  >
                    Login to View Orders
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Please login to see your prasad order history.
                  </p>
                  <LoginPrompt />
                </div>
              ) : ordersLoading ? (
                <div
                  className="flex justify-center py-16"
                  data-ocid="prasad.orders.loading_state"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="max-w-md mx-auto text-center py-16"
                  data-ocid="prasad.orders.empty_state"
                >
                  <div className="text-5xl mb-4">📦</div>
                  <h3
                    className="font-display text-xl font-bold mb-2"
                    style={{ color: "oklch(0.28 0.13 16)" }}
                  >
                    No Prasad Orders Yet
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Browse our sacred temples above and book your first prasad.
                  </p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                  <h2
                    className="font-display text-xl font-bold mb-6"
                    style={{ color: "oklch(0.28 0.13 16)" }}
                  >
                    My Prasad Orders ({orders.length})
                  </h2>
                  {orders.map((order, idx) => (
                    <motion.div
                      key={String(order.id)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="bg-white rounded-2xl p-5 shadow-warm"
                      style={{ border: "1px solid oklch(0.92 0.04 60)" }}
                      data-ocid={`prasad.orders.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3
                              className="font-display font-bold text-base"
                              style={{ color: "oklch(0.28 0.13 16)" }}
                            >
                              {order.templeName}
                            </h3>
                            <Badge
                              className={`text-xs font-body border ${statusColor(order.status as string)} flex items-center gap-1`}
                            >
                              {statusIcon(order.status as string)}
                              {String(order.status)}
                            </Badge>
                          </div>
                          <p
                            className="font-body text-sm mb-2"
                            style={{ color: "oklch(0.45 0.06 40)" }}
                          >
                            {order.prasadItemName} × {String(order.quantity)}{" "}
                            box
                            {Number(order.quantity) > 1 ? "es" : ""}
                          </p>
                          <div
                            className="flex items-center gap-4 text-xs font-body flex-wrap"
                            style={{ color: "oklch(0.55 0.06 45)" }}
                          >
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{" "}
                              {order.deliveryAddress}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" /> ₹
                              {String(order.totalPrice)}
                            </span>
                          </div>
                        </div>
                        {String(order.status) === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-body text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => cancelMutation.mutate(order.id)}
                            disabled={cancelMutation.isPending}
                            data-ocid={`prasad.orders.delete_button.${idx + 1}`}
                          >
                            {cancelMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "Cancel"
                            )}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Login prompt */}
      <AnimatePresence>
        {showLoginPrompt && !identity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              data-ocid="prasad.login.dialog"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🙏</div>
                <h3
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: "oklch(0.28 0.13 16)" }}
                >
                  Login to Book Prasad
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-5">
                  Please login to continue with your prasad booking.
                </p>
                <LoginPrompt />
                <Button
                  variant="ghost"
                  className="mt-3 w-full font-body text-sm"
                  onClick={() => setShowLoginPrompt(false)}
                  data-ocid="prasad.login.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Prasad Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent
          className="max-w-md"
          style={{ borderRadius: "1.25rem" }}
          data-ocid="prasad.booking.dialog"
        >
          <DialogHeader>
            <DialogTitle
              className="font-display text-xl"
              style={{ color: "oklch(0.28 0.13 16)" }}
            >
              <span className="mr-2">{selectedTemple?.emoji}</span>
              {selectedTemple?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Prasad Item */}
            <div>
              <Label
                className="font-body text-sm font-semibold mb-1.5 block"
                style={{ color: "oklch(0.38 0.08 30)" }}
              >
                Select Prasad
              </Label>
              <Select value={selectedPrasad} onValueChange={setSelectedPrasad}>
                <SelectTrigger data-ocid="prasad.booking.select">
                  <SelectValue placeholder="Choose prasad item" />
                </SelectTrigger>
                <SelectContent>
                  {selectedTemple?.prasadItems.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name} — ₹{item.price}/box
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label
                className="font-body text-sm font-semibold mb-1.5 block"
                style={{ color: "oklch(0.38 0.08 30)" }}
              >
                Quantity (boxes)
              </Label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger data-ocid="prasad.booking.quantity.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                    <SelectItem key={q} value={String(q)}>
                      {q} box{q > 1 ? "es" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price preview */}
            {selectedItem && (
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl font-body"
                style={{
                  background: "oklch(0.96 0.04 70)",
                  border: "1px solid oklch(0.88 0.08 70)",
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.45 0.06 40)" }}
                >
                  {selectedPrasad} × {quantity}
                </span>
                <span
                  className="font-bold text-base"
                  style={{ color: "oklch(0.42 0.14 22)" }}
                >
                  ₹{totalPrice}
                </span>
              </div>
            )}

            {/* Delivery Address */}
            <div>
              <Label
                className="font-body text-sm font-semibold mb-1.5 block"
                style={{ color: "oklch(0.38 0.08 30)" }}
              >
                Delivery Address *
              </Label>
              <Textarea
                placeholder="Enter your full delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="font-body text-sm resize-none"
                data-ocid="prasad.booking.textarea"
              />
            </div>

            {/* Contact Number */}
            <div>
              <Label
                className="font-body text-sm font-semibold mb-1.5 block"
                style={{ color: "oklch(0.38 0.08 30)" }}
              >
                Contact Number *
              </Label>
              <Input
                placeholder="Enter your mobile number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="font-body text-sm"
                data-ocid="prasad.booking.input"
              />
            </div>

            {/* Instructions */}
            <div>
              <Label
                className="font-body text-sm font-semibold mb-1.5 block"
                style={{ color: "oklch(0.38 0.08 30)" }}
              >
                Special Instructions{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                placeholder="Any special instructions or occasion details..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={2}
                className="font-body text-sm resize-none"
                data-ocid="prasad.booking.instructions.textarea"
              />
            </div>

            <Button
              className="w-full font-body font-bold py-5 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.18 38), oklch(0.42 0.14 22))",
                color: "white",
                border: "none",
              }}
              disabled={
                bookMutation.isPending ||
                !address.trim() ||
                !contact.trim() ||
                !selectedPrasad
              }
              onClick={() => bookMutation.mutate()}
              data-ocid="prasad.booking.submit_button"
            >
              {bookMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Booking...
                </>
              ) : (
                <>🙏 Confirm Prasad Booking — ₹{totalPrice}</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
