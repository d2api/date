/** gets data about time-based destiny ritual periods */
export default class DestinyDate {
    /**
     * given date (defaults to now),
     * returns a tuple of the current game-week's start and end Dates
     */
    static currentWeek(date?: number | string | Date): readonly [Date, Date];
    /**
     * given date (defaults to now),
     * returns a tuple of next game-week's start and end Dates
     */
    static nextWeek(date?: number | string | Date): readonly [Date, Date];
    /**
     * given date (defaults to now),
     * returns a tuple of xur's next arrival and departure dates
     */
    static nextXur(date?: number | string | Date): readonly [Date, Date];
    /**
     * given date (defaults to now),
     * returns a tuple of xur's current arrival and departure dates,
     * or undefineds if xur isn't in town
     */
    static currentXur(date?: number | string | Date): readonly [Date, Date] | [undefined, undefined];
    /**
     * given date (defaults to now), and ritual params,
     * returns a tuple of most recent ritual's start and end Dates
     */
    static recentWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): readonly [Date, Date];
    /**
     * given date (defaults to now), and ritual params,
     * returns a tuple of the start and end Dates of the ritual we're in,
     * or undefineds if we aren't in one
     */
    static currentWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): readonly [Date, Date] | [undefined, undefined];
    /**
     * given date (defaults to now), and ritual params,
     * returns a tuple of next ritual's start and end Dates
     */
    static nextWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): readonly [Date, Date];
    private static resetMinorIncrements;
}
