import { describe, expect, it } from "vitest";
import { createOpeningHoursRetriever } from "../src/opening-hours/create-opening-hours-retriever.js";
import { sampleOpeningHours } from "../examples/opening-hours-sample-data.js";

describe("sampleOpeningHours fixture", () => {
  it("works as a drop-in dataset for the opening-hours retriever", async () => {
    const retriever = createOpeningHoursRetriever(sampleOpeningHours);

    const openResult = await retriever.retrieve({
      text: "Is TIB Sühlkamp open on Wednesday?",
      metadata: { location: "TIB Sühlkamp", weekday: 3 },
    });
    expect(openResult.evidence[0]?.content).toBe(
      "TIB Sühlkamp is open from 09:00 to 20:00.",
    );

    const closedResult = await retriever.retrieve({
      text: "Is TIB Sühlkamp open on Sunday?",
      metadata: { location: "TIB Sühlkamp", weekday: 0 },
    });
    expect(closedResult.evidence[0]?.content).toBe(
      "TIB Sühlkamp is closed.",
    );
  });
});
