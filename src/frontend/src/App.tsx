import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartDrawerProvider } from "./context/CartContext";
import { useEnsureUserRole } from "./hooks/useEnsureUserRole";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { AdminPage } from "./pages/AdminPage";
import { BookPanditPage } from "./pages/BookPanditPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SchedulePage } from "./pages/SchedulePage";

// Floating "Logging In" status banner
function LoginStatusBanner() {
  const { isLoggingIn, isLoginSuccess, isLoginError } = useInternetIdentity();
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isLoggingIn) {
      toastIdRef.current = toast.loading(
        "Opening Internet Identity… Complete login in the new tab",
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
              Opening Internet Identity in a new tab — please complete login
              there
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Root layout — also ensures logged-in users get #user role automatically
function RootLayout() {
  useEnsureUserRole();
  return (
    <CartDrawerProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <LoginStatusBanner />
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

const bookPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-pandit",
  component: BookPanditPage,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  catalogRoute,
  scheduleRoute,
  checkoutRoute,
  orderConfirmationRoute,
  myOrdersRoute,
  bookPanditRoute,
  adminRoute,
  productDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
