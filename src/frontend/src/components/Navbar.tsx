import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Loader2,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCartDrawer } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCart, useIsAdmin } from "../hooks/useQueries";

export function Navbar() {
  const { openCart } = useCartDrawer();
  const { data: cartItems = [] } = useCart();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", ocid: "nav.home.link" },
    { to: "/catalog", label: "Shop", ocid: "nav.shop.link" },
    { to: "/schedule", label: "Schedule", ocid: "nav.schedule.link" },
    { to: "/book-pandit", label: "Book Pandit", ocid: "nav.bookpandit.link" },
    { to: "/prasad", label: "Prasad", ocid: "nav.prasad.link" },
    { to: "/my-dashboard", label: "My Dashboard", ocid: "nav.dashboard.link" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="announcement-bar overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.28 0.13 16) 0%, oklch(0.42 0.14 38) 50%, oklch(0.28 0.13 16) 100%)",
            }}
          >
            <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
              <p className="font-body text-xs sm:text-sm text-white font-medium tracking-wide text-center pr-8">
                🪔 Free delivery on orders above ₹299 · Fresh flowers sourced
                daily from certified farms 🌸
              </p>
              <button
                type="button"
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                aria-label="Dismiss announcement"
                data-ocid="nav.announcement.close_button"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main header */}
      <header
        className={`w-full backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b-2 border-amber-500/30"
            : "border-b border-white/10"
        }`}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 16) 0%, oklch(0.30 0.12 22) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
              data-ocid="nav.home.link"
            >
              <img
                src="/assets/generated/shankh-logo-transparent.dim_200x200.png"
                alt="Samudraj Shankh Logo"
                className="w-12 h-12 object-contain flex-shrink-0"
              />
              <span
                className="font-display text-2xl font-bold leading-none"
                style={{ color: "oklch(0.88 0.18 82)" }}
              >
                Samudraj
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 font-body text-sm font-medium text-white/80 hover:text-amber-300 transition-all relative group"
                  data-ocid={link.ocid}
                  activeProps={{ className: "text-amber-300 font-semibold" }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 font-body text-sm font-medium text-amber-300 hover:text-amber-200 transition-all flex items-center gap-1.5 relative group"
                  data-ocid="nav.admin.link"
                  activeProps={{ className: "font-semibold" }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </Link>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`relative text-white/80 hover:bg-amber-500/20 hover:text-amber-300 transition-all ${cartCount > 0 ? "animate-pulse-glow" : ""}`}
                onClick={openCart}
                data-ocid="nav.cart.button"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-saffron text-white text-xs rounded-full border-2 border-card">
                        {cartCount > 9 ? "9+" : cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Auth Button */}
              {identity ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-body text-sm text-white/70 hover:text-amber-300 hover:bg-amber-500/10"
                    onClick={() => navigate({ to: "/my-dashboard" })}
                  >
                    <User className="w-4 h-4 mr-1" />
                    Account
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-body text-sm border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 hover:border-amber-400/60 transition-all bg-transparent"
                    onClick={() => clear()}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        className="hidden sm:flex font-body text-sm font-semibold text-white border-0 px-5 transition-all duration-200 hover:scale-[1.03] hover:shadow-warm active:scale-[0.97]"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.42 0.12 22))",
                        }}
                        onClick={() => login()}
                        disabled={isLoggingIn}
                        aria-label="Opens Internet Identity in a new tab"
                        data-ocid="nav.login.button"
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                            Connecting…
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-1" />
                            Login
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="font-body text-xs max-w-[180px] text-center"
                    >
                      Opens Internet Identity in a new tab
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/80 hover:bg-amber-500/20 hover:text-amber-300"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-ocid="nav.mobile_menu.toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.25 0.11 16) 0%, oklch(0.20 0.09 16) 100%)",
              }}
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-3 rounded-lg font-body text-sm font-medium text-white/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
                    data-ocid={link.ocid}
                    activeProps={{
                      className: "text-amber-300 bg-amber-500/10 font-semibold",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-3 rounded-lg font-body text-sm font-medium text-amber-300 hover:bg-amber-500/10 transition-all flex items-center gap-2"
                    data-ocid="nav.admin.link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <div className="pt-2 border-t border-white/10 mt-1">
                  {identity ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 bg-transparent font-body"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Logout
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full font-body text-sm font-semibold text-white border-0 transition-all duration-200"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.22 45), oklch(0.42 0.12 22))",
                      }}
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      disabled={isLoggingIn}
                      aria-label="Opens Internet Identity in a new tab"
                    >
                      {isLoggingIn ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                          Connecting…
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-1" />
                          Login
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
