import {
  AlertTriangle,
  BookOpen,
  CreditCard,
  FileText,
  Globe,
  Mail,
  Package,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const SECTIONS = [
  {
    icon: BookOpen,
    title: "1. Acceptance of Terms",
    content: [
      "Welcome to Samudraj ('we', 'us', 'our'). By accessing or using our website (samudraj.in) and placing orders, you ('User', 'Customer') agree to be bound by these Terms and Conditions.",
      "If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, users, and customers of Samudraj.",
      "We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting to the website. Continued use of the platform after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    icon: Package,
    title: "2. Products and Pricing",
    content: [
      "All prices on Samudraj are listed in Indian Rupees (INR) and are inclusive of applicable taxes (GST) unless stated otherwise. Our GSTIN is 27AABCS1429B1ZZ.",
      "Product images are for illustrative purposes only. Actual products may vary slightly in color, packaging, or arrangement due to the natural and handcrafted nature of our devotional items.",
      "We reserve the right to modify prices, discontinue products, or change product descriptions at any time without prior notice. Price changes do not affect orders already placed and confirmed.",
      "In case of a pricing error on our website, we reserve the right to cancel any orders placed at the incorrect price. Customers will be notified and refunded in full.",
    ],
  },
  {
    icon: CreditCard,
    title: "3. Payment and COD Terms",
    content: [
      "Payment is due at the time of placing the order. We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery (COD) through our secure payment gateway (Razorpay).",
      "For COD orders: A handling charge of ₹40 is added to the order total. COD is available for orders up to ₹5,000. Please ensure the exact amount is ready at the time of delivery. Non-payment at the time of COD delivery may result in your account being restricted from future COD orders.",
      "All online payments are processed through SSL-secured, PCI-DSS compliant infrastructure. We do not store your financial information on our servers.",
      "In case of payment failure where the amount is deducted from your account but the order is not confirmed, the refund will be automatically processed to your source account within 5–7 business days.",
    ],
  },
  {
    icon: Truck,
    title: "4. Delivery and Shipping",
    content: [
      "Standard delivery timelines are 4–7 business days for most pin codes in India. Delivery timelines are estimates and may be affected by factors beyond our control (public holidays, weather, courier delays).",
      "Free shipping applies to orders above ₹499. Orders below ₹499 incur a flat shipping charge of ₹49. COD orders have an additional handling fee of ₹40 regardless of order value.",
      "We ship across India using trusted courier partners (BlueDart, Delhivery, Ecom Express). You will receive a tracking number upon dispatch.",
      "Risk of loss and title of products passes to you upon delivery by our courier partner to the address provided at checkout.",
    ],
  },
  {
    icon: RotateCcw,
    title: "5. Returns and Cancellations",
    content: [
      "Returns are accepted within 7 days of delivery for eligible non-perishable products in original, unused condition. Perishable items (fresh flowers, prasad) are not eligible for return.",
      "Order cancellations are accepted before dispatch. Once an order is dispatched, it cannot be cancelled. For post-delivery issues, please initiate a return as per our Return Policy.",
      "Refunds are processed within 5–7 business days to the original payment method after we receive and inspect the returned item.",
      "For full details, please refer to our Return & Refund Policy page.",
    ],
  },
  {
    icon: Shield,
    title: "6. Intellectual Property",
    content: [
      "The Samudraj brand name, logo (Shankh/conch shell), website design, product photography, copy, and all other content are the exclusive intellectual property of Samudraj and its creators.",
      "No part of this website may be reproduced, distributed, modified, or used for commercial purposes without prior written consent from Samudraj.",
      "User-generated content (reviews, photos) submitted to Samudraj grants us a non-exclusive, royalty-free license to use such content for promotional and operational purposes.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "7. Limitation of Liability",
    content: [
      "Samudraj is not liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services, including but not limited to allergic reactions, spiritual outcomes, or ritual outcomes.",
      "Our maximum liability in any event shall be limited to the amount paid by you for the specific order in dispute.",
      "We are not responsible for delays caused by courier partners, natural disasters, government actions, or other force majeure events.",
      "All products are for devotional/puja use only. Samudraj makes no representations about the spiritual or medicinal efficacy of any product.",
    ],
  },
  {
    icon: FileText,
    title: "8. User Conduct",
    content: [
      "You agree not to misuse our platform, submit false orders, engage in fraudulent activities, or attempt to circumvent our payment systems.",
      "Repeated COD order rejections or fraudulent return claims may result in account suspension and restriction from future purchases.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    ],
  },
  {
    icon: Globe,
    title: "9. Governing Law",
    content: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Maharashtra, India.",
      "In case of any dispute, we encourage customers to first contact our support team for an amicable resolution before pursuing legal action.",
      "These Terms constitute the entire agreement between you and Samudraj with respect to the use of our platform and services.",
    ],
  },
  {
    icon: Mail,
    title: "10. Contact Us",
    content: [
      "For any questions, grievances, or concerns regarding these Terms and Conditions:",
      "📧 Email: support@samudraj.in",
      "📞 Phone: +91-98765-43210 (Mon–Sat, 9AM–7PM)",
      "🏢 Address: Samudraj, Maharashtra, India",
      "We aim to respond to all queries within 2 business days.",
    ],
  },
];

export function TermsPage() {
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
            Legal
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Terms &amp;{" "}
            <span style={{ color: "oklch(0.88 0.18 82)" }}>Conditions</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Please read these terms carefully before using Samudraj. By placing
            an order, you agree to these terms.
          </p>
          <p className="font-body text-sm text-white/40 mt-3">
            Last updated: March 2026
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
            © {new Date().getFullYear()} Samudraj. All rights reserved. GSTIN:
            27AABCS1429B1ZZ
          </p>
        </div>
      </section>
    </div>
  );
}
