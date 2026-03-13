import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CartItem,
  Order,
  OrderStatus,
  PanditAvailability,
  PrasadOrder,
  PrasadOrderStatus,
  Product,
  ProductCategory,
  Review,
} from "../backend.d";
import { SEED_PRODUCTS } from "../data/seedProducts";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

// ==================== PRODUCTS ====================

export function useAllProducts() {
  const { actor } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", !!actor],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS;
      try {
        const products = await actor.getAllProducts();
        if (products.length === 0) return SEED_PRODUCTS;
        return products;
      } catch {
        return SEED_PRODUCTS;
      }
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(category: ProductCategory) {
  const { actor } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category, !!actor],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS.filter((p) => p.category === category);
      try {
        const products = await actor.getProductsByCategory(category);
        if (products.length === 0)
          return SEED_PRODUCTS.filter((p) => p.category === category);
        return products;
      } catch {
        return SEED_PRODUCTS.filter((p) => p.category === category);
      }
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== CART ====================

export function useCart() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getCart();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useAddToCart() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!identity) throw new Error("Not authenticated");

      // Wait for actor to be ready with the authenticated identity (up to 8s)
      let resolvedActor = actor;
      if (!resolvedActor || actorFetching) {
        let waited = 0;
        while (waited < 8000) {
          await new Promise((r) => setTimeout(r, 300));
          waited += 300;
          // Re-read from the query cache
          const cached = queryClient.getQueryData<typeof actor>([
            "actor",
            identity.getPrincipal().toString(),
          ]);
          if (cached) {
            resolvedActor = cached;
            break;
          }
        }
      }

      if (!resolvedActor) throw new Error("Actor not ready, please try again");

      // Ensure the caller has the #user role before adding to cart.
      // This is critical: if ensureCallerIsUser throws, the user is anonymous
      // (should not happen here) or the call genuinely failed.
      await resolvedActor.ensureCallerIsUser();

      await resolvedActor.addToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.removeFromCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      await actor.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ==================== ORDERS ====================

export function usePlaceOrder() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      address,
      phone,
    }: {
      customerName: string;
      address: string;
      phone: string;
    }) => {
      if (!identity) throw new Error("Not authenticated");
      if (!actor) throw new Error("Not authenticated");
      try {
        await actor.ensureCallerIsUser();
      } catch {
        // Silently ignore — user may already be registered or have admin role
      }
      await actor.placeOrder(customerName, address, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyOrders();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsAdmin();
  return useQuery<Order[]>({
    queryKey: ["orders", "all"],
    queryFn: async () => {
      if (!actor || !isAdmin) return [];
      try {
        return await actor.getAllOrders();
      } catch {
        return [];
      }
    },
    enabled: !isFetching && !!isAdmin,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// ==================== PANDIT AVAILABILITY ====================

export function usePanditAvailabilities() {
  const { actor, isFetching } = useActor();
  return useQuery<PanditAvailability[]>({
    queryKey: ["panditAvailabilities"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getPanditAvailabilities();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSetPanditAvailability() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      panditId,
      available,
    }: { panditId: string; available: boolean }) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.setPanditAvailability(panditId, available);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["panditAvailabilities"] });
    },
  });
}

// ==================== REVIEWS ====================

export function useProductReviews(productId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews", productId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getProductReviews(productId);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      rating,
      comment,
    }: { productId: bigint; rating: bigint; comment: string }) => {
      if (!identity) throw new Error("Not authenticated");
      if (!actor) throw new Error("Actor not ready");
      try {
        await actor.ensureCallerIsUser();
      } catch {
        // Silently ignore — user may already be registered or have admin role
      }
      await actor.addReview(productId, rating, comment);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId.toString()],
      });
    },
  });
}

export function useUpdateProductStock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      product,
      inStock,
    }: { product: Product; inStock: boolean }) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updateProduct(
        product.id,
        product.name,
        product.category,
        product.description,
        product.price,
        product.unit,
        inStock,
        product.occasionTag ?? null,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ==================== PRASAD ORDERS (ADMIN) ====================

export function useAllPrasadOrders() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsAdmin();
  return useQuery<PrasadOrder[]>({
    queryKey: ["prasadOrders", "all"],
    queryFn: async () => {
      if (!actor || !isAdmin) return [];
      try {
        return await actor.getAllPrasadOrders();
      } catch {
        return [];
      }
    },
    enabled: !isFetching && !!isAdmin,
  });
}

export function useUpdatePrasadOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: bigint; status: PrasadOrderStatus }) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updatePrasadOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prasadOrders"] });
    },
  });
}
