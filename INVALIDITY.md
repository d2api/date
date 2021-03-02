### breaking 3.0.0
i've made the difficult decision to be reasonable,  
and return `undefined` instead of `{ start:undefined, end: undefined }`  
for invalid responses (like `currentXur()` on a wednesday).  

this is a breaking change depending how you check return values, so be warned.  

### regarding invalid data
if you ask for something silly, like season -8, or season 20, i have 3 options:  

- robust: just give back bad data. season -8 starts in 1970. why the hell not.
  - robust is very nice for typescript because the types don't need checking. but when is displaying 1970 really helpful? this will result in really weird behavior for whatever consumes this data
- throw an error: let all of upstream know that something unreasonable was requested
  - also very nice for typescript, but requires constant `try{}` wrappers all over. these exhaust me.
- the middle bear porridge: send back undefined
  - undefineds need type checking to narrow their types until they are usable. they are frustrating to destructure, because if you do it too early, each destructured property needs to be checked.

my point? only that i hate all of these options. i guess i am going with undefined for now. maybe i should go for errors instead.
