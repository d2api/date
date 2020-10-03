import { resetMinorIncrements } from "./util.js";
import { UTC_RESET_HOUR } from "./values.js";

// supporting functions for processing daily rituals.
// right now, that's just "the daily reset time"

/**
 * given date (defaults to now),
 * returns the current game-day's start and end Dates
 */
export function currentDay(date: number | string | Date = new Date()) {
  const start = new Date(date);
  resetMinorIncrements(start);

  // if it's before reset time, we want yesterday's reset
  if (start.getUTCHours() < UTC_RESET_HOUR)
    start.setUTCDate(start.getUTCDate() - 1);

  // now that hour's been accounted for, make it hourOfDayUTC
  start.setUTCHours(UTC_RESET_HOUR);

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}

/**
 * given date (defaults to now),
 * returns the next game-day's start and end Dates
 */
export function nextDay(date: number | string | Date = new Date()) {
  const tomorrow = new Date(date);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return currentDay(tomorrow);
}
