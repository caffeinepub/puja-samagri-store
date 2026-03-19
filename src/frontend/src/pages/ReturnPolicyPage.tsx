import {
  ArrowLeftRight,
  CheckCircle,
  Clock,
  Mail,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const SECTIONS = [
  {
    icon: CheckCircle,
    title: "Overview",
    content: [
      "At Samudraj, we want every puja experience to be sacred and satisfying. If you're not completely happy with your order for eligible products, we offer a hassle-free return and refund process within 7 days of delivery.",
      "Please read the full policy below to understand which products qualify, the conditions required, and how to initiate a return.",
    ],
  },
  {
    icon: CheckCircle,
    title: "Eligible Products for Return",
    content: [
      "The following categories are eligible for return and refund:",
      "• Dry puja essentials (agarbatti, camphor, dhoop, diyas, match boxes)",
      "• Ritual books and scriptures (if sealed/unused)",
      "• Decorative accessories (idols, frames, pooja thalis, brass items)",
      "• Occasion kit components (individual dry items within customizable kits)",
      "• Apparel and fabric items (if unopened and in original packaging)",
      "Items must be in their original condition, unused, and in original packaging with all tags intact.",
    ],
  },
  {
    icon: XCircle,
    title: "Non-Eligible Products",
    content: [
      "The following products cannot be returned due to their perishable or customized nature:",
      "• Fresh flowers, marigolds, rose petals, and flower garlands (haars)",
      "• Seasonal and perishable offerings (fruits, coconuts, betel leaves)",
      "• Customized occasion kits (once assembled and delivered as a whole)",
      "• Prasad received from temples (prasad orders are final once dispatched)",
      "• Opened or partially used dry products",
      "• Items damaged through misuse or improper storage",
    ],
  },
  {
    icon: RotateCcw,
    title: "Return Process",
    content: [
      "To initiate a return, follow these steps:",
      "1. Contact us within 7 days of receiving your order at support@samudraj.com or call +91-98765-43210.",
      "2. Provide your Order ID, item name(s), reason for return, and at least one photo of the item.",
      "3. Our team will review your request within 1 business day and confirm eligibility.",
      "4. Once approved, we'll arrange a reverse pickup at no additional cost to you.",
      "5. Items must be securely packed in their original packaging before handover to the courier.",
      "Please do not send items back without prior approval — unapproved returns will not be processed.",
    ],
  },
  {
    icon: Clock,
    title: "Refund Timeline",
    content: [
      "Once we receive and inspect the returned item, refunds are processed as follows:",
      "• Approval notification: Within 1 business day of receiving the item.",
      "• Refund to original payment method: 3–5 business days after approval.",
      "• UPI/wallet refunds: Typically 1–2 business days after approval.",
      "• Bank transfers: 3–5 business days, depending on your bank.",
      "You will receive an email confirmation once the refund is initiated. If you haven't received your refund after 7 business days, please contact us.",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Exchange Policy",
    content: [
      "We offer like-for-like exchanges for defective or damaged eligible products. Exchanges are subject to product availability.",
      "• Exchanges for the same product: Free of charge, including reverse pickup and redelivery.",
      "• Exchanges for a different product: Price difference (if any) will be charged or credited accordingly.",
      "To request an exchange, contact us within 7 days of delivery with the same process as a return request.",
    ],
  },
  {
    icon: Mail,
    title: "Contact for Returns",
    content: [
      "For any return, refund, or exchange queries:",
      "📧 Email: support@samudraj.com",
      "📞 Phone: +91-98765-43210 (Mon–Sat, 8AM–8PM; Sun, 9AM–5PM)",
      "Please have your Order ID ready when you contact us for faster resolution.",
    ],
  },
];

export function ReturnPolicyPage() {
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
            Return &amp;{" "}
            <span style={{ color: "oklch(0.88 0.18 82)" }}>Refund Policy</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            We want you to be fully satisfied with every order. Read our return
            and refund guidelines below.
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
