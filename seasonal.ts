// supporting functions for processing season calculations

export const seasonStartDates = [
  0, //12/31/1969, 4:00:00 PM PST
  1504717200000, // 1 -  9/6/2017, 10:00:00 AM PDT
  1512493200000, // 2 -  12/5/2017, 9:00:00 AM PST
  1525798800000, // 3 -  5/8/2018, 10:00:00 AM PDT
  1536080400000, // 4 -  9/4/2018, 10:00:00 AM PDT
  1543338000000, // 5 -  11/27/2018, 9:00:00 AM PST
  1551805200000, // 6 -  3/5/2019, 9:00:00 AM PST
  1559667600000, // 7 -  6/4/2019, 10:00:00 AM PDT
  1569949200000, // 8 -  10/1/2019, 10:00:00 AM PDT
  1575997200000, // 9 -  12/10/2019, 9:00:00 AM PST
  1583859600000, // 10 -  3/10/2020, 10:00:00 AM PDT
  1591722000000, // 11 -  6/9/2020, 10:00:00 AM PDT
  1605027600000, // 12 -  11/10/2020, 9:00:00 AM PST
  1612890000000, // 13 -  2/9/2021, 9:00:00 AM PST
  1620752400000, // 14 -  5/11/2021, 10:00:00 AM PDT
];

export const seasonTitleData = {
  redWar: 1,
  curseOfOsiris: 2,
  warmind: 3,
  resurgence: 3,
  forsaken: 4,
  outlaw: 4,
  blackArmory: 5,
  forge: 5,
  jokersWild: 6,
  drifter: 6,
  penumbra: 7,
  opulence: 7,
  shadowkeep: 8,
  undying: 8,
  dawn: 9,
  worthy: 10,
  arrivals: 11,
  beyondLight: 12,
  hunt: 12,
  chosen: 13,
} as const;

export type KnownSeasonNumber = typeof seasonTitleData[keyof typeof seasonTitleData];
export const seasonTitles = seasonTitleData as Record<
  keyof typeof seasonTitleData,
  KnownSeasonNumber
>;

// searches backward to find the latest season whose start date we've exceeded
export function seasonNumberForDate(
  date: number | string | Date = new Date()
): KnownSeasonNumber | undefined {
  const now = new Date(date).getTime();
  for (let i = seasonStartDates.length - 1; i >= 0; i--) {
    if (now >= seasonStartDates[i]) return i as KnownSeasonNumber;
  }
}

export type SeasonInfo = {
  start: Date;
  end: Date;
  seasonNumber: number;
};

/** like SeasonInfo but not guaranteed to have a known end date */
export type FutureSeasonInfo = {
  start: Date;
  end?: Date;
  seasonNumber: number;
};

// given a known season, definitely have all info.
// given an unknown season number, might not have an end date.
export function seasonInfoFromNumber(
  seasonNumber: KnownSeasonNumber
): SeasonInfo | undefined;
export function seasonInfoFromNumber(
  seasonNumber: number
): FutureSeasonInfo | undefined;
export function seasonInfoFromNumber(
  seasonNumber: number
): FutureSeasonInfo | undefined {
  const startTime = seasonStartDates[seasonNumber];
  if (!startTime) return;
  const nextStartTime = seasonStartDates[seasonNumber + 1];
  return {
    start: new Date(startTime),
    end: nextStartTime ? new Date(nextStartTime) : undefined,
    seasonNumber,
  };
}
