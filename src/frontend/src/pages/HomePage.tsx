import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock, Leaf, Star, Truck } from "lucide-react";
import { type Variants, motion } from "motion/react";

const CATEGORIES = [
  {
    id: "flowers",
    label: "Fresh Flowers",
    emoji: "🌸",
    description: "Marigold, Rose, Lotus & more for daily puja",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200",
  },
  {
    id: "haar",
    label: "Haar & Garlands",
    emoji: "💐",
    description: "Fresh garlands for deity offerings & ceremonies",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
  },
  {
    id: "pujaEssentials",
    label: "Puja Essentials",
    emoji: "🪔",
    description: "Incense, camphor, kumkum, chandan & more",
    color: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
  },
  {
    id: "thaliSets",
    label: "Thali Sets",
    emoji: "🥣",
    description: "Complete puja thali sets for all occasions",
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
  },
  {
    id: "occasionPackages",
    label: "Occasion Packages",
    emoji: "📦",
    description: "Navratri, Ganesh Puja, Griha Pravesh kits",
    color: "from-red-50 to-rose-50",
    border: "border-red-200",
  },
  {
    id: "books",
    label: "Ritual Books",
    emoji: "📚",
    description: "Bhagavad Gita, Hanuman Chalisa, Puja Vidhi guides & more",
    color: "from-purple-50 to-indigo-50",
    border: "border-purple-200",
  },
];

const FEATURES = [
  {
    icon: <Truck className="w-5 h-5" />,
    label: "Daily Delivery",
    desc: "Fresh every morning",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    label: "100% Fresh",
    desc: "Direct from farms",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Flexible Schedules",
    desc: "Choose your time",
  },
  {
    icon: <Star className="w-5 h-5" />,
    label: "Premium Quality",
    desc: "Handpicked daily",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[480px] sm:h-[540px]">
          <img
            src="/assets/generated/hero-flowers.dim_1200x500.jpg"
            alt="Fresh puja flowers"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-xl"
              >
                <Badge className="bg-saffron/90 text-white mb-4 font-body text-xs tracking-wide px-3 py-1">
                  🪔 Pure & Fresh Daily
                </Badge>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                  Pure Puja Samagri,{" "}
                  <span className="text-amber-300">Delivered Fresh</span>
                </h1>
                <p className="font-body text-base sm:text-lg text-white/85 mb-8 leading-relaxed">
                  Fresh flowers, garlands, and puja essentials delivered at your
                  doorstep. Schedule daily deliveries for your morning and
                  evening aarti.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-saffron hover:bg-saffron-dark text-white font-body font-semibold px-8"
                    onClick={() =>
                      navigate({
                        to: "/catalog",
                        search: { category: undefined },
                      })
                    }
                    data-ocid="home.shopNow.button"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/70 text-white bg-white/10 hover:bg-white/20 font-body font-semibold px-8 backdrop-blur-sm"
                    onClick={() => navigate({ to: "/schedule" })}
                    data-ocid="home.scheduleFlowers.button"
                  >
                    Schedule Flowers
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature pills */}
      <section className="bg-maroon py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 justify-center text-white/90"
              >
                <span className="text-amber-300">{f.icon}</span>
                <div>
                  <p className="font-body text-sm font-semibold">{f.label}</p>
                  <p className="font-body text-xs text-white/65 hidden sm:block">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <p className="ornament-divider mb-3 flex justify-center" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              From fresh flowers to complete puja kits — everything you need for
              your daily devotion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.id} variants={itemVariants}>
                <Card
                  className={`cursor-pointer border ${cat.border} bg-gradient-to-br ${cat.color} hover:shadow-warm transition-all duration-300 hover:-translate-y-1 group`}
                  onClick={() =>
                    navigate({ to: "/catalog", search: { category: cat.id } })
                  }
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {cat.emoji}
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground mb-2">
                      {cat.label}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Schedule Banner */}
      <section className="py-8 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/assets/generated/schedule-banner.dim_1200x400.jpg"
              alt="Daily flower schedule"
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-maroon/85 via-maroon/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div className="max-w-lg">
                <Badge className="bg-amber-400 text-amber-900 mb-3 font-body text-xs font-semibold">
                  ✨ New Feature
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  Schedule Daily Flowers & Haar
                </h2>
                <p className="font-body text-sm sm:text-base text-white/85 mb-5 leading-relaxed">
                  Choose your products, set delivery times, pick your days — and
                  get fresh flowers delivered for every morning puja and evening
                  aarti.
                </p>
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-body font-bold"
                  onClick={() => navigate({ to: "/schedule" })}
                  data-ocid="home.scheduleFlowers.button"
                >
                  Create Your Schedule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Book a Pandit Banner */}
      <section className="py-8 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-maroon via-maroon/95 to-amber-900 p-8 sm:p-10">
            {/* Decorative elements */}
            <div className="absolute right-6 top-4 text-5xl opacity-20 select-none">
              🕉️
            </div>
            <div className="absolute right-20 bottom-4 text-4xl opacity-15 select-none">
              🪔
            </div>
            <div className="absolute right-40 top-6 text-3xl opacity-10 select-none">
              🌸
            </div>
            <div className="relative max-w-lg">
              <Badge className="bg-amber-400/20 text-amber-200 border-amber-400/30 mb-3 font-body text-xs font-semibold">
                🙏 Experienced Pandits
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Book a Pandit for Your Puja
              </h2>
              <p className="font-body text-sm sm:text-base text-white/80 mb-5 leading-relaxed">
                Find experienced pandits nearby for Satyanarayan Katha, Griha
                Pravesh, weddings, and more.
              </p>
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-body font-bold"
                onClick={() => navigate({ to: "/book-pandit" })}
                data-ocid="home.bookpandit.button"
              >
                Find Pandit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Festival tags */}
      <section className="py-10 container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Popular Occasions
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Navratri",
            "Ganesh Chaturthi",
            "Diwali",
            "Satyanarayan Puja",
            "Griha Pravesh",
            "Durga Puja",
            "Daily Puja",
            "Festivals",
          ].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-4 py-2 text-sm font-body cursor-pointer border-saffron text-saffron hover:bg-saffron hover:text-white transition-colors"
              onClick={() =>
                navigate({ to: "/catalog", search: { category: undefined } })
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
