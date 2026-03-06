import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCartDrawer } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCart, useIsAdmin } from "../hooks/useQueries";

export function Navbar() {
  const { openCart } = useCartDrawer();
  const { data: cartItems = [] } = useCart();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const navLinks = [
    { to: "/", label: "Home", ocid: "nav.home.link" },
    { to: "/catalog", label: "Shop", ocid: "nav.shop.link" },
    { to: "/schedule", label: "Schedule", ocid: "nav.schedule.link" },
    { to: "/book-pandit", label: "Book Pandit", ocid: "nav.bookpandit.link" },
    { to: "/my-orders", label: "My Orders", ocid: "nav.orders.link" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-foreground hover:text-saffron transition-colors"
          >
            <span className="text-2xl">🌸</span>
            <span>Puja Samagri</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-md font-body text-sm font-medium text-foreground/80 hover:text-saffron hover:bg-saffron/5 transition-all"
                data-ocid={link.ocid}
                activeProps={{ className: "text-saffron bg-saffron/5" }}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-md font-body text-sm font-medium text-maroon hover:text-maroon hover:bg-maroon/5 transition-all flex items-center gap-1.5"
                data-ocid="nav.admin.link"
                activeProps={{ className: "text-maroon bg-maroon/5" }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-saffron/10 hover:text-saffron"
              onClick={openCart}
              data-ocid="nav.cart.button"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-saffron text-white text-xs rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Auth Button */}
            {identity ? (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-body text-sm text-muted-foreground hover:text-saffron"
                  onClick={() => navigate({ to: "/my-orders" })}
                >
                  <User className="w-4 h-4 mr-1" />
                  Account
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-body text-sm border-maroon text-maroon hover:bg-maroon hover:text-white"
                  onClick={() => clear()}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="hidden sm:flex bg-saffron hover:bg-saffron-dark text-white font-body"
                onClick={() => login()}
                disabled={isLoggingIn}
              >
                <LogIn className="w-4 h-4 mr-1" />
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-saffron/10"
              onClick={() => setMobileOpen(!mobileOpen)}
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
            className="md:hidden border-t border-border bg-card"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-md font-body text-sm font-medium text-foreground/80 hover:text-saffron hover:bg-saffron/5 transition-all"
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-3 rounded-md font-body text-sm font-medium text-maroon hover:text-maroon hover:bg-maroon/5 transition-all flex items-center gap-2"
                  data-ocid="nav.admin.link"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <div className="pt-2 border-t border-border mt-1">
                {identity ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-maroon text-maroon hover:bg-maroon hover:text-white font-body"
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
                    variant="default"
                    size="sm"
                    className="w-full bg-saffron hover:bg-saffron-dark text-white font-body"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
