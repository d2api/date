// get rid of time increments we don't want while finding an hour
export function resetMinorIncrements(date: Date) {
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
}
