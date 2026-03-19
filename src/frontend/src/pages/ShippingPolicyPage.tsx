import {
  AlertTriangle,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Package,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const SECTIONS = [
  {
    icon: MapPin,
    title: "Delivery Areas",
    content: [
      "Samudraj delivers across India, with same-day delivery available in select metropolitan cities. Our full delivery coverage includes:",
      "Same-Day Delivery Cities: Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata (for fresh flowers and perishables, if ordered before 10:00 AM IST).",
      "2–4 Day Delivery: All other tier-1 and tier-2 cities across India including Jaipur, Lucknow, Chandigarh, Surat, Kochi, Bhopal, and 200+ more cities.",
      "Remote Areas: Delivery to tier-3 cities, towns, and rural areas is available but may take 5–7 business days depending on courier reach.",
    ],
  },
  {
    icon: Clock,
    title: "Delivery Timeframes",
    content: [
      "Fresh Flowers & Perishables:",
      "• Same-day delivery if ordered before 10:00 AM IST in metro cities.",
      "• Next-day delivery if ordered after 10:00 AM IST in metro cities.",
      "• 2–3 days for other cities.",
      "",
      "Dry Puja Essentials, Ritual Books & Accessories:",
      "• Metro cities: 1–2 business days.",
      "• Other tier-1/2 cities: 2–4 business days.",
      "• Remote areas: 5–7 business days.",
      "",
      "Customized Occasion Kits:",
      "• Kits are assembled after order placement. Allow an additional 1 business day for assembly before dispatch.",
      "• Total delivery: 2–5 business days from order date.",
    ],
  },
  {
    icon: Truck,
    title: "Delivery Charges",
    content: [
      "We believe your puja essentials should reach you without financial barriers:",
      "• Free delivery on all orders above ₹299.",
      "• A flat delivery charge of ₹49 applies to orders below ₹299.",
      "• Same-day delivery (metro cities, fresh items): Free on orders above ₹299; ₹49 on smaller orders.",
      "• No hidden fees or additional packaging charges. What you see in your cart is what you pay.",
    ],
  },
  {
    icon: Package,
    title: "Special Handling — Prasad Orders",
    content: [
      "Prasad orders are handled differently from standard product orders, as they involve coordination with temple authorities and specialised couriers:",
      "• Prasad is collected by our temple partners on pre-set dates (typically 2–3 times per week).",
      "• Once collected, prasad is packed in sacred, hygienic packaging and dispatched the same or next day.",
      "• Expected delivery time: 7–10 days from order confirmation.",
      "• Prasad deliveries are not eligible for same-day or express delivery.",
      "• Delivery notifications will be sent via email/SMS at each stage of the journey.",
    ],
  },
  {
    icon: Navigation,
    title: "Order Tracking",
    content: [
      "Stay informed about every step of your order's journey:",
      "• You will receive an order confirmation immediately after placing your order.",
      "• A dispatch notification with courier tracking details will be sent once your order is shipped.",
      "• Live tracking links are provided for standard courier orders via Delhivery, Blue Dart, or DTDC.",
      "• For fresh flower orders, tracking is managed by our local delivery partners.",
      "• Track your orders anytime from the My Dashboard section of the app.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Delays & Force Majeure",
    content: [
      "While we always strive for on-time delivery, certain factors may cause unavoidable delays:",
      "• Natural disasters, extreme weather conditions, or flooding.",
      "• National holidays, public strikes, or government-mandated restrictions.",
      "• Courier or logistics disruptions beyond our control.",
      "• Incorrect or incomplete delivery addresses provided at checkout.",
      "In such cases, we will communicate proactively and offer a rescheduled delivery date or a full refund as appropriate. Samudraj will not be liable for delays caused by force majeure events.",
    ],
  },
  {
    icon: Mail,
    title: "Contact for Shipping Queries",
    content: [
      "For any shipping, delivery, or tracking questions:",
      "📧 Email: support@samudraj.com",
      "📞 Phone: +91-98765-43210 (Mon–Sat, 8AM–8PM; Sun, 9AM–5PM)",
      "Please have your Order ID ready when reaching out. Our team will respond within 4 business hours during working days.",
    ],
  },
];

export function ShippingPolicyPage() {
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
          className="relative z-10 max-w-2xl mx-auto"
        >
          <span
            className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
            style={{ color: "oklch(0.88 0.18 82)" }}
          >
            Policies
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shipping{" "}
            <span style={{ color: "oklch(0.88 0.18 82)" }}>Policy</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Pure devotion deserves swift delivery. Understand our shipping
            process, timelines, and charges.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl p-6"
              style={{
                background: "oklch(0.14 0.06 16 / 0.85)",
                border: "1px solid oklch(0.68 0.22 45 / 0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.68 0.22 45 / 0.15)" }}
                >
                  <section.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  />
                </div>
                <h2 className="font-display text-xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-2">
                {section.content.map((line, j) => (
                  <p
                    key={line || String(j)}
                    className="font-body text-sm text-white/70 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
          <p className="font-body text-xs text-white/35 text-center pt-4">
            Last updated: March 2026
          </p>
        </div>
      </section>
    </div>
  );
}
