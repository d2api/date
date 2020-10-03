import { currentXur, nextXur, currentWeek, currentDay } from "./index.js";

// it's Sunday, Sept 6 right now, btw

console.log(currentXur());
// -> [ 2020-09-04T17:00:00.000Z, 2020-09-08T17:00:00.000Z ]

console.log(nextXur());
// -> [ 2020-09-11T17:00:00.000Z, 2020-09-15T17:00:00.000Z ]

// but what if it was last thursday?

console.log(currentXur("Sep 03 2020 09:59:59 GMT-0700"));
// -> [ undefined, undefined ]

// consume via destructuring
{
  const { start, end } = currentWeek();

  console.log(`this week began ${start.toLocaleString()}`);
  // -> this week began 9/1/2020, 10:00:00 AM

  console.log(`this week will end ${end.toLocaleString()}`);
  // -> this week will end 9/8/2020, 10:00:00 AM
}

// maybe you hate end dates
{
  const { start } = currentXur();
  console.log(
    `xur is ${start ? `around since ${start}` : "not around right now"}`
  );
}

// daily resets
{
  let { start, end } = currentDay();

  console.log(`today began ${start.toLocaleString()}`);
  //-> today began 9/6/2020, 10:00:00 AM
  console.log(`today will end ${end.toLocaleString()}`);
  //-> today will end 9/7/2020, 10:00:00 AM
}
