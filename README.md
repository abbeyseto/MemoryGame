# Memory Game Project

This is a Memory Game that test if you can remember cards and the position where they are. It works by matching two cards as when they are clicked one after another.

## Table of Contents

* [How to Play](#instructions)
* [Dependencies](#dependencies)

## How to Play

To play this game, visit its hosted copy ##[HERE](https://abbeyseto.github.io/MemoryGame/). You will be asked to enter your name. This is required to save your final scores. To play this game, Click on any two tiles and match the images. The lower your moves, the higher your rating. 

Once cards are matched, the cards will be fliped till the end of the game and when all 16 cards have been matched you will see the following:

* Total moves made
* Time taken to finish the game
* Star rating of the player

Have fun with the Game!

## Dependencies
 
The project was built with HTML and CSS styling to display a static version of the Memory Game project. This was then converted to an interactive one with jQuery. 
Its dependencies includes:
* [jQuery Plugin](https://jquery.com/) - A JavaScript Plugin
* [Font Awesome] (https://fontawesome.com/) - An icons collection
* [Google Fonts] (https://fonts.google.com/) - Making the web more beautiful, fast, and open through great typography.
* [NodeJS](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB] (https://www.mongodb.com/) - A noSQL database

The game is powered by a REST API at the backend to store user details which is shown in the Score Board. Ajax request are made from the API to display the Score Board, while request are sent to the backend API to store the users moves after the 16 cards have been matched.

Details stored includes:
* Name
* Number of Moves
* Date and time the game was played

## Authors

* **Adenle Abiodun** - *Initial template used* - [Udacity](https://www.udacity.com/)

For specific ideas on how to improve this Game, contact me on adenleabbey@hotmail.com.

I will value your honest feedback. Thank you!.

## Acknowledgments

* Udacity
* Google
* Andela Learning Community (ALC)