import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const basepath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "") || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },

    // Use Vite's BASE_URL (trim trailing slash) so router and build stay in sync
    basepath,

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};