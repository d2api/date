/** gets data about time-based destiny ritual periods */
export default class DestinyDate {
  // fixed number methods using known info,
  // that return useful milestones like weekly reset and xur

  /**
   * given date (defaults to now),
   * returns a tuple of the current game-week's start and end Dates
   */
  static currentWeek(date: number | string | Date = new Date()) {
    return this.recentWeeklyRitual(date, 2, 17, 7);
  }
  /**
   * given date (defaults to now),
   * returns a tuple of next game-week's start and end Dates
   */
  static nextWeek(date: number | string | Date = new Date()) {
    return this.nextWeeklyRitual(date, 2, 17, 7);
  }

  /**
   * given date (defaults to now),
   * returns a tuple of xur's next arrival and departure dates
   */
  static nextXur(date: number | string | Date = new Date()) {
    return this.nextWeeklyRitual(date, 5, 17, 4);
  }
  /**
   * given date (defaults to now),
   * returns a tuple of xur's current arrival and departure dates,
   * or undefineds if xur isn't in town
   */
  static currentXur(date: number | string | Date = new Date()) {
    return this.currentWeeklyRitual(date, 5, 17, 4);
  }

  // supporting methods to do the calculations

  /**
   * given date (defaults to now), and ritual params,
   * returns a tuple of most recent ritual's start and end Dates
   */
  static recentWeeklyRitual(
    date: number | string | Date = new Date(),
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    hourOfDayUTC: number,
    lengthInDays: number
  ): readonly [Date, Date] {
    date = new Date(date);
    this.resetMinorIncrements(date);

    // if it's before hourOfDayUTC, today wasn't the most recent start, so start looking yesterday
    if (date.getUTCHours() < hourOfDayUTC)
      date.setUTCDate(date.getUTCDate() - 1);

    // now that hour's been accounted for, make it hourOfDayUTC
    date.setUTCHours(hourOfDayUTC);

    // rewind until we hit dayOfWeek (we might be on it already)
    while (date.getUTCDay() !== dayOfWeek) {
      date.setUTCDate(date.getUTCDate() - 1);
    }

    const endDate = new Date(date);
    endDate.setUTCDate(endDate.getUTCDate() + lengthInDays);

    return [date, endDate];
  }

  /**
   * given date (defaults to now), and ritual params,
   * returns a tuple of the start and end Dates of the ritual we're in,
   * or undefineds if we aren't in one
   */
  static currentWeeklyRitual(
    date: number | string | Date = new Date(),
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    hourOfDayUTC: number,
    lengthInDays: number
  ): readonly [Date, Date] | [undefined, undefined] {
    const now = Date.now();
    const [startDate, endDate] = this.recentWeeklyRitual(
      date,
      dayOfWeek,
      hourOfDayUTC,
      lengthInDays
    );
    if (startDate.getTime() < now && now < endDate.getTime())
      return [startDate, endDate];
    return [undefined, undefined];
  }

  /**
   * given date (defaults to now), and ritual params,
   * returns a tuple of next ritual's start and end Dates
   */
  static nextWeeklyRitual(
    date: number | string | Date = new Date(),
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    hourOfDayUTC: number,
    lengthInDays: number
  ): readonly [Date, Date] {
    date = new Date(date);
    this.resetMinorIncrements(date);

    // if it's at, or after, hourOfDayUTC, today can't possibly be the start of the next ritual, so increment the date
    if (date.getUTCHours() >= hourOfDayUTC)
      date.setUTCDate(date.getUTCDate() + 1);

    // now that hour's been accounted for, make it hourOfDayUTC
    date.setUTCHours(hourOfDayUTC);

    // fast forward until we hit dayOfWeek (we might be on it already)
    while (date.getUTCDay() !== dayOfWeek) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const endDate = new Date(date);
    endDate.setUTCDate(endDate.getUTCDate() + lengthInDays);

    return [date, endDate];
  }

  // get rid of time increments we don't want while finding an hour
  private static resetMinorIncrements(date: Date) {
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
  }
}
