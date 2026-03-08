import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartDrawerProvider } from "./context/CartContext";
import { useEnsureUserRole } from "./hooks/useEnsureUserRole";
import { AdminPage } from "./pages/AdminPage";
import { BookPanditPage } from "./pages/BookPanditPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { SchedulePage } from "./pages/SchedulePage";

// Root layout — also ensures logged-in users get #user role automatically
function RootLayout() {
  useEnsureUserRole();
  return (
    <CartDrawerProvider>
      <div className="min-h-screen flex flex-col bg-background">
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
