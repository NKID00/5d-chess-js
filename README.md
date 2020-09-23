# 5D Chess JS

Open source implementation of '5D Chess With Multiverse Time Travel' in the style of Chess.js library.

## Notation and Terminology

Terms used in the notation of 5d Chess JS:

  - Move: A move is considered as a single movement of a piece (Capturing, En Passant, and Castling are considered a single move).
  - Action: A collection of moves that when submitted results in other player's time to play.
  - Action Number: A number starting from 1 that indicates both the current player and how many actions has been taken. Increments by 1 every time an action is played
  - Turn: A movable dimension within the game. A single turn has both white and black actions.
  - Timeline: A movable dimension within the game. Timelines contain multiple boards across turns.
  - Rank: A movable dimension within the game. Same as standard chess.
  - File: A movable dimension within the game. Same as standard chess.

Notation used: `(Action #)(Color). [Turn #][+/- Line #]:(Piece)[Coord]<[+/- New Line #]>[Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece][Dest Coord][Check][En Passant]`

## API

## FAQ

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).

Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).

5D Chess JS in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.
