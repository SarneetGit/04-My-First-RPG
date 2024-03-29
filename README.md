# My First RPG - POKEMON BATTLE!

I created this game as a submission for my week 4 assignment of the coding bootcamp I am currently enrolled in. Given the current week being a long weekend, I decided to really have one with this assignment and challenge myself at the same time.

I have always enjoyed playing pokemon growing up so I thought it would be super cool to indulge in how one goes about coding a simple battle between pokemon.

## Game Mechanics

```
I wanted to make the game challenging but at the same time winnable, if you have ever played a pokemon game and can rationalize 
which attackcs should be used on which pokemon then you should win the match. Please see notable in game power ups:

1) If your pokemon's attribute/type is strong against the opponent's, your attacks increase permenantly
2) If your pokemon's attribute/type is weak against the opponent's, your attacks decrease permenantly
3) Pikachu is a Vanilla for equality purposes in this game

Be sure to take into account the PP (power points) of each attack!

Instructions of the original assignment are available below:
```

# 04---My-First-RPG

![Star Wars](Images/2-StarWars.jpg)

1. [Watch the demo](https://youtu.be/klN2-ITjRt8).

2. Here's how the app works:

   * When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

   * The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

   * The player chooses an opponent by clicking on an enemy's picture.

   * Once the player selects an opponent, that enemy is moved to a `defender area`.

   * The player will now be able to click the `attack` button.
     * Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
     * The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

3. The player will keep hitting the attack button in an effort to defeat their opponent.

   * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

##### Option 2 Game design notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 

  * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

* No characters in the game can heal or recover Health Points. 

  * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
