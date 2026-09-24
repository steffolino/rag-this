import { describe, expect, it } from "vitest";
import { createRoutedRetriever } from "../src/create-routed-retriever.js";
import { createOpeningHoursRetriever } from "../src/opening-hours/create-opening-hours-retriever.js";

describe("createRoutedRetriever", () => {
  it("forwards the query to the first matching route", async () => {
    const openingHoursRetriever = createOpeningHoursRetriever([
      {
        location: "TIB Conti-Campus",
        weekday: 1,
        opens: "09:00",
        closes: "20:00",
      },
    ]);

    const router = createRoutedRetriever([
      {
        matches: query => query.metadata?.["intent"] === "opening_hours",
        retriever: openingHoursRetriever,
      },
    ]);

    const result = await router.retrieve({
      text: "When is Conti open?",
      metadata: {
        intent: "opening_hours",
        location: "TIB Conti-Campus",
        weekday: 1,
      },
    });

    expect(result.evidence[0]?.content).toBe(
      "TIB Conti-Campus is open from 09:00 to 20:00.",
    );
  });

  it("returns no evidence when no route matches, without throwing", async () => {
    const router = createRoutedRetriever([
      {
        matches: query => query.metadata?.["intent"] === "opening_hours",
        retriever: createOpeningHoursRetriever([]),
      },
    ]);

    const result = await router.retrieve({
      text: "What's the weather like?",
      metadata: { intent: "weather" },
    });

    expect(result).toEqual({ evidence: [] });
  });
});
