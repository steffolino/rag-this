# rag-this

A small, composable TypeScript library for structured retrieval —
built as a minimal, dependency-light building block for larger
retrieval/RAG pipelines, not as a RAG framework itself.

```text
Query
  ↓
Route.matches()
  ↓
Retriever.retrieve()
  ↓
Evidence[]
```

The library owns none of a larger pipeline — it just returns small,
swappable retriever components a bigger system can wire into merging,
reranking, context building, etc.

## Why

Most RAG tooling couples retrieval to a specific vector store, LLM SDK,
or orchestration framework. This library does none of that: it has no
database layer, no vector search, no LLM calls, and (almost) no
dependencies. It's meant to sit next to your BM25/vector retrievers as
a plain structured-data retriever, routed by simple predicates.

## Install

```bash
npm install github:steffolino/rag-this
```

## Quick start

```ts
import {
  createOpeningHoursRetriever,
  createRoutedRetriever,
  type OpeningHoursEntry,
} from "rag-this";

const entries: OpeningHoursEntry[] = [
  { location: "Main Library", weekday: 1, opens: "09:00", closes: "20:00" },
  { location: "Main Library", weekday: 0, opens: null, closes: null },
];

const openingHours = createOpeningHoursRetriever(entries, { language: "de" });

const router = createRoutedRetriever([
  {
    matches: query => query.metadata?.["intent"] === "opening_hours",
    retriever: openingHours,
  },
]);

const result = await router.retrieve({
  text: "Wann hat die Main Library montags geöffnet?",
  metadata: { intent: "opening_hours", location: "Main Library", weekday: 1 },
});

// result.evidence[0].content === "Main Library hat von 09:00 bis 20:00 Uhr geöffnet."
```

## API

The public surface is intentionally small and generic:

```ts
type RetrievalQuery = {
  text: string;
  metadata?: Record<string, unknown>;
};

type Evidence = {
  content: string;
  metadata?: Record<string, unknown>;
  source: { type: string; label?: string };
};

type RetrievalResult = {
  evidence: Evidence[];
};

interface Retriever {
  retrieve(query: RetrievalQuery): Promise<RetrievalResult>;
}
```

### `createOpeningHoursRetriever(entries, options?)`

Structured retriever over a flat table of opening-hours rows
(`{ location, weekday, opens, closes }`, `weekday` 0 = Sunday … 6 =
Saturday). Returns no evidence — never throws — when nothing matches.
`options.language` (`"en"` default, or `"de"`) controls the generated
`content` text.

### `createRoutedRetriever(routes)`

Implements `Retriever` itself. Forwards a query to the first route
whose `matches(query)` predicate returns `true`; returns
`{ evidence: [] }` (no throw) when no route matches.

```ts
type Route = {
  matches(query: RetrievalQuery): boolean | Promise<boolean>;
  retriever: Retriever;
};
```

## Example data

[`examples/opening-hours-sample-data.ts`](examples/opening-hours-sample-data.ts)
is a synthetic dataset shaped like a real opening-hours table (multiple
locations × all weekdays). **These are not real TIB opening hours** —
swap the array for your own data source; the retriever only cares that
it matches `OpeningHoursEntry`.

Run the JSON-output demo:

```bash
npm run demo
```

## Development

This project is built strictly test-first (red → green → refactor);
see [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.

```bash
npm test        # vitest
npm run typecheck
npm run build
```

## License

[MIT](LICENSE)
