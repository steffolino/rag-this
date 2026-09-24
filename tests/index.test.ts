import { describe, expect, it } from "vitest";
import {
  createOpeningHoursRetriever,
  createRoutedRetriever,
} from "../src/index.js";

describe("public entry point", () => {
  it("exposes the factory functions consumers need", async () => {
    expect(typeof createOpeningHoursRetriever).toBe("function");
    expect(typeof createRoutedRetriever).toBe("function");

    const retriever = createOpeningHoursRetriever([
      { location: "TIB Conti-Campus", weekday: 1, opens: "09:00", closes: "20:00" },
    ]);
    const router = createRoutedRetriever([
      { matches: () => true, retriever },
    ]);

    const result = await router.retrieve({
      text: "Is TIB Conti-Campus open on Monday?",
      metadata: { location: "TIB Conti-Campus", weekday: 1 },
    });

    expect(result.evidence[0]?.content).toBe(
      "TIB Conti-Campus is open from 09:00 to 20:00.",
    );
  });
});
