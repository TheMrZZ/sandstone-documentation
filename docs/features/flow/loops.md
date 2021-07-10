---
id: loops
title: While / For Loops
description: How to write while loops & for loops in Sandstone.
position: 3
---

You can easily use loops with Sandstone's built-in `while`, `forScore`, and `forRange` functions.

## While loop

To continuously run through code while a given condition is met, you can use the `while` function:

```ts
_.while(condition1, () => {
  say('condition 1 is true')
})

say('condition 1 is false')
```

## For loop

To use continuously run through code with an incrementor, you can use the `forScore` function:

```ts
_.forScore(
  // Initialize our count variable
  Variable(1),
  // Check if the condition is true
  (i) => i.lessThan(11),
  // Increment the count variable after the code in the loop has run
  (i) => i.add(1),
  // The stuff to run!
  (i) => {
    tellraw('@s', ['This loop has run ', i, ' times.'])
  }
)
```

This is probably a bit confusing at first, so let's look at each part in a bit more detail.

The first parameter we're passing is a score/variable. We can initialize it within the function, as shown in the example, or have it declared elsewhere. You can also use a number here, and sandstone will automatically turn it into a variable.

```ts
const externalVariable = Variable(0);

// Also valid!
_.forScore(
  externalVariable,
  (i) => i.lessThan(11),
  (i) => i.add(1),
  (i) => {
    tellraw('@s', ['This loop has run ', i, ' times.'])
  }
)
```

The second parameter is a function that gives the initialized score/variable as a parameter and returns a [condition](/docs/features/objectives#condition). The loop will continue if the returned condition is true, or break if it is false. If we expanded the one from the example above a bit, it would look like this:

```ts
// i is the score/variable used in the first parameter
(i) => {
  // Continue the loop only if the returned condition is true
  return i.lessThan(11); 
}
```

The third parameter similar to the one above, except it is used to increment the variable. It will run after each time the main code of the loop is run, but before the condition is checked again.

```ts
// i is the score/variable used in the first parameter
(i) => { 
  // Add 1 to the score/variable
  return i.add(1)
}
```

The final parameter is the main code of the loop. It gives the score/variable as a parameter, and everything within this function will run as it would in a normal minecraft function.

```ts
// Tell the player the value of the score/variable
(i) => {
  // Tell the player the value of the score/variable
  tellraw('@s', ['This loop has run ', i, ' times.'])
  // Return nothing because this is a regular minecraft function
}
```

## For-Range loop

If your goal is to simply loop once for each number between two scores/variables, you can use the `forRange` function:

```ts
_.forRange(score1, score2, (currentScore) => {
  tellraw('@s', ['Looping between ', score1, ' and ', score2 '. Currently at: ', currentScore, '.'])
})
```

You can also loop between two numbers:

```ts
// This loop does the same thing as the example regular for loop above!
_.forRange(1, 11, (currentScore) => {
  tellraw('@s', ['This loop has run ', i, ' times.'])
})
```

Note: In for-range loops, the first parameter is inclusive while the second parameter is exclusive. This means that the first parameter has to be *less* than it in order for the loop to continue; the loop will stop if they are equal.