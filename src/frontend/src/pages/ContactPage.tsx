import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "42, Shri Niwas, Goregaon East, Mumbai — 400063, Maharashtra, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-98765-43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@samudraj.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat: 8AM – 8PM  |  Sun: 9AM – 5PM",
  },
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 800);
  }

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
            Reach Out
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Contact <span style={{ color: "oklch(0.88 0.18 82)" }}>Us</span>
          </h1>
          <p className="font-body text-lg text-white/70 leading-relaxed">
            Have a question, an order concern, or need help booking a pandit?
            We're here to help — reach us any day of the week.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl p-8"
            style={{
              background: "oklch(0.14 0.06 16 / 0.85)",
              border: "1px solid oklch(0.68 0.22 45 / 0.2)",
            }}
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    className="font-accent text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  >
                    Name *
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="bg-white/5 border-amber-500/20 text-white placeholder:text-white/30 focus:border-amber-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="font-accent text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  >
                    Email *
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="bg-white/5 border-amber-500/20 text-white placeholder:text-white/30 focus:border-amber-500/50"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  className="font-accent text-xs uppercase tracking-wider"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                >
                  Phone (optional)
                </Label>
                <Input
                  data-ocid="contact.input"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+91-XXXXX-XXXXX"
                  className="bg-white/5 border-amber-500/20 text-white placeholder:text-white/30 focus:border-amber-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="font-accent text-xs uppercase tracking-wider"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                >
                  Subject *
                </Label>
                <Select
                  required
                  value={form.subject}
                  onValueChange={(v) => setForm((p) => ({ ...p, subject: v }))}
                >
                  <SelectTrigger
                    data-ocid="contact.select"
                    className="bg-white/5 border-amber-500/20 text-white focus:border-amber-500/50"
                  >
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="order">Order Issue</SelectItem>
                    <SelectItem value="pandit">Pandit Booking</SelectItem>
                    <SelectItem value="prasad">Prasad Booking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  className="font-accent text-xs uppercase tracking-wider"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                >
                  Message *
                </Label>
                <Textarea
                  data-ocid="contact.textarea"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us how we can help..."
                  className="bg-white/5 border-amber-500/20 text-white placeholder:text-white/30 focus:border-amber-500/50 resize-none"
                />
              </div>
              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={submitting || !form.subject}
                className="w-full font-accent font-semibold text-white tracking-wider h-11"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.42 0.12 22))",
                }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            {CONTACT_INFO.map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-5 flex gap-4"
                style={{
                  background: "oklch(0.14 0.06 16 / 0.85)",
                  border: "1px solid oklch(0.68 0.22 45 / 0.2)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.68 0.22 45 / 0.15)" }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-accent text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.88 0.18 82)" }}
                  >
                    {item.label}
                  </p>
                  <p className="font-body text-sm text-white/70 leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
