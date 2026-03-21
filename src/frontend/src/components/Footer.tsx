import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Shop" },
  { to: "/schedule", label: "Daily Schedule" },
  { to: "/book-pandit", label: "Book a Pandit" },
  { to: "/prasad", label: "Prasad Booking" },
  { to: "/my-dashboard", label: "My Dashboard" },
];

const SERVICES = [
  "Fresh Flowers & Haar",
  "Puja Essentials",
  "Ritual Books",
  "Occasion Packages",
  "Pandit Booking",
  "Prasad Booking",
];

const POLICY_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/return-policy", label: "Return & Refund Policy" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/shipping-policy", label: "Shipping Policy" },
  { to: "/faq", label: "FAQ" },
  { to: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="mt-auto maroon-section"
      style={{ borderTop: "4px solid oklch(0.68 0.22 45)" }}
    >
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/assets/generated/shankh-logo-transparent.dim_200x200.png"
                alt="Samudraj Shankh Logo"
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <span className="font-display text-2xl font-bold text-white leading-none">
                Samudraj
              </span>
            </div>
            <p className="font-body text-sm text-white/60 mt-2 max-w-[220px] leading-relaxed">
              Pure offerings for your daily puja
            </p>
            <p className="font-body text-xs text-white/45 mt-3 max-w-[220px] leading-relaxed">
              Handpicked flowers, temple-grade essentials and ritual kits
              delivered fresh to your doorstep with devotion.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              <span className="font-body text-xs text-green-400">
                Delivering 6 AM – 8 PM daily
              </span>
            </div>
            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/samudraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  border: "1px solid oklch(1 0 0 / 0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.88 0.18 82)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(1 0 0 / 0.15)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com/samudraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  border: "1px solid oklch(1 0 0 / 0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.88 0.18 82)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(1 0 0 / 0.15)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://youtube.com/@samudraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  border: "1px solid oklch(1 0 0 / 0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.88 0.18 82)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(1 0 0 / 0.15)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  style={{ color: "oklch(0.88 0.18 82)" }}
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon
                    points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                    fill="white"
                  />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4
              className="font-accent font-bold text-xs uppercase tracking-wider mb-5"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm block transition-colors duration-200"
                    style={{ color: "oklch(1 0 0 / 0.6)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.88 0.18 82)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(1 0 0 / 0.6)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4
              className="font-accent font-bold text-xs uppercase tracking-wider mb-5"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(1 0 0 / 0.6)" }}
                  >
                    {service}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Info & Policies */}
          <div>
            <h4
              className="font-accent font-bold text-xs uppercase tracking-wider mb-5"
              style={{ color: "oklch(0.88 0.18 82)" }}
            >
              Info &amp; Policies
            </h4>
            <ul className="space-y-2.5">
              {POLICY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm block transition-colors duration-200"
                    style={{ color: "oklch(1 0 0 / 0.6)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.88 0.18 82)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(1 0 0 / 0.6)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
        >
          <p
            className="font-body text-xs"
            style={{ color: "oklch(1 0 0 / 0.38)" }}
          >
            © {year} Samudraj. All rights reserved.
          </p>
          <p
            className="font-body text-xs flex items-center gap-1.5"
            style={{ color: "oklch(1 0 0 / 0.38)" }}
          >
            Built with{" "}
            <Heart className="w-3 h-3 text-red-400 fill-red-400 flex-shrink-0" />{" "}
            using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.84 0.16 84 / 0.8)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.88 0.18 82)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.84 0.16 84 / 0.8)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
