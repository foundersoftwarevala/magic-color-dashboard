import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Warm the route as soon as the pointer lands on a link/button so module
    // navigation feels instant instead of waiting on the click.
    defaultPreload: "intent",
    defaultPreloadDelay: 30,
    // Keep the outgoing screen for a beat instead of flashing a blank pending
    // state on fast navigations.
    defaultPendingMs: 150,
    defaultPendingMinMs: 200,
  });

  return router;
};
