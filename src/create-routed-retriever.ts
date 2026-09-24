import type { Retriever, RetrievalQuery, RetrievalResult } from "./types.js";

export type Route = {
  matches(query: RetrievalQuery): boolean | Promise<boolean>;
  retriever: Retriever;
};

export function createRoutedRetriever(routes: Route[]): Retriever {
  return {
    async retrieve(query: RetrievalQuery): Promise<RetrievalResult> {
      for (const route of routes) {
        if (await route.matches(query)) {
          return route.retriever.retrieve(query);
        }
      }

      return { evidence: [] };
    },
  };
}
