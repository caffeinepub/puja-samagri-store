import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { SplashScreen } from "./components/SplashScreen";
import { CartDrawerProvider } from "./context/CartContext";
import { useEnsureUserRole } from "./hooks/useEnsureUserRole";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { BookPanditPage } from "./pages/BookPanditPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { MyDashboardPage } from "./pages/MyDashboardPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { PrasadBookingPage } from "./pages/PrasadBookingPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ReturnPolicyPage } from "./pages/ReturnPolicyPage";
import { SchedulePage } from "./pages/SchedulePage";
import { ShippingPolicyPage } from "./pages/ShippingPolicyPage";

// Floating "Logging In" status banner
function LoginStatusBanner() {
  const { isLoggingIn, isLoginSuccess, isLoginError } = useInternetIdentity();
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isLoggingIn) {
      toastIdRef.current = toast.loading(
        "Opening Internet Identity\u2026 Complete login in the new tab",
        {
          duration: Number.POSITIVE_INFINITY,
          description: "Return to this page after completing login.",
        },
      );
    } else {
      if (toastIdRef.current !== null) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
      if (isLoginSuccess) {
        toast.success("Welcome back! You're now logged in.", {
          duration: 3000,
        });
      }
      if (isLoginError) {
        toast.error("Login was cancelled or failed. Please try again.", {
          duration: 4000,
        });
      }
    }
  }, [isLoggingIn, isLoginSuccess, isLoginError]);

  return (
    <AnimatePresence>
      {isLoggingIn && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
          aria-live="polite"
          aria-label="Login in progress"
        >
          <div
            className="w-full text-center py-2 px-4 font-body text-xs font-medium text-white"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.68 0.22 45) 0%, oklch(0.42 0.12 22) 50%, oklch(0.52 0.21 38) 100%)",
            }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              Opening Internet Identity in a new tab \u2014 please complete
              login there
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scroll to top whenever the route pathname changes
function RouteScrollReset() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intended trigger
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Root layout — also ensures logged-in users get #user role automatically
function RootLayout() {
  useEnsureUserRole();
  return (
    <CartDrawerProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <LoginStatusBanner />
        <RouteScrollReset />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <ScrollToTop />
        <Toaster richColors position="top-right" />
      </div>
    </CartDrawerProvider>
  );
}

// Root layout
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: CatalogPage,
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
  }),
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schedule",
  component: SchedulePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmationPage,
});

const myOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-orders",
  component: MyOrdersPage,
});

const myDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-dashboard",
  component: MyDashboardPage,
});

const bookPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-pandit",
  component: BookPanditPage,
});

const prasadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prasad",
  component: PrasadBookingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const returnPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/return-policy",
  component: ReturnPolicyPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const shippingPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping-policy",
  component: ShippingPolicyPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  catalogRoute,
  scheduleRoute,
  checkoutRoute,
  orderConfirmationRoute,
  myOrdersRoute,
  myDashboardRoute,
  bookPanditRoute,
  prasadRoute,
  adminRoute,
  productDetailRoute,
  aboutRoute,
  contactRoute,
  returnPolicyRoute,
  privacyPolicyRoute,
  shippingPolicyRoute,
]);

const router = createRouter({ routeTree, scrollRestoration: false });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <RouterProvider router={router} />
    </>
  );
}
