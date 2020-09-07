# destinydate
a date class for determining info about the meaningful periods of time in d2

```sh
npm install d2api/destinydate
# or yarn cause yarn is ...less bad and knows how to properly update modules from github
```

```js
import DestinyDate from "destinydate";

// it's Sunday, Sept 6 right now, btw

DestinyDate.currentXur()
// -> [ 2020-09-04T17:00:00.000Z, 2020-09-08T17:00:00.000Z ]

DestinyDate.nextXur()
// -> [ 2020-09-11T17:00:00.000Z, 2020-09-15T17:00:00.000Z ]

// but what if it was last thursday?

DestinyDate.currentXur("Sep 03 2020 09:59:59 GMT-0700");
// -> [ undefined, undefined ]

// consume via destructuring

const [begin, end] = DestinyDate.currentWeek();

`this week began ${begin.toLocaleString()}`
// -> this week began 9/1/2020, 10:00:00 AM

`this week will end ${end.toLocaleString()}`
// -> this week will end 9/8/2020, 10:00:00 AM

// maybe you hate end dates
const [xurBegin] = DestinyDate.currentXur();
`xur is ${xurBegin ? `around since ${xurBegin}` : "not around right now"}`;

// daily resets

const [begin, end] = DestinyDate.currentDay();

`today began ${begin.toLocaleString()}`
//-> today began 9/6/2020, 10:00:00 AM
`today will end ${end.toLocaleString()}`
//-> today will end 9/7/2020, 10:00:00 AM
```
