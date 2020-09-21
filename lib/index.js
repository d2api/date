const UTC_RESET_HOUR = 17;
const XUR_ARRIVAL_DAY = 5;
const XUR_STAY_DURATION = 4;
const DAYS_IN_A_WEEK = 7;
/** gets data about time-based destiny ritual periods */
export class DestinyDate {
    // fixed number methods using known info,
    // that return useful milestones like weekly reset and xur
    /**
     * given date (defaults to now),
     * returns the current game-week's start and end Dates
     */
    static currentWeek(date = new Date()) {
        return this.recentWeeklyRitual(date, 2, UTC_RESET_HOUR, DAYS_IN_A_WEEK);
    }
    /**
     * given date (defaults to now),
     * returns next game-week's start and end Dates
     */
    static nextWeek(date = new Date()) {
        return this.nextWeeklyRitual(date, 2, UTC_RESET_HOUR, DAYS_IN_A_WEEK);
    }
    /**
     * given date (defaults to now),
     * returns the current game-day's start and end Dates
     */
    static currentDay(date = new Date()) {
        const start = new Date(date);
        this.resetMinorIncrements(start);
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
    static nextDay(date = new Date()) {
        const tomorrow = new Date(date);
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        return this.currentDay(tomorrow);
    }
    /**
     * given date (defaults to now),
     * returns xur's next arrival and departure dates
     */
    static nextXur(date = new Date()) {
        return this.nextWeeklyRitual(date, XUR_ARRIVAL_DAY, UTC_RESET_HOUR, XUR_STAY_DURATION);
    }
    /**
     * given date (defaults to now),
     * returns xur's current arrival and departure dates,
     * or undefineds if xur isn't in town
     */
    static currentXur(date = new Date()) {
        return this.currentWeeklyRitual(date, XUR_ARRIVAL_DAY, UTC_RESET_HOUR, XUR_STAY_DURATION);
    }
    // supporting methods to do the calculations
    /**
     * given date (defaults to now), and ritual params,
     * returns the most recent ritual's start and end Dates
     */
    static recentWeeklyRitual(date = new Date(), dayOfWeek, hourOfDayUTC, lengthInDays) {
        let start = new Date(date);
        this.resetMinorIncrements(start);
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
     * returns the start and end Dates of the ritual we're in,
     * or undefineds if we aren't in one
     */
    static currentWeeklyRitual(date = new Date(), dayOfWeek, hourOfDayUTC, lengthInDays) {
        const now = Date.now();
        const { start, end } = this.recentWeeklyRitual(date, dayOfWeek, hourOfDayUTC, lengthInDays);
        if (start.getTime() < now && now < end.getTime())
            return { start, end };
        return {};
    }
    /**
     * given date (defaults to now), and ritual params,
     * returns the next ritual's start and end Dates
     */
    static nextWeeklyRitual(date = new Date(), dayOfWeek, hourOfDayUTC, lengthInDays) {
        const start = new Date(date);
        this.resetMinorIncrements(start);
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
    // get rid of time increments we don't want while finding an hour
    static resetMinorIncrements(date) {
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
    }
}
export default DestinyDate;
