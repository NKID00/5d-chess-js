## Notation (Depreciated)

**Warning! This notation system is depreciated. It is recommended to use 5dpgn instead (see https://github.com/adri326/5dchess-notation)**

Metadata section: `[(Key) "(Value)"]`

This is used to store metadata information about the game in the same style as chess PGN tags.

Valid characters for the Key are alphanumeric characters, `_`, `-`, and `.`.

Valid characters for the Value are alphanumeric characters, `_`, `-`, `/`, `*`, `.`, and space.

The only required metadata is the `Board` key. This is automatically added on export.

Recommended tags are the STR set (Seven Tag Roster):

 - `Event` - The name of the tournament or match event.
 - `Site` - The location of the event. This is in City, Region COUNTRY format, where COUNTRY is the three-letter International Olympic Committee code for the country. An example is New York City, NY USA. For Internet play, use 'Internet' as the value. Use '??' for unknown values.
 - `Date` - The starting date of the game, in YYYY.MM.DD form. Use '??' for unknown values.
 - `Round` - The playing round ordinal of the game within the event.
 - `White` - The player of the white pieces, in Lastname, Firstname format (may be anything for bots or usernames).
 - `Black` - The player of the black pieces, same format as White.
 - `Result` - The result of the game. Recorded as White score, dash, then Black score, or * (other, e.g., the game is ongoing).

```
Example:

[Event "Random Bot Test"]
[Site "Internet"]
[Date "2020.10.22"]
[Round "1"]
[White "Random Bot"]
[Black "Random Bot"]
[Result "1-0"]
[Board "Standard - Defended Pawn"]
```

Notation used: `(Action #)(Color). (Turn #)[+/- Line #]:[Piece](Coord)[<+/- New Line #>][Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece](Dest Coord)[En Passant][Check/Checkmate/Stalemate]`

This is the notation for a single move. To delimit between moves, either a newline or semicolon is acceptable.

 - `(Action #)` - **[Required]** Action Number, the all moves within the referred action are required to indicate which action the move is a part of. Formatted as an integer starting from 1.
  - `(Color). ` - **[Required]** Lowercase character indicating player color (`b` or `w`) of the player that made the move. A `.` and space is required after the character.
  - `(Turn #)` - **[Required]** Turn number of the starting location of the piece to be moved. Formatted as an integer starting from 1.
  - `[+/- Line #]` - Timeline number of the starting location of the piece to be moved. If timeline is 0, nothing should be in the term. A `+` or `-` character is required to precede the number (expressed as integer).
  - `[Piece]` - Piece character as found in SAN notation. Must be capitalized. King is `K` and Knight is `N` (pawn is an empty character). This term is not strictly required within library usage and is used for human readability purposes.
  - `(Coord)` - **[Required]** Coordinate of starting rank and file of the piece to be moved. Formatted in the SAN notation coordinate system `[a-h][1-8]`. First character must be lowercase.
  - `[<+/- New Line #>]` - Timeline number of newly created timelines. This term is required if new timelines are created or the destination location has a different turn and/or timeline of the starting location (in this case, if no timeline is created, `<>` is used). The internal number (within the `<>` separator), is not strictly required within library usage and is used for human readability purposes.
  - `[Dest Turn #]` - Turn number of destination location. Required if this term is different from starting location. Same format as `(Turn #)` (see above).
  - `[Dest +/- Line #]` - Timeline number of destination location. Required if this term is different from starting location. Same format as `[+/- Line #]` (see above).
  - `[Capture]` - Indicate if this movement captures a piece. If this move captures a piece, the character `x` is used. This term is not strictly required within library usage and is used for human readability purposes.
  - `[Promotion Piece]` - Used during pawn promotion to indicate what piece type the pawn is being promoted to. Same as above, the piece character is the same as SAN notation. Must be capitalized. Knight is still a `N`. Strictly required during promotion.
  - `(Dest Coord)` - **[Required]** Coordinate of destination rank and file of the piece to be moved. Same format as `(Coord)` (see above).
  - `[En Passant]` - Indicate if move is an En Passant capture. Characters in use is `e.p.`. Strictly required during En Passant capture.
  - `[Check/Checkmate/Stalemate]` - Indicate if the action this move belongs to results in check, checkmate, or stalemate for the opponent. Check is `+`, checkmate is `#`, and stalemate is `=`. The library will attach this term to the last move within the action. This term is not strictly required within library usage and is used for human readability purposes.

Notation exceptions for castling:

  - Queenside Castling: `(Action #)(Color). (Turn #)[+/- Line #]:0-0-0`
  - Kingside Castling: `(Action #)(Color). (Turn #)[+/- Line #]:0-0`

### Examples

Three examples indicating the same game showcasing notation flexibility.

```
Raw example:             Minified example:

1w. 1:e2<>1:e3           1w. 1:e2:e3
1b. 1:f7<>1:f6           1b. 1:f7:f6
2w. 2:Nb1<+1>1:b3        2w. 2:Nb1<>1:b3
2b. 1+1:a7<>1+1:a6       2b. 1+1:a7:a6
3w. 2+1:c2<>2+1:c3       3w. 2+1:c2:c3
3b. 2:Nb8<>2:c6          3b. 2:Nb8:c6
3b. 2+1:Nb8<>2+1:c6      3b. 2+1:Nb8:c6
4w. 3:Qd1<>3:h5          4w. 3:Qd1:h5
4w. 3+1:Qd1<>3+1:c2#     4w. 3+1:Qd1:c2#

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

Run this example using:

``` js
const Chess = require('5d-chess-js');
var chess = new Chess('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Nb1<>1:b3\n2b. 1+1:a7:a6\n3w. 2+1:c2:c3\n3b. 2:Nb8:c6\n3b. 2+1:Nb8:c6\n4w. 3:Qd1:h5\n4w. 3+1:Qd1:c2#');
chess.print();
```
