import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Shop" },
  { to: "/schedule", label: "Daily Schedule" },
  { to: "/book-pandit", label: "Book a Pandit" },
  { to: "/my-orders", label: "My Orders" },
];

const SERVICES = [
  "Fresh Flowers & Haar",
  "Puja Essentials",
  "Ritual Books",
  "Occasion Packages",
  "Pandit Booking",
  "Prasad Booking",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.28 0.13 16))",
                }}
              >
                ॐ
              </div>
              <span className="font-display text-2xl font-bold text-white leading-none">
                Puja Samagri
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
            © {year} Puja Samagri. All rights reserved.
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
