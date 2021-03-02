import {
  seasonNumberForDate,
  KnownSeasonNumber,
  SeasonInfo,
  seasonInfoFromNumber,
  seasonTitles,
  FutureSeasonInfo,
} from "./seasonal.js";

/**
 * given date (defaults to now),
 * returns the season number, and start/end Dates, of the season we're in
 */
export function currentSeason(): SeasonInfo;
export function currentSeason(
  date: number | string | Date
): SeasonInfo | undefined;
export function currentSeason(date: number | string | Date = new Date()) {
  const seasonNumber = seasonNumberForDate(date);
  if (seasonNumber) return seasonInfoFromNumber(seasonNumber);
}

/**
 * given date (defaults to now),
 * returns the season number, and start Date, of next season.
 *
 * this is a convenience method that is based off the end of current
 * season. there is absolutely no reason to believe we can predict
 * the end date of a future season, so... no promises
 */
export function nextSeason(
  date: number | string | Date = new Date()
): FutureSeasonInfo | undefined {
  const seasonNumber = (seasonNumberForDate(date) ?? -1) + 1;
  if (!seasonNumber) return;
  const next = seasonInfoFromNumber(seasonNumber);
  if (next)
    return {
      start: next.start,
      end: next.end,
      seasonNumber,
    };
  const current = seasonInfoFromNumber(seasonNumber - 1);
  if (current?.end)
    return {
      start: current.end,
      end: undefined,
      seasonNumber,
    };
}

export const seasonOf = Object.entries(seasonTitles).reduce<
  {
    [key in keyof typeof seasonTitles]: SeasonInfo;
  } &
    Record<KnownSeasonNumber, SeasonInfo>
>(
  (acc, [seasonName, seasonNumber]) =>
    Object.assign(acc, { [seasonName]: seasonInfoFromNumber(seasonNumber)! }),
  {} as any
);
