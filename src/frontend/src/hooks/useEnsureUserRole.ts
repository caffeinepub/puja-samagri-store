import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

/**
 * Automatically calls ensureCallerIsUser() when an authenticated actor is available.
 * This registers the logged-in user as a #user role so cart/order calls work.
 */
export function useEnsureUserRole() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const hasEnsuredRef = useRef<string | null>(null);

  useEffect(() => {
    if (!identity || !actor || isFetching) return;

    const principalStr = identity.getPrincipal().toString();
    if (hasEnsuredRef.current === principalStr) return; // already done for this identity

    (async () => {
      try {
        await actor.ensureCallerIsUser();
        hasEnsuredRef.current = principalStr;
        // Invalidate cart and orders so they refetch with proper access
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      } catch {
        // Silently ignore — user may already be registered or have admin role
      }
    })();
  }, [actor, identity, isFetching, queryClient]);
}
