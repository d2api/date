import { resetMinorIncrements } from "./util.js";

// supporting functions for processing weekly rituals
// weekly rituals recur once per week,
// start on a specific day of the week,
// at a specific time,
// and last a number of days

/**
 * given date (defaults to now), and ritual params,
 * returns the start and end Dates of the ritual we're in,
 * or undefineds if we aren't in one
 */
export function currentWeeklyRitual(
  date: number | string | Date = new Date(),
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  hourOfDayUTC: number,
  lengthInDays: number
) {
  const now = new Date(date).getTime();
  const { start, end } = recentWeeklyRitual(
    date,
    dayOfWeek,
    hourOfDayUTC,
    lengthInDays
  );
  if (start.getTime() < now && now < end.getTime()) return { start, end };
  return {};
}

/**
 * given date (defaults to now), and ritual params,
 * returns the most recent ritual's start and end Dates
 *
 * this may be the ritual we are inside right now
 */
export function recentWeeklyRitual(
  date: number | string | Date = new Date(),
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  hourOfDayUTC: number,
  lengthInDays: number
) {
  let start = new Date(date);
  resetMinorIncrements(start);

  // if it's before hourOfDayUTC, today wasn't the most recent start, so start looking yesterday
  if (start.getUTCHours() < hourOfDayUTC)
    start.setUTCDate(start.getUTCDate() - 1);

  // now that hour's been accounted for, make it hourOfDayUTC
  start.setUTCHours(hourOfDayUTC);

  // rewind until we hit dayOfWeek (we might be on it already)
  while (start.getUTCDay() !== dayOfWeek) {
    start.setUTCDate(start.getUTCDate() - 1);
  }

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + lengthInDays);

  return { start, end };
}

/**
 * given date (defaults to now), and ritual params,
 * returns the next ritual's start and end Dates
 */
export function nextWeeklyRitual(
  date: number | string | Date = new Date(),
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  hourOfDayUTC: number,
  lengthInDays: number
) {
  const start = new Date(date);
  resetMinorIncrements(start);

  // if it's at, or after, hourOfDayUTC, today can't possibly be the start of the next ritual, so increment the date
  if (start.getUTCHours() >= hourOfDayUTC)
    start.setUTCDate(start.getUTCDate() + 1);

  // now that hour's been accounted for, make it hourOfDayUTC
  start.setUTCHours(hourOfDayUTC);

  // fast forward until we hit dayOfWeek (we might be on it already)
  while (start.getUTCDay() !== dayOfWeek) {
    start.setUTCDate(start.getUTCDate() + 1);
  }
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + lengthInDays);

  return { start, end };
}
