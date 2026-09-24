import { createOpeningHoursRetriever } from "../src/opening-hours/create-opening-hours-retriever.js";
import { createRoutedRetriever } from "../src/create-routed-retriever.js";
import type { RetrievalQuery } from "../src/types.js";
import { sampleOpeningHours } from "./opening-hours-sample-data.js";

const openingHoursRetrieverEn = createOpeningHoursRetriever(sampleOpeningHours);
const openingHoursRetrieverDe = createOpeningHoursRetriever(sampleOpeningHours, {
  language: "de",
});

const router = createRoutedRetriever([
  {
    matches: query => query.metadata?.["intent"] === "opening_hours",
    retriever: openingHoursRetrieverEn,
  },
]);

const englishQueries: RetrievalQuery[] = [
  {
    text: "Is the TIB Conti-Campus open on Saturday?",
    metadata: {
      intent: "opening_hours",
      location: "TIB Conti-Campus",
      weekday: 6,
    },
  },
  {
    text: "When is TIB Sühlkamp open on Wednesday?",
    metadata: {
      intent: "opening_hours",
      location: "TIB Sühlkamp",
      weekday: 3,
    },
  },
  {
    text: "Is TIB Sühlkamp open on Sunday?",
    metadata: {
      intent: "opening_hours",
      location: "TIB Sühlkamp",
      weekday: 0,
    },
  },
  {
    text: "What's the weather like today?",
    metadata: { intent: "weather" },
  },
];

const germanQueries: RetrievalQuery[] = [
  {
    text: "Hat die TIB Conti-Campus samstags geöffnet?",
    metadata: { location: "TIB Conti-Campus", weekday: 6 },
  },
  {
    text: "Wann hat die TIB Sühlkamp mittwochs geöffnet?",
    metadata: { location: "TIB Sühlkamp", weekday: 3 },
  },
];

async function main(): Promise<void> {
  const english = [];
  for (const query of englishQueries) {
    english.push({ query, result: await router.retrieve(query) });
  }

  const german = [];
  for (const query of germanQueries) {
    german.push({ query, result: await openingHoursRetrieverDe.retrieve(query) });
  }

  console.log(JSON.stringify({ english, german }, null, 2));
}

void main();
