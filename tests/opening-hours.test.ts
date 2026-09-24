import { describe, expect, it } from "vitest";
import { createOpeningHoursRetriever } from "../src/opening-hours/create-opening-hours-retriever.js";

describe("createOpeningHoursRetriever", () => {
  it("finds a matching location and weekday", async () => {
    const retriever = createOpeningHoursRetriever([
      {
        location: "TIB Conti-Campus",
        weekday: 6,
        opens: null,
        closes: null,
      },
    ]);

    const result = await retriever.retrieve({
      text: "Is the TIB Conti-Campus open on Saturday?",
      metadata: {
        location: "TIB Conti-Campus",
        weekday: 6,
      },
    });

    expect(result).toEqual({
      evidence: [
        {
          content: "TIB Conti-Campus is closed.",
          metadata: {
            location: "TIB Conti-Campus",
            weekday: 6,
            opens: null,
            closes: null,
          },
          source: {
            type: "structured",
            label: "opening-hours",
          },
        },
      ],
    });
  });

  it("returns opening and closing time when the location is open", async () => {
    const retriever = createOpeningHoursRetriever([
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

  it("returns no evidence when no entry matches, without throwing", async () => {
    const retriever = createOpeningHoursRetriever([
      {
        location: "TIB Conti-Campus",
        weekday: 1,
        opens: "09:00",
        closes: "20:00",
      },
    ]);

    const result = await retriever.retrieve({
      text: "Is the TIB Sühlkamp open on Sunday?",
      metadata: {
        location: "TIB Sühlkamp",
        weekday: 0,
      },
    });

    expect(result).toEqual({ evidence: [] });
  });

  describe("German content", () => {
    it("describes a closed location in German", async () => {
      const retriever = createOpeningHoursRetriever(
        [
          {
            location: "TIB Conti-Campus",
            weekday: 6,
            opens: null,
            closes: null,
          },
        ],
        { language: "de" },
      );

      const result = await retriever.retrieve({
        text: "Hat die TIB Conti-Campus samstags geöffnet?",
        metadata: {
          location: "TIB Conti-Campus",
          weekday: 6,
        },
      });

      expect(result.evidence[0]?.content).toBe(
        "TIB Conti-Campus ist geschlossen.",
      );
    });

    it("describes opening and closing time in German", async () => {
      const retriever = createOpeningHoursRetriever(
        [
          {
            location: "TIB Conti-Campus",
            weekday: 1,
            opens: "09:00",
            closes: "20:00",
          },
        ],
        { language: "de" },
      );

      const result = await retriever.retrieve({
        text: "Wann hat die TIB Conti-Campus montags geöffnet?",
        metadata: {
          location: "TIB Conti-Campus",
          weekday: 1,
        },
      });

      expect(result.evidence[0]?.content).toBe(
        "TIB Conti-Campus hat von 09:00 bis 20:00 Uhr geöffnet.",
      );
    });
  });
});
