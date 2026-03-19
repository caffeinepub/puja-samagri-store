import { Link } from "@tanstack/react-router";
import { Heart, Leaf, Shield, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Leaf,
    title: "Purity",
    description:
      "Every product we source meets strict standards of ritual purity. We work only with certified farms and trusted suppliers who share our devotion.",
  },
  {
    icon: Heart,
    title: "Devotion",
    description:
      "We don't just sell products — we deliver reverence. Every order is packed with care and intention, treating each item as a sacred offering.",
  },
  {
    icon: Sparkles,
    title: "Freshness",
    description:
      "Fresh flowers and perishables are sourced daily from local farms and delivered within hours of harvest, so your puja always begins with life.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "We stand behind every product. Transparent sourcing, honest pricing, and a no-questions return policy — because trust is the foundation of devotion.",
  },
];

const TEAM = [
  {
    name: "Rajan Sharma",
    role: "Founder & CEO",
    initials: "RS",
    bio: "A third-generation pujari from Varanasi, Rajan founded Samudraj to make temple-quality essentials accessible to every household across India.",
  },
  {
    name: "Priya Iyer",
    role: "Head of Sourcing",
    initials: "PI",
    bio: "With 12 years in the floral and agri-supply chain, Priya ensures every flower and herb meets the highest standards of purity and freshness.",
  },
  {
    name: "Arjun Mehta",
    role: "Pandit Relations & Partnerships",
    initials: "AM",
    bio: "Arjun bridges the gap between skilled pandits across India and families seeking authentic ritual guidance, managing our pandit network with reverence.",
  },
];

export function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 16) 0%, oklch(0.22 0.10 22) 100%)",
      }}
    >
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.68 0.22 45) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span
            className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
            style={{ color: "oklch(0.88 0.18 82)" }}
          >
            Our Story
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About <span style={{ color: "oklch(0.88 0.18 82)" }}>Samudraj</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Born from devotion, built for every home. Samudraj brings the
            sanctity of temple-quality puja essentials to your doorstep — pure,
            fresh, and delivered with reverence.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "oklch(0.14 0.06 16 / 0.8)",
              border: "1px solid oklch(0.68 0.22 45 / 0.2)",
            }}
          >
            <h2
              className="font-display text-3xl font-bold mb-6"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              How Samudraj Began
            </h2>
            <div className="space-y-4 font-body text-white/75 leading-relaxed text-base">
              <p>
                It started with a simple frustration. Rajan Sharma, the third
                generation of a family of pujaris from Varanasi, moved to Mumbai
                in 2018. Every morning, instead of beginning his puja with fresh
                marigolds and pure ghee as his father had, he was searching
                through crowded markets for substandard flowers that wilted
                within hours.
              </p>
              <p>
                He realized millions of Indian families shared this struggle.
                The sacred ritual of daily puja — something so deeply rooted in
                India's culture — was being compromised simply because the
                essentials were hard to find, inconsistent in quality, or
                inaccessible to those who had moved far from traditional supply
                chains.
              </p>
              <p>
                In 2020, Samudraj was born. A platform that sources directly
                from certified farms, partners with experienced pandits, and
                delivers temple-grade puja essentials to homes across India — so
                that every family can maintain the sanctity of their daily
                rituals, no matter where they live.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="maroon-section py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              Our Purpose
            </span>
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="font-body text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              To make sacred living simple — by delivering pure, fresh, and
              authentic puja essentials to every Indian home, supported by
              trusted pandits and meaningful rituals that connect people to
              their spiritual roots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              What Drives Us
            </span>
            <h2 className="font-display text-4xl font-bold text-white">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl p-6 text-center"
                style={{
                  background: "oklch(0.14 0.06 16 / 0.8)",
                  border: "1px solid oklch(0.68 0.22 45 / 0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.68 0.22 45 / 0.15)" }}
                >
                  <value.icon
                    className="w-7 h-7"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="maroon-section py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              The People Behind Samudraj
            </span>
            <h2 className="font-display text-4xl font-bold text-white">
              Our Team
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-xl p-6"
                style={{
                  background: "oklch(0.14 0.06 16 / 0.7)",
                  border: "1px solid oklch(0.68 0.22 45 / 0.2)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.42 0.12 22))",
                  }}
                >
                  <span className="font-display text-xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p
                  className="font-accent text-xs uppercase tracking-wider mb-3"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                >
                  {member.role}
                </p>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <Star
            className="w-10 h-10 mx-auto mb-5"
            style={{ color: "oklch(0.88 0.18 82)" }}
          />
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Begin Your Sacred Journey
          </h2>
          <p className="font-body text-white/60 mb-8">
            Explore our curated collection of puja essentials, fresh flowers,
            and ritual kits — all sourced with devotion.
          </p>
          <Link
            to="/catalog"
            data-ocid="about.primary_button"
            search={{ category: undefined }}
            className="inline-block px-8 py-3 rounded-full font-accent font-semibold text-white text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.42 0.12 22))",
            }}
          >
            Shop Our Products
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
