# Contributing

This library is built strictly test-first. Before adding any code, ask:

> Which concrete failing test requires this code?

If the answer is "none", it doesn't get implemented — no speculative
features, no future-proofing, no extra abstractions.

## Workflow

1. Write a failing test first.
2. Run it and confirm it fails for the expected reason (missing
   module, wrong value — not a typo or setup bug).
3. Write the minimal production code needed to make it pass.
4. Run the full suite.
5. Only refactor once everything is green.
6. Don't implement anything beyond what the current test demands.

```bash
npm test         # vitest run
npm run typecheck
npm run build
```

All three must pass before a change is considered done.

## Conventions

- No `any`, anywhere.
- Keep dependencies minimal — this library intentionally has none at
  runtime, and the public API (`RetrievalQuery`, `Evidence`,
  `RetrievalResult`, `Retriever`) stays small and generic.
- No framework coupling: no LangChain, no Haystack, no vector DB, no
  database layer, no LLM SDK in core.
- A missing structured match returns `{ evidence: [] }` — it never
  throws. A retrieval miss must not be allowed to abort a larger
  pipeline.
- Sample/example data (see `examples/`) must stay synthetic and must
  never be presented as real, current data for any real-world
  location.

## Project structure

```text
src/
├─ index.ts                                  # public entry point
├─ types.ts                                  # generic Retriever contract
├─ create-routed-retriever.ts
└─ opening-hours/
   └─ create-opening-hours-retriever.ts

tests/        # one test file per feature/module
examples/     # runnable demo + synthetic sample dataset (not shipped as core API)
```

Only add new files/folders when a test or genuine code complexity
requires it.
