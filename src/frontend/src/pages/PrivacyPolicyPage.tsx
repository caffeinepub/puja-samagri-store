import {
  Cookie,
  Cpu,
  Database,
  Eye,
  Lock,
  Mail,
  Share2,
  Shield,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

const SECTIONS = [
  {
    icon: Shield,
    title: "Introduction",
    content: [
      "Welcome to Samudraj. We are committed to protecting your privacy and handling your personal information with respect and transparency. This Privacy Policy explains how we collect, use, store, and protect your data when you use our platform.",
      "By using Samudraj, you consent to the practices described in this policy. We recommend reading it in full to understand your rights and how your information is managed.",
    ],
  },
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "We collect the following types of information:",
      "Account Data: When you log in via Internet Identity, we receive a unique anonymous principal ID associated with your identity. We do not receive your name, email, or any personally identifying information from Internet Identity unless you provide it.",
      "Order Data: When you place an order, we collect your delivery address, phone number, and the items ordered. This information is necessary to fulfill your purchase.",
      "Booking Data: For pandit bookings and prasad orders, we collect ceremony details, preferred dates, addresses, and contact information.",
      "Usage Data: We may collect anonymized data about how you interact with our platform (pages visited, features used) to improve the service.",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "We use your data exclusively for the following purposes:",
      "• To process and fulfill your orders and bookings",
      "• To communicate order status, shipping updates, and booking confirmations",
      "• To provide customer support and resolve issues",
      "• To improve our platform, product offerings, and user experience",
      "• To comply with applicable laws and regulations",
      "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: [
      "Samudraj uses minimal, functional cookies and browser storage to maintain your session state, cart contents, and user preferences.",
      "We do not use third-party advertising cookies or behavioral tracking technologies. Any analytics we employ are privacy-preserving and do not identify individual users.",
      "You can clear cookies and local storage at any time through your browser settings without affecting your account security.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We take data security seriously. Your data is protected through the following measures:",
      "• All connections to Samudraj are encrypted via HTTPS/TLS.",
      "• Authentication is handled by Internet Identity, a cryptographically secure, passwordless identity system — no passwords are stored on our systems.",
      "• Access to backend systems is restricted to authorized personnel only.",
      "• Sensitive order data is stored in encrypted canister memory on the Internet Computer.",
    ],
  },
  {
    icon: Cpu,
    title: "Internet Computer & Blockchain",
    content: [
      "Samudraj is built on the Internet Computer Protocol (ICP), a decentralized blockchain-based infrastructure. This means:",
      "• Your order and booking data is stored in smart contracts called 'canisters' on the Internet Computer blockchain.",
      "• Data stored in canisters is replicated across a network of independent nodes for resilience and availability.",
      "• Your identity is managed via Internet Identity, a decentralized authentication system that does not rely on passwords or centralized identity providers.",
      "• While data on ICP is cryptographically secure, please be aware that blockchain data has inherent persistence characteristics. Contact us to request data removal.",
    ],
  },
  {
    icon: Share2,
    title: "Third Party Services",
    content: [
      "We engage limited third-party services solely for operational purposes:",
      "• Shipping partners (for order delivery) — receive your name, address, and phone number as required for delivery.",
      "• Temple partners (for prasad orders) — receive your name and delivery address for prasad dispatch.",
      "• Pandit network — pandits receive booking details (ceremony type, date, address) to fulfill bookings.",
      "All third-party partners are contractually obligated to handle your data securely and only for the purpose of fulfilling your service request.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "You have the following rights regarding your personal data:",
      "• Access: Request a copy of the personal data we hold about you.",
      "• Correction: Request correction of any inaccurate data.",
      "• Deletion: Request deletion of your personal data from our systems (subject to legal retention requirements).",
      "• Portability: Request your data in a machine-readable format.",
      "To exercise any of these rights, contact us at support@samudraj.com. We will respond within 7 business days.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    content: [
      "If you have questions about this Privacy Policy or how your data is handled, contact us:",
      "📧 Email: support@samudraj.com",
      "📞 Phone: +91-98765-43210 (Mon–Sat, 8AM–8PM; Sun, 9AM–5PM)",
      "We may update this policy from time to time. Material changes will be communicated via a notice on our platform. Continued use after changes constitutes acceptance of the updated policy.",
    ],
  },
];

export function PrivacyPolicyPage() {
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
            Privacy <span style={{ color: "oklch(0.88 0.18 82)" }}>Policy</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Your privacy is sacred to us. Here's exactly how we handle your data
            — transparently and responsibly.
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
              transition={{ duration: 0.5, delay: i * 0.04 }}
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
