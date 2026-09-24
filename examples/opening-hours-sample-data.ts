import type { OpeningHoursEntry } from "../src/opening-hours/create-opening-hours-retriever.js";

/**
 * Synthetic example data, shaped like a typical library opening-hours
 * table (one row per location and weekday, weekday 0 = Sunday ... 6 =
 * Saturday), plus a few date-specific holiday exceptions that override
 * the recurring weekday rule for that exact day. These are NOT real
 * TIB opening hours — swap this array for your own data source as
 * long as it matches `OpeningHoursEntry`.
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

  // Holiday exceptions (2026) — override the recurring rule above for
  // that exact calendar date only.
  { location: "TIB Conti-Campus", weekday: 4, date: "2026-12-24", opens: "08:00", closes: "14:00" },
  { location: "TIB Conti-Campus", weekday: 5, date: "2026-12-25", opens: null, closes: null },
  { location: "TIB Conti-Campus", weekday: 6, date: "2026-12-26", opens: null, closes: null },
  { location: "TIB Conti-Campus", weekday: 4, date: "2026-12-31", opens: "08:00", closes: "14:00" },

  { location: "TIB Sühlkamp", weekday: 4, date: "2026-12-24", opens: null, closes: null },
  { location: "TIB Sühlkamp", weekday: 5, date: "2026-12-25", opens: null, closes: null },
  { location: "TIB Sühlkamp", weekday: 6, date: "2026-12-26", opens: null, closes: null },
  { location: "TIB Sühlkamp", weekday: 4, date: "2026-12-31", opens: null, closes: null },
];
