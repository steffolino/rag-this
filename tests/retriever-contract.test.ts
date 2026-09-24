import { describe, expect, it } from "vitest";
import type { Retriever } from "../src/types.js";
import { createOpeningHoursRetriever } from "../src/opening-hours/create-opening-hours-retriever.js";

describe("Retriever contract", () => {
  it("is satisfied by the opening-hours retriever", async () => {
    const retriever: Retriever = createOpeningHoursRetriever([
      {
        location: "TIB Conti-Campus",
        weekday: 1,
        opens: "09:00",
        closes: "20:00",
      },
    ]);

    const result = await retriever.retrieve({
      text: "Is the TIB Conti-Campus open on Monday?",
      metadata: {
        location: "TIB Conti-Campus",
        weekday: 1,
      },
    });

    expect(result.evidence[0]?.content).toBe(
      "TIB Conti-Campus is open from 09:00 to 20:00.",
    );
  });
});
