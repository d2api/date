# DestinyDate
a date class for determining info about the meaningful periods of time in destiny 2

```sh
npm install @d2api/date
```

```js
import DestinyDate from "@d2api/date";

// it's Sunday, Sept 6 right now, btw

DestinyDate.currentXur()
// -> { start: 2020-09-04T17:00:00.000Z, end: 2020-09-08T17:00:00.000Z }

DestinyDate.nextXur()
// -> { start: 2020-09-11T17:00:00.000Z, end: 2020-09-15T17:00:00.000Z }

// but what if it was last thursday?

DestinyDate.currentXur("Sep 03 2020 09:59:59 GMT-0700");
// -> { start: undefined, end: undefined }
```

```js
// consuming via destructuring

const { start, end } = DestinyDate.currentWeek();

`this week began ${start.toLocaleString()}`
// -> this week began 9/1/2020, 10:00:00 AM

`this week will end ${end.toLocaleString()}`
// -> this week will end 9/8/2020, 10:00:00 AM
```

```js
// maybe you only need a start date

const { start } = DestinyDate.currentXur();
`xur is ${start ? `around since ${start}` : "not around right now"}`;
```

```js
// daily resets

const currentDay = DestinyDate.currentDay();

`today began ${currentDay.start.toLocaleString()}`
//-> today began 9/6/2020, 10:00:00 AM
`today will end ${currentDay.end.toLocaleString()}`
//-> today will end 9/7/2020, 10:00:00 AM
```