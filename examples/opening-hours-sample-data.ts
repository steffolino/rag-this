import type { OpeningHoursEntry } from "../src/opening-hours/create-opening-hours-retriever.js";

/**
 * Synthetic example data, shaped like a typical library opening-hours
 * table (one row per location and weekday, weekday 0 = Sunday ... 6 =
 * Saturday). These are NOT real TIB opening hours — swap this array for
 * your own data source as long as it matches `OpeningHoursEntry`.
 */
export const sampleOpeningHours: OpeningHoursEntry[] = [
  { location: "TIB Conti-Campus", weekday: 0, opens: null, closes: null },
  { location: "TIB Conti-Campus", weekday: 1, opens: "08:00", closes: "22:00" },
  { location: "TIB Conti-Campus", weekday: 2, opens: "08:00", closes: "22:00" },
  { location: "TIB Conti-Campus", weekday: 3, opens: "08:00", closes: "22:00" },
  { location: "TIB Conti-Campus", weekday: 4, opens: "08:00", closes: "22:00" },
  { location: "TIB Conti-Campus", weekday: 5, opens: "08:00", closes: "22:00" },
  { location: "TIB Conti-Campus", weekday: 6, opens: "10:00", closes: "18:00" },

  { location: "TIB Sühlkamp", weekday: 0, opens: null, closes: null },
  { location: "TIB Sühlkamp", weekday: 1, opens: "09:00", closes: "20:00" },
  { location: "TIB Sühlkamp", weekday: 2, opens: "09:00", closes: "20:00" },
  { location: "TIB Sühlkamp", weekday: 3, opens: "09:00", closes: "20:00" },
  { location: "TIB Sühlkamp", weekday: 4, opens: "09:00", closes: "20:00" },
  { location: "TIB Sühlkamp", weekday: 5, opens: "09:00", closes: "20:00" },
  { location: "TIB Sühlkamp", weekday: 6, opens: null, closes: null },
];
