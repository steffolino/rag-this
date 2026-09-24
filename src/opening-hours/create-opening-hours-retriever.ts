import type { Retriever, RetrievalQuery, RetrievalResult } from "../types.js";

export type OpeningHoursEntry = {
  location: string;
  weekday: number;
  opens: string | null;
  closes: string | null;
};

export type OpeningHoursLanguage = "en" | "de";

export type OpeningHoursRetrieverOptions = {
  language?: OpeningHoursLanguage;
};

function describeHours(
  entry: OpeningHoursEntry,
  language: OpeningHoursLanguage,
): string {
  if (entry.opens === null || entry.closes === null) {
    return language === "de"
      ? `${entry.location} ist geschlossen.`
      : `${entry.location} is closed.`;
  }
  return language === "de"
    ? `${entry.location} hat von ${entry.opens} bis ${entry.closes} Uhr geöffnet.`
    : `${entry.location} is open from ${entry.opens} to ${entry.closes}.`;
}

function matches(entry: OpeningHoursEntry, query: RetrievalQuery): boolean {
  return (
    entry.location === query.metadata?.["location"] &&
    entry.weekday === query.metadata?.["weekday"]
  );
}

export function createOpeningHoursRetriever(
  entries: OpeningHoursEntry[],
  options: OpeningHoursRetrieverOptions = {},
): Retriever {
  const language = options.language ?? "en";

  return {
    async retrieve(query: RetrievalQuery): Promise<RetrievalResult> {
      const match = entries.find(entry => matches(entry, query));

      if (!match) {
        return { evidence: [] };
      }

      return {
        evidence: [
          {
            content: describeHours(match, language),
            metadata: {
              location: match.location,
              weekday: match.weekday,
              opens: match.opens,
              closes: match.closes,
            },
            source: {
              type: "structured",
              label: "opening-hours",
            },
          },
        ],
      };
    },
  };
}
