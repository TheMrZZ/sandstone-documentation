---
id: if
title: If / Else
description: How to write if / else statmements in Sandstone.
---

You can easily check for in-game conditions using Sandstone's built-in `if` statement.

## Syntax

To check a condition, the following syntax is used:
```ts
_
 .if(condition1, () => {
   say('Condition 1 is true')
 })
 .elseIf(condition2, () => {
   say('Condition 2 is true')
 })
 .else(() => {
   say('Both condition 1 and condition 2 are false')
 })
```

As you can see, this syntax mimicks the original `if / else if / else` construct from classical programming languages. `elseIf` and `else` are entirely optional, and you can chain as many `elseIf` as needed:

```ts
_.if(condition1, () => {
  say('I am a lonely if')
})

_
 .if(condition2, () => {
   say(2)
 })
 .elseIf(condition3, () => {
   say(3)
 })
 .elseIf(condition4, () => {
   say(4)
 })
```

## Conditions

Conditions are created using Sandstone's built-in abstractions.

### Score conditions

To check if a score matches a given condition, you can use [Score's comparison operators](/docs/features/objectives#comparison).

For example:
```js
const self = Selector('@s')
const kills = Objective.create('kills', 'playerKillCount')
const myKills = kills(self)

_.if(myKills.greaterThan(10), () => {
  tellraw('@a', [self, 'is on a rampage!'])
})
```

### Data conditions

<!-- ngl, I have no idea how to use these -->

### Block conditions

<!-- see above -->

## Boolean logic

Similar to regular boolean operations in JavaScript, you can also use boolean operators in sandstone.

To get the inverse of a condition, you can use `not`:

```ts
const score = Variable(0)

_.if(_.not(score.greaterThan(10)), () => {
  say('The score is less than or equal to 10!')
})
```

To check if multiple conditions are *both* true, you can use `and`:

```ts
const score1 = Variable(0)
const score2 = Variable(7)

_.if(_.and(score1.lessThan(8), score2.lessThan(8)), () => {
  say('Both scores are less than 8!')
})
```

To check if any condition of multiple conditions is true, you can use `or`:

```ts
const score1 = Variable(3)
const score2 = Variable(4)

_.if(_.or(score1.equalTo(4), score2.equalTo(4)), () => {
  say('Either score1 or score2 is equal to 4!')
})
```

The `and` and `or` functions are both greedy, and accept as many parameters as you are willing to give them:

```ts
const score1 = Variable(1);
const score2 = Variable(2);
const score3 = Variable(3);
const score4 = Variable(4);
const score5 = Variable(5);

_.if(_.and(
  score1.equalTo(3),
  score2.equalTo(3),
  score3.equalTo(3),
  score4.equalTo(3),
  score5.equalTo(3)
), () => {
  say('One of the scores is equal to 3!')
})
```

Of course, you can mix and match these functions to your liking to create complex boolean logic:

```ts
const score1 = Variable(1);
const score2 = Variable(2);
const score3 = Variable(3);
const score4 = Variable(4);
const score5 = Variable(5);

_.if(_.or(_.not(_.and(score1.equalTo(score2), score3.equalTo(score4))), score5.equalTo(0)), () => {
  say('Hooray for boolean logic!')
})
```