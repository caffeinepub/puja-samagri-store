import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const FAQ_SECTIONS = [
  {
    category: "🚚 Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 4–7 business days across India. Metro cities like Mumbai, Delhi, Bangalore, Pune, and Chennai typically receive orders in 2–4 days. Remote pin codes may take up to 7–10 days.",
      },
      {
        q: "Which courier partners do you use?",
        a: "We ship through trusted courier partners including BlueDart, Delhivery, and Ecom Express. Once your order is dispatched, you'll receive a tracking ID via WhatsApp/SMS to monitor your package in real time.",
      },
      {
        q: "What are the COD (Cash on Delivery) charges?",
        a: "A handling fee of ₹40 is added for COD orders to cover payment collection and logistics costs. This is clearly shown at checkout before you confirm your order.",
      },
      {
        q: "Is there free shipping?",
        a: "Yes! Orders above ₹499 qualify for free shipping. For orders below ₹499, a flat shipping charge of ₹49 applies. Free shipping is automatically applied at checkout when your cart value exceeds ₹499.",
      },
    ],
  },
  {
    category: "↩️ Returns & Refunds",
    items: [
      {
        q: "What is your return window?",
        a: "We offer a 7-day return window from the date of delivery for eligible non-perishable products. Perishable items such as fresh flowers, marigolds, prasad, and seasonal offerings are not eligible for return.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact us within 7 days at support@samudraj.in or WhatsApp +91-98765-43210 with your Order ID, item name, reason for return, and a photo. Once approved, we'll arrange a free reverse pickup from your address.",
      },
      {
        q: "What are the conditions for a valid return?",
        a: "Items must be unused, in original packaging with all tags intact, and must not fall under the non-returnable category (fresh flowers, prasad, customized kits). Products showing signs of use or damage by the customer are not eligible.",
      },
      {
        q: "How long does a refund take?",
        a: "Once we receive and inspect your returned item, refunds are processed within 1–2 business days. The amount is credited to your original payment method in 3–5 business days (UPI is faster, bank transfers may take up to 7 days).",
      },
    ],
  },
  {
    category: "💳 Payment Methods",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major payment methods: UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, Rupay), Net Banking, Wallets, and Cash on Delivery (COD). Payments are processed securely through Razorpay.",
      },
      {
        q: "Is my payment information safe?",
        a: "Absolutely. All transactions are secured by SSL encryption (256-bit). We never store your card details on our servers. Payments are processed by Razorpay, a PCI-DSS Level 1 compliant payment gateway — the highest security standard.",
      },
      {
        q: "Can I pay Cash on Delivery (COD)?",
        a: "Yes! COD is available for most pin codes in India. A handling fee of ₹40 is added for COD orders. Please have the exact amount ready for our delivery partner. COD is not available for orders above ₹5,000.",
      },
      {
        q: "What should I do if my payment fails?",
        a: "If your payment is deducted but the order is not placed, the amount will be automatically refunded to your source account within 5–7 business days. Contact us at support@samudraj.in with your transaction details if you need assistance.",
      },
    ],
  },
  {
    category: "🌸 Product Care",
    items: [
      {
        q: "How do I keep fresh flowers fresh longer?",
        a: "Trim the stems at a 45-degree angle and place flowers in clean, cool water. Change the water daily. Keep them away from direct sunlight and air conditioning vents. Our flowers are sourced fresh every morning and typically last 2–3 days with proper care.",
      },
      {
        q: "How should I store puja items like agarbatti and camphor?",
        a: "Store agarbattis and dhoop in a cool, dry place away from moisture. Camphor should be sealed in an airtight container as it evaporates quickly. Kumkum, chandan, and rice should be stored in dry, covered containers away from humidity.",
      },
      {
        q: "How do I care for brass or metal idols?",
        a: "Clean brass idols regularly with a soft cloth. For deeper cleaning, use a paste of tamarind or lemon juice with salt, gently rub, and rinse with water. Dry thoroughly to prevent tarnishing. Avoid harsh chemical cleaners that can damage the finish.",
      },
      {
        q: "What is the shelf life of prasad received from temples?",
        a: "Temple prasad (like laddoos, peda, churma) typically has a shelf life of 5–15 days depending on the temple and preparation method. Consume within the period mentioned on the packaging. Store in a cool, dry place.",
      },
    ],
  },
  {
    category: "📦 Orders & Cancellations",
    items: [
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled free of charge before dispatch (usually within 1–2 hours of placing). Once dispatched, cancellation is not possible, but you may initiate a return upon delivery for eligible items. Contact us immediately at +91-98765-43210 for cancellations.",
      },
      {
        q: "Can I modify my order after placing it?",
        a: "Order modifications (address changes, item changes) are possible only before dispatch. Contact us within 30 minutes of placing your order. After dispatch, no modifications are possible. You may place a new order for any additional items.",
      },
      {
        q: "Will I receive an invoice for my order?",
        a: "Yes, a digital invoice is generated for every order and sent to your registered email/WhatsApp after successful payment. The invoice includes order details, GST breakdown, and delivery information. You can also access your invoice from My Dashboard.",
      },
      {
        q: "What if I receive a wrong or damaged item?",
        a: "We sincerely apologize for such instances. Contact us within 48 hours of delivery with photos of the wrong/damaged item. We'll arrange an immediate replacement or refund at no cost to you. Your satisfaction is our top priority.",
      },
    ],
  },
];

export function FAQPage() {
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "oklch(0.68 0.22 45 / 0.2)" }}
          >
            <HelpCircle
              className="w-8 h-8"
              style={{ color: "oklch(0.88 0.18 82)" }}
            />
          </div>
          <span
            className="font-accent text-xs uppercase tracking-[0.2em] mb-4 block"
            style={{ color: "oklch(0.88 0.18 82)" }}
          >
            Help Center
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Frequently Asked{" "}
            <span style={{ color: "oklch(0.88 0.18 82)" }}>Questions</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Everything you need to know about ordering, shipping, returns, and
            caring for your puja items.
          </p>
        </motion.div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-8">
          {FAQ_SECTIONS.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.07 }}
            >
              <h2
                className="font-display text-xl font-bold text-white mb-4 pb-2"
                style={{ borderBottom: "2px solid oklch(0.68 0.22 45 / 0.4)" }}
              >
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((item, ii) => (
                  <AccordionItem
                    key={item.q}
                    value={`${si}-${ii}`}
                    className="rounded-xl overflow-hidden border-0"
                    style={{
                      background: "oklch(0.14 0.06 16 / 0.85)",
                      border: "1px solid oklch(0.68 0.22 45 / 0.2)",
                    }}
                    data-ocid={`faq.item.${si * 4 + ii + 1}`}
                  >
                    <AccordionTrigger
                      className="px-5 py-4 font-body font-semibold text-white text-left hover:no-underline"
                      style={{ color: "white" }}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-5 pb-4 font-body text-sm leading-relaxed"
                      style={{ color: "oklch(1 0 0 / 0.68)" }}
                    >
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {/* Still need help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-8 text-center"
            style={{
              background: "oklch(0.68 0.22 45 / 0.12)",
              border: "1px solid oklch(0.68 0.22 45 / 0.3)",
            }}
          >
            <p className="font-display text-xl font-bold text-white mb-2">
              Still have questions?
            </p>
            <p className="font-body text-sm text-white/60 mb-5">
              Our support team is available Mon–Sat, 9 AM to 7 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@samudraj.in"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white"
                style={{ background: "oklch(0.42 0.15 22)" }}
              >
                📧 Email Us
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%20Samudraj%20support%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white"
                style={{ background: "oklch(0.52 0.18 150)" }}
              >
                💬 WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
