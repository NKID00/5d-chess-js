# 5D Chess JS

Open source implementation of '5D Chess With Multiverse Time Travel' in the style of Chess.js library.

## Notation and Terminology

### Terms

Terms used in the notation of 5d Chess JS:

  - Move: A move is considered as a single movement of a piece (Capturing, En Passant, and Castling are considered a single move).
  - Action: A collection of moves that when submitted results in other player's time to play.
  - Action Number: A number starting from 1 that indicates both the current player and how many actions has been taken. Increments by 1 every time an action is played
  - Turn: A movable dimension within the game. A single turn has both white and black actions.
  - Timeline: A movable dimension within the game. Timelines contain multiple boards across turns.
  - Rank: A movable dimension within the game. Same as standard chess.
  - File: A movable dimension within the game. Same as standard chess.

### Notation

Notation used: `(Action #)(Color). (Turn #)[+/- Line #]:(Piece)(Coord)[<+/- New Line #>][Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece](Coord)[Check][En Passant]`

This is the notation for a single move. It should exist as its own separate line. Multiple lines of moves are grouped together as actions

  - `(Action #)` - `[Required]` Action Number, the top move within the referred action is required to indicate which action the move is a part of. Formatted as an integer starting from 1.
  - `(Color). ` - `[Required]` Lowercase character indicating player color (`b` or `w`) of the player that made the move. A `.` and space is required after the character.
  - `(Turn #)` - `[Required]` Turn number of the starting location of the piece to be moved. Formatted as an integer starting from 1.
  - `[+/- Line ]` - Timeline number of the starting location of the piece to be moved. If timeline is 0, nothing should be in the term. A `+` or `-` character is required to precede the number (expressed as integer).
  - `(Piece)` - `[Required]` Piece character as found in SAN notation. Must be capitalized. King is `K` and Knight is `N`.
  - `(Coord)` - `[Required]` Coordinate of starting rank and file of the piece to be moved. Formatted in the SAN notation coordinate system `[a-h][1-8]`. First character must be lowercase.

### Examples

Three examples indicating the same game showcasing notation flexibility.

```
Raw example:             Minified example:    Most minified example:

1w. 1:e2<>1:e3           1w. 1:e2:e3          1w. 1:e2:e3
1b. 1:f7<>1:f6           1b. 1:f7:f6          1b. 1:f7:f6
2w. 2:Nb1<>1:b3          2w. 2:Nb1<>1:b3      2w. 2:Nb1<>1:b3
2b. 1+1:a7<>1+1:a6       2b. 1+1:a7:a6        2b. 1+1:a7:a6
3w. 2+1:c2<>2+1:c3       3w. 2+1:c2:c3        3w. 2+1:c2:c3
3b. 2:Nb8<>2:c6          3b. 2:Nb8:c6         3b. 2:Nb8:c6
3b. 2+1:Nb8<>2+1:c6      3b. 2+1:Nb8:c6           2+1:Nb8:c6
4w. 3:Qd1<>3:h5          4w. 3:Qd1:h5         4w. 3:Qd1:h5
4w. 3+1:Qd1<>3+1:c2#     4w. 3+1:Qd1:c2#          3+1:Qd1:c2#

╔════════╗╔════════╗╔════════╗╔════════╗╔════════╗╔════════╗
║rnbqkbnr║║rnbqkbnr║║rnbqkbnr║║rnbqkbnr║║r bqkbnr║║r bqkbnr║
║pppppppp║║pppppppp║║ppppp pp║║ppppp pp║║ppppp pp║║ppppp pp║
║        ║║        ║║     p  ║║     p  ║║  n  p  ║║  n  p  ║
║        ║║        ║║        ║║        ║║        ║║       Q║
║        ║║        ║║        ║║        ║║        ║║        ║
║        ║║    P   ║║    P   ║║    P   ║║    P   ║║    P   ║
║PPPPPPPP║║PPPP PPP║║PPPP PPP║║PPPP PPP║║PPPP PPP║║PPPP PPP║
║RNBQKBNR║║RNBQKBNR║║RNBQKBNR║║R BQKBNR║║R BQKBNR║║R B KBNR║
╚════════╝╚════════╝╚════════╝╚════════╝╚════════╝╚════════╝
          ╔════════╗╔════════╗╔════════╗╔════════╗╔════════╗
          ║rnbqkbnr║║rnbqkbnr║║rnbqkbnr║║r bqkbnr║║r bqkbnr║
          ║pppppppp║║ ppppppp║║ ppppppp║║ ppppppp║║ ppppppp║
          ║        ║║p       ║║p       ║║p n     ║║p n     ║
          ║        ║║        ║║        ║║        ║║        ║
          ║        ║║        ║║        ║║        ║║        ║
          ║ N      ║║ N      ║║ NP     ║║ NP     ║║ NP     ║
          ║PPPPPPPP║║PPPPPPPP║║PP PPPPP║║PP PPPPP║║PPQPPPPP║
          ║RNBQKBNR║║RNBQKBNR║║RNBQKBNR║║RNBQKBNR║║RNB KBNR║
          ╚════════╝╚════════╝╚════════╝╚════════╝╚════════╝
```

## API

## FAQ

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).

Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).

5D Chess JS in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.
