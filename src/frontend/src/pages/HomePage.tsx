import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  MapPin,
  Star,
  Truck,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const CATEGORIES = [
  {
    id: "flowers",
    label: "Fresh Flowers",
    emoji: "🌸",
    description: "Marigold, Rose, Lotus & more for daily puja",
    accentClass: "cat-accent-flowers",
  },
  {
    id: "haar",
    label: "Haar & Garlands",
    emoji: "💐",
    description: "Fresh garlands for deity offerings & ceremonies",
    accentClass: "cat-accent-haar",
  },
  {
    id: "pujaEssentials",
    label: "Puja Essentials",
    emoji: "🪔",
    description: "Incense, camphor, kumkum, chandan & more",
    accentClass: "cat-accent-essentials",
  },
  {
    id: "thaliSets",
    label: "Thali Sets",
    emoji: "🥣",
    description: "Complete puja thali sets for all occasions",
    accentClass: "cat-accent-thali",
  },
  {
    id: "occasionPackages",
    label: "Occasion Packages",
    emoji: "📦",
    description: "Navratri, Ganesh Puja, Griha Pravesh kits",
    accentClass: "cat-accent-occasion",
  },
  {
    id: "books",
    label: "Ritual Books",
    emoji: "📚",
    description: "Bhagavad Gita, Hanuman Chalisa, Puja Vidhi guides",
    accentClass: "cat-accent-books",
  },
];

const UPCOMING_FESTIVALS = [
  {
    name: "Ram Navami",
    emoji: "🙏",
    date: "April 6, 2026",
    jsDate: new Date("2026-04-06"),
    tip: "Offer tulsi, yellow flowers, panchamrit & light a ghee diya",
    category: "pujaEssentials",
  },
  {
    name: "Hanuman Jayanti",
    emoji: "🐒",
    date: "April 21, 2026",
    jsDate: new Date("2026-04-21"),
    tip: "Offer sindoor, red flowers, boondi prasad & chameli oil lamp",
    category: "flowers",
  },
  {
    name: "Akshaya Tritiya",
    emoji: "✨",
    date: "April 28, 2026",
    jsDate: new Date("2026-04-28"),
    tip: "Begin new puja with gold items, yellow flowers & sattu prasad",
    category: "thaliSets",
  },
  {
    name: "Buddha Purnima",
    emoji: "🌕",
    date: "May 12, 2026",
    jsDate: new Date("2026-05-12"),
    tip: "Offer white lotus, sandalwood incense & kheer prasad",
    category: "flowers",
  },
  {
    name: "Ganga Dussehra",
    emoji: "🌊",
    date: "May 27, 2026",
    jsDate: new Date("2026-05-27"),
    tip: "Offer marigold haar, dhoop, earthen diyas & gangajal",
    category: "haar",
  },
  {
    name: "Rath Yatra",
    emoji: "🎡",
    date: "June 26, 2026",
    jsDate: new Date("2026-06-26"),
    tip: "Prepare complete puja kit with flowers, fruits & incense",
    category: "occasionPackages",
  },
];

const TRUST_BADGES = [
  {
    icon: <CheckCircle className="w-7 h-7" />,
    title: "100% Pure",
    desc: "Freshly sourced from certified organic farms every morning",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Sacred Quality",
    desc: "Temple-grade flowers & items, carefully selected",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Timely Delivery",
    desc: "Reliable slots from 6 AM to 8 PM, six days a week",
  },
  {
    icon: <Calendar className="w-7 h-7" />,
    title: "Custom Schedules",
    desc: "Set recurring orders for morning puja & evening aarti",
  },
];

const OCCASIONS = [
  { label: "Navratri", emoji: "🪔" },
  { label: "Ganesh Chaturthi", emoji: "🐘" },
  { label: "Diwali", emoji: "✨" },
  { label: "Satyanarayan Puja", emoji: "🙏" },
  { label: "Griha Pravesh", emoji: "🏠" },
  { label: "Durga Puja", emoji: "🌺" },
  { label: "Daily Puja", emoji: "☀️" },
  { label: "Weddings", emoji: "💒" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// Decorative mandala SVG
function MandalaSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      opacity="0.06"
      fill="none"
      stroke="white"
      strokeWidth="0.7"
      role="img"
      aria-label="Decorative mandala pattern"
    >
      <circle cx="100" cy="100" r="90" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="50" />
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="10" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 10 * Math.cos(rad);
        const y1 = 100 + 10 * Math.sin(rad);
        const x2 = 100 + 90 * Math.cos(rad);
        const y2 = 100 + 90 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 60 * Math.cos(rad);
        const y = 100 + 60 * Math.sin(rad);
        return <circle key={angle} cx={x} cy={y} r="3" />;
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 80 * Math.cos(rad);
        const y = 100 + 80 * Math.sin(rad);
        return <circle key={angle} cx={x} cy={y} r="4" />;
      })}
    </svg>
  );
}

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[560px] sm:h-[640px]">
          <img
            src="/assets/generated/hero-puja-main.dim_1440x640.jpg"
            alt="Sacred puja samagri — brass thali with fresh flowers and lit diya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Deep refined overlay — subject on right, text on left */}
          <div className="absolute inset-0 hero-overlay" />

          {/* Mandala watermark — right side */}
          <div className="absolute right-0 top-0 w-[380px] h-full pointer-events-none select-none hidden lg:block">
            <MandalaSVG />
          </div>

          {/* Large OM watermark — decorative */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 text-[180px] font-display select-none pointer-events-none hidden xl:block leading-none">
            ॐ
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                >
                  <Badge
                    className="mb-5 font-body text-xs tracking-wider px-4 py-1.5 rounded-full border-0 flex items-center gap-2 w-fit text-white"
                    style={{ background: "oklch(0.68 0.22 45 / 0.9)" }}
                  >
                    <span className="animate-flame inline-block">🪔</span>
                    Sacred & Pure
                  </Badge>
                </motion.div>

                <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight mb-5 drop-shadow-lg">
                  Sacred Samudraj,
                  <br />
                  <span className="gold-text">Delivered Fresh Daily</span>
                </h1>
                <p className="font-body text-lg sm:text-xl text-white/82 mb-8 leading-relaxed max-w-md">
                  Handpicked flowers, temple-grade essentials & ritual kits —
                  delivered to your doorstep for every morning puja and evening
                  aarti.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="text-white font-body font-semibold px-8 shadow-glow-saffron hover:shadow-warm transition-all duration-300 hover:-translate-y-0.5 border-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.52 0.21 38))",
                    }}
                    onClick={() =>
                      navigate({
                        to: "/catalog",
                        search: { category: undefined },
                      })
                    }
                    data-ocid="home.shopNow.button"
                  >
                    Shop Sacred Items
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/55 text-white bg-white/8 hover:bg-white/18 font-body font-semibold px-8 backdrop-blur-sm transition-all duration-300"
                    onClick={() => navigate({ to: "/schedule" })}
                    data-ocid="home.scheduleFlowers.button"
                  >
                    Set Daily Schedule
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </div>
      </section>

      {/* ==================== UPCOMING FESTIVALS ==================== */}
      <section
        className="py-14"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.015 70) 0%, oklch(0.99 0.006 72) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="flex items-center gap-4 justify-center mb-4">
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.68 0.22 45 / 0.5))",
                  }}
                />
                <span className="text-saffron text-xl">🕉️</span>
                <span className="font-body text-xs tracking-[0.3em] text-saffron uppercase">
                  Festival Calendar
                </span>
                <span className="text-saffron text-xl">🕉️</span>
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.68 0.22 45 / 0.5), transparent)",
                  }}
                />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Upcoming Festivals & Puja Guide
              </h2>
              <p className="font-body text-muted-foreground text-sm max-w-md mx-auto">
                Know what's coming up and be prepared with the right puja items
                for each sacred day
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {UPCOMING_FESTIVALS.map((fest) => {
                const today = new Date();
                const diff = Math.ceil(
                  (fest.jsDate.getTime() - today.setHours(0, 0, 0, 0)) /
                    (1000 * 60 * 60 * 24),
                );
                const isClose = diff <= 15;
                return (
                  <motion.div
                    key={fest.name}
                    variants={itemVariants}
                    className="rounded-2xl p-5 border border-border/60 hover:border-saffron/40 hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3"
                    style={{
                      background:
                        "linear-gradient(145deg, oklch(1.0 0.004 72), oklch(0.97 0.018 70))",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.95 0.06 75), oklch(0.91 0.10 68))",
                          }}
                        >
                          {fest.emoji}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground text-base leading-tight">
                            {fest.name}
                          </h3>
                          <p className="font-body text-xs text-muted-foreground mt-0.5">
                            {fest.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className="flex-shrink-0 font-body text-xs font-bold px-2.5 py-1 rounded-full"
                        style={
                          isClose
                            ? {
                                background: "oklch(0.95 0.1 32 / 0.2)",
                                color: "oklch(0.5 0.18 32)",
                              }
                            : {
                                background: "oklch(0.95 0.06 75 / 0.5)",
                                color: "oklch(0.52 0.15 50)",
                              }
                        }
                      >
                        {diff === 0
                          ? "Today!"
                          : diff === 1
                            ? "Tomorrow"
                            : `${diff}d`}
                      </span>
                    </div>
                    <p
                      className="font-body text-xs text-muted-foreground leading-relaxed border-l-2 pl-3"
                      style={{ borderColor: "oklch(0.68 0.22 45 / 0.4)" }}
                    >
                      🪔 {fest.tip}
                    </p>
                    <button
                      type="button"
                      className="mt-auto w-full font-body text-xs font-semibold py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5"
                      style={{
                        borderColor: "oklch(0.68 0.22 45 / 0.5)",
                        color: "oklch(0.52 0.18 40)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.52 0.21 38))";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor =
                          "oklch(0.68 0.22 45 / 0.5)";
                        e.currentTarget.style.color = "oklch(0.52 0.18 40)";
                      }}
                      onClick={() =>
                        navigate({
                          to: "/catalog",
                          search: { category: fest.category },
                        })
                      }
                      data-ocid="home.festival.button"
                    >
                      Shop Items for {fest.name}{" "}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CATEGORY GRID ==================== */}
      <section className="devotional-section py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              {/* Elegant decorative divider */}
              <div className="flex items-center gap-4 justify-center mb-4">
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.68 0.22 45 / 0.5))",
                  }}
                />
                <span className="text-saffron text-xl animate-flame inline-block">
                  🪔
                </span>
                <span className="font-body text-xs tracking-[0.3em] text-saffron uppercase">
                  Explore
                </span>
                <span className="text-saffron text-xl animate-flame inline-block">
                  🪔
                </span>
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.68 0.22 45 / 0.5), transparent)",
                  }}
                />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Browse by Category
              </h2>
              <p className="font-body text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                From fresh flowers to complete puja kits — everything you need
                for your daily devotion
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {CATEGORIES.map((cat) => (
                <motion.div key={cat.id} variants={itemVariants}>
                  <button
                    type="button"
                    className="w-full text-left cursor-pointer group rounded-2xl overflow-hidden shadow-card hover:shadow-elevated border border-border/60 hover:border-saffron/30 transition-all duration-350 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-saffron/30"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(1.0 0.004 72), oklch(0.98 0.01 72))",
                    }}
                    onClick={() =>
                      navigate({ to: "/catalog", search: { category: cat.id } })
                    }
                    data-ocid={`home.category.${cat.id}.button`}
                  >
                    {/* Colored top accent — 2px taller */}
                    <div className={`h-2 w-full ${cat.accentClass}`} />
                    <div className="p-6">
                      <div className="text-5xl mb-4 transition-transform duration-350 group-hover:scale-110 group-hover:animate-subtle-float block">
                        {cat.emoji}
                      </div>
                      <h3 className="font-display text-sm font-bold text-foreground mb-1.5 leading-tight">
                        {cat.label}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-saffron opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                        <span className="font-body text-xs font-semibold">
                          Explore
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TRUST BADGES — dark maroon section ==================== */}
      <section className="maroon-section py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-10">
              {/* Gold-colored divider on dark bg */}
              <div className="flex items-center gap-4 justify-center mb-4">
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.84 0.16 84 / 0.5))",
                  }}
                />
                <span
                  className="text-xl"
                  style={{ color: "oklch(0.84 0.16 84)" }}
                >
                  ✦
                </span>
                <span
                  className="font-body text-xs tracking-[0.3em] uppercase"
                  style={{ color: "oklch(0.84 0.16 84)" }}
                >
                  Our Promise
                </span>
                <span
                  className="text-xl"
                  style={{ color: "oklch(0.84 0.16 84)" }}
                >
                  ✦
                </span>
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.84 0.16 84 / 0.5), transparent)",
                  }}
                />
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Why Choose Us
              </h2>
              <p
                className="font-body text-sm max-w-xs mx-auto"
                style={{ color: "oklch(1 0 0 / 0.6)" }}
              >
                Trusted by thousands of families for their daily devotion
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {TRUST_BADGES.map((badge) => (
                <motion.div
                  key={badge.title}
                  variants={itemVariants}
                  className="rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-divine transition-all duration-350"
                  style={{
                    background: "oklch(1 0 0 / 0.07)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.88 0.18 82 / 0.3), oklch(0.68 0.22 45 / 0.35))",
                      color: "oklch(0.88 0.18 82)",
                    }}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base mb-1">
                      {badge.title}
                    </h3>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{ color: "oklch(1 0 0 / 0.62)" }}
                    >
                      {badge.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SCHEDULE BANNER ==================== */}
      <section className="py-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/assets/generated/schedule-banner.dim_1200x400.jpg"
              alt="Daily flower schedule"
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.28 0.13 16 / 0.94) 0%, oklch(0.28 0.13 16 / 0.72) 55%, transparent 100%)",
              }}
            />

            {/* Bottom-left dot pattern */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-15 pointer-events-none">
              <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                role="img"
                aria-label="Decorative dot pattern"
              >
                {Array.from({ length: 4 }).map((_, row) =>
                  Array.from({ length: 4 }).map((_, col) => (
                    <circle
                      // biome-ignore lint/suspicious/noArrayIndexKey: decorative SVG pattern
                      key={`${row}-${col}`}
                      cx={col * 18 + 5}
                      cy={row * 18 + 5}
                      r="2.5"
                    />
                  )),
                )}
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div className="max-w-lg">
                <Badge
                  className="mb-4 font-body text-xs font-semibold px-3 py-1.5 rounded-full border-0 flex items-center gap-2 w-fit"
                  style={{
                    background: "oklch(0.84 0.16 84 / 0.22)",
                    color: "oklch(0.88 0.18 82)",
                  }}
                >
                  <Calendar className="w-3 h-3" />
                  Daily Schedule Feature
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  Schedule Daily Flowers & Haar
                </h2>
                <p className="font-body text-sm sm:text-base text-white/78 mb-6 leading-relaxed">
                  Choose products, set delivery times, pick your days — get
                  fresh flowers for every puja and aarti without reordering.
                </p>
                <Button
                  size="lg"
                  className="font-body font-bold shadow-warm hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 group border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.18 82), oklch(0.80 0.2 76))",
                    color: "oklch(0.22 0.08 28)",
                  }}
                  onClick={() => navigate({ to: "/schedule" })}
                  data-ocid="home.scheduleFlowers.button"
                >
                  Create Your Schedule
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== BOOK A PANDIT BANNER ==================== */}
      <section className="py-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.25 0.13 16) 0%, oklch(0.32 0.12 20) 50%, oklch(0.42 0.16 38) 100%)",
            }}
          >
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Decorative symbols */}
            <div className="absolute right-6 top-4 text-6xl opacity-12 select-none">
              🕉️
            </div>
            {/* Diya with flame animation */}
            <div className="absolute right-24 bottom-4 text-4xl opacity-15 select-none animate-flame">
              🪔
            </div>
            <div className="absolute right-44 top-8 text-3xl opacity-8 select-none">
              🌸
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-lg">
                <Badge
                  className="mb-4 font-body text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-2 w-fit"
                  style={{
                    background: "oklch(0.84 0.16 84 / 0.14)",
                    borderColor: "oklch(0.84 0.16 84 / 0.3)",
                    color: "oklch(0.88 0.18 82)",
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  Experienced Pandits Nearby
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  Book a Pandit for Your Puja
                </h2>
                <p
                  className="font-body text-sm sm:text-base mb-5 leading-relaxed"
                  style={{ color: "oklch(1 0 0 / 0.75)" }}
                >
                  Find experienced pandits for Satyanarayan Katha, Griha
                  Pravesh, weddings, and every sacred ceremony.
                </p>
                {/* Trust signals */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        style={{
                          fill: "oklch(0.84 0.16 84)",
                          color: "oklch(0.84 0.16 84)",
                        }}
                      />
                    ))}
                    <span
                      className="font-body text-xs ml-1"
                      style={{ color: "oklch(1 0 0 / 0.55)" }}
                    >
                      4.9/5
                    </span>
                  </div>
                  <span
                    className="font-body text-xs"
                    style={{ color: "oklch(1 0 0 / 0.4)" }}
                  >
                    •
                  </span>
                  <span
                    className="font-body text-xs flex items-center gap-1"
                    style={{ color: "oklch(1 0 0 / 0.65)" }}
                  >
                    <BookOpen className="w-3 h-3" />
                    500+ ceremonies performed
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  size="lg"
                  className="font-body font-bold shadow-warm hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 group whitespace-nowrap border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.18 82), oklch(0.80 0.2 76))",
                    color: "oklch(0.22 0.08 28)",
                  }}
                  onClick={() => navigate({ to: "/book-pandit" })}
                  data-ocid="home.bookpandit.button"
                >
                  Find a Pandit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== PRASAD BOOKING PROMO ==================== */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.14 38) 0%, oklch(0.55 0.18 55) 50%, oklch(0.68 0.22 82) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-7 sm:p-10">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
                  <span className="text-2xl">🪤</span>
                  <span
                    className="font-body text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "oklch(1 0 0 / 0.7)" }}
                  >
                    Sacred Prasad Delivery
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
                  Get Prasad from 10 Sacred Temples
                </h2>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(1 0 0 / 0.75)" }}
                >
                  Shirdi, Ayodhya, Tirupati, Vaishno Devi &amp; more — delivered
                  to your door.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="font-body font-bold text-sm px-6 py-3 rounded-xl shadow-warm hover:shadow-elevated transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "white", color: "oklch(0.42 0.14 22)" }}
                  onClick={() => navigate({ to: "/prasad" })}
                  data-ocid="home.prasad.primary_button"
                >
                  🙏 Book Prasad
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ==================== SHOP BY OCCASION ==================== */}
      <section className="devotional-section py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center gap-4 justify-center mb-4">
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.68 0.22 45 / 0.5))",
                  }}
                />
                <span className="text-saffron text-xl">🕉️</span>
                <span className="font-body text-xs tracking-[0.3em] text-saffron uppercase">
                  Occasions
                </span>
                <span className="text-saffron text-xl">🕉️</span>
                <div
                  className="h-px w-16"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.68 0.22 45 / 0.5), transparent)",
                  }}
                />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Shop by Occasion
              </h3>
            </div>
            <div className="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:justify-center gap-2.5 pb-2 sm:pb-0">
              {OCCASIONS.map((tag, idx) => (
                <button
                  type="button"
                  key={tag.label}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-body font-medium border transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={
                    idx % 2 === 0
                      ? {
                          borderColor: "oklch(0.68 0.22 45 / 0.4)",
                          color: "oklch(0.68 0.22 45)",
                        }
                      : {
                          borderColor: "oklch(0.28 0.13 16 / 0.35)",
                          color: "oklch(0.28 0.13 16)",
                        }
                  }
                  onMouseEnter={(e) => {
                    const t = e.currentTarget;
                    t.style.background = "oklch(0.28 0.13 16)";
                    t.style.borderColor = "oklch(0.28 0.13 16)";
                    t.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget;
                    t.style.background = "transparent";
                    if (idx % 2 === 0) {
                      t.style.borderColor = "oklch(0.68 0.22 45 / 0.4)";
                      t.style.color = "oklch(0.68 0.22 45)";
                    } else {
                      t.style.borderColor = "oklch(0.28 0.13 16 / 0.35)";
                      t.style.color = "oklch(0.28 0.13 16)";
                    }
                  }}
                  onClick={() =>
                    navigate({
                      to: "/catalog",
                      search: { category: undefined },
                    })
                  }
                  data-ocid="home.occasion.button"
                >
                  <span>{tag.emoji}</span>
                  {tag.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
