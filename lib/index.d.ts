/** gets data about time-based destiny ritual periods */
export declare class DestinyDate {
    /**
     * given date (defaults to now),
     * returns the current game-week's start and end Dates
     */
    static currentWeek(date?: number | string | Date): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now),
     * returns next game-week's start and end Dates
     */
    static nextWeek(date?: number | string | Date): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now),
     * returns the current game-day's start and end Dates
     */
    static currentDay(date?: number | string | Date): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now),
     * returns the next game-day's start and end Dates
     */
    static nextDay(date?: number | string | Date): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now),
     * returns xur's next arrival and departure dates
     */
    static nextXur(date?: number | string | Date): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now),
     * returns xur's current arrival and departure dates,
     * or undefineds if xur isn't in town
     */
    static currentXur(date?: number | string | Date): {
        start: Date;
        end: Date;
    } | {
        start?: undefined;
        end?: undefined;
    };
    /**
     * given date (defaults to now), and ritual params,
     * returns the most recent ritual's start and end Dates
     */
    static recentWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): {
        start: Date;
        end: Date;
    };
    /**
     * given date (defaults to now), and ritual params,
     * returns the start and end Dates of the ritual we're in,
     * or undefineds if we aren't in one
     */
    static currentWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): {
        start: Date;
        end: Date;
    } | {
        start?: undefined;
        end?: undefined;
    };
    /**
     * given date (defaults to now), and ritual params,
     * returns the next ritual's start and end Dates
     */
    static nextWeeklyRitual(date: string | number | Date | undefined, dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, hourOfDayUTC: number, lengthInDays: number): {
        start: Date;
        end: Date;
    };
    private static resetMinorIncrements;
}
export default DestinyDate;
