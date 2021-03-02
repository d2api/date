// weekly rituals of interest
import {
  DAYS_IN_A_WEEK,
  UTC_RESET_HOUR,
  XUR_ARRIVAL_DAY,
  XUR_STAY_DURATION,
} from "./values.js";
import {
  currentWeeklyRitual,
  nextWeeklyRitual,
  recentWeeklyRitual,
} from "./weekly.js";

/**
 * given date (defaults to now),
 * returns the current game-week's start and end Dates
 */
export function currentWeek(date: number | string | Date = new Date()) {
  return recentWeeklyRitual(date, 2, UTC_RESET_HOUR, DAYS_IN_A_WEEK);
}

/**
 * given date (defaults to now),
 * returns next game-week's start and end Dates
 */
export function nextWeek(date: number | string | Date = new Date()) {
  return nextWeeklyRitual(date, 2, UTC_RESET_HOUR, DAYS_IN_A_WEEK);
}

/**
 * given date (defaults to now),
 * returns xur's next arrival and departure dates
 */
export function nextXur(date: number | string | Date = new Date()) {
  return nextWeeklyRitual(
    date,
    XUR_ARRIVAL_DAY,
    UTC_RESET_HOUR,
    XUR_STAY_DURATION
  );
}

/**
 * given date (defaults to now),
 * returns xur's current arrival and departure dates,
 * or two undefineds if xur isn't in town
 */
export function currentXur(date: number | string | Date = new Date()) {
  return currentWeeklyRitual(
    date,
    XUR_ARRIVAL_DAY,
    UTC_RESET_HOUR,
    XUR_STAY_DURATION
  );
}
