# @d2api/date
a date library for determining info about meaningful periods of time in destiny 2

### breaking 3.0.0, and some thoughts on invalid data
which values can be undefined, has changed.  
check your optional chaining carefully after upgrading,  
and see https://github.com/d2api/date/blob/master/INVALIDITY.md for more info  

```sh
npm install @d2api/date
```

```js
import { currentXur, nextXur, currentWeek, currentDay } from "@d2api/date";

// it's Sunday, Sept 6 right now, btw

currentXur()
// -> { start: 2020-09-04T17:00:00.000Z, end: 2020-09-08T17:00:00.000Z }

nextXur()
// -> { start: 2020-09-11T17:00:00.000Z, end: 2020-09-15T17:00:00.000Z }

// but what if it was a thursday?
currentXur("Sep 03 2020 09:59:59 GMT-0700");
// -> undefined
```

```js
// consuming via destructuring

const { start, end } = currentWeek();

`this week began ${start}`
// -> this week began 9/1/2020, 10:00:00 AM

`this week will end ${end}`
// -> this week will end 9/8/2020, 10:00:00 AM
```

```js
// maybe you only need a start date

const xurStart = currentXur()?.start; 
`xur is ${xurStart ? `around since ${xurStart}` : "not around right now"}`;
```

```js
// daily resets

const today = currentDay();

`today began ${today.start}`
//-> today began 9/6/2020, 10:00:00 AM
`today will end ${today.end}`
//-> today will end 9/7/2020, 10:00:00 AM
```

```js
// seasons

  let { start, end, seasonNumber } = currentSeason();

`season ${seasonNumber} lasts from ${start}`
//-> season 11 lasts from 6/9/2020, 10:00:00 AM
`until ${end}`
//-> until 11/10/2020, 9:00:00 AM

`arrivals begins ${seasonOf.arrivals.start}`
//-> arrivals begins 6/9/2020, 10:00:00 AM

// this is typesafe without ?. for known seasons
`season 11 ends ${seasonOf[11].end}`
//-> season 11 ends 11/10/2020, 9:00:00 AM

`season something ends ${seasonOf[someNumberVariable]?.end}`
```