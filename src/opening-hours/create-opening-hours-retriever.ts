import type { Retriever, RetrievalQuery, RetrievalResult } from "../types.js";

export type OpeningHoursEntry = {
  location: string;
  weekday: number;
  opens: string | null;
  closes: string | null;
  /** ISO date ("YYYY-MM-DD"). When set, this entry overrides the
   * recurring weekday rule for that exact calendar date only. */
  date?: string;
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
    entry.date === undefined &&
    entry.location === query.metadata?.["location"] &&
    entry.weekday === query.metadata?.["weekday"]
  );
}

function weekdayFromDate(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

function findByDate(
  entries: OpeningHoursEntry[],
  location: unknown,
  date: string,
): OpeningHoursEntry | undefined {
  const override = entries.find(
    entry => entry.date === date && entry.location === location,
  );
  if (override) {
    return override;
  }

  const weekday = weekdayFromDate(date);
  return entries.find(
    entry =>
      entry.date === undefined &&
      entry.location === location &&
      entry.weekday === weekday,
  );
}

export function createOpeningHoursRetriever(
  entries: OpeningHoursEntry[],
  options: OpeningHoursRetrieverOptions = {},
): Retriever {
  const language = options.language ?? "en";

  return {
    async retrieve(query: RetrievalQuery): Promise<RetrievalResult> {
      const date = query.metadata?.["date"];
      const match =
        typeof date === "string"
          ? findByDate(entries, query.metadata?.["location"], date)
          : entries.find(entry => matches(entry, query));

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
