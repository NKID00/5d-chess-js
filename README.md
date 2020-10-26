# 5D Chess JS

Open source implementation of '5D Chess With Multiverse Time Travel' in the style of Chess.js library with built-in notation support.

## Demo

Live demo on JSFiddle available [here](https://jsfiddle.net/alexbay218/57drakwg/)

## Installation

### Node.js

Simply install with this command `npm i 5d-chess-js`

To use the library, here is a simple 3 action checkmate example here:

``` js
const Chess = require('5d-chess-js');
var chess = new Chess();
chess.move('1w. 1:e2:e3');
chess.submit();
chess.move('1b. 1:f7:f6');
chess.submit();
chess.move('2w. 2:Qd1:e2');
chess.submit();
chess.move('2b. 2:Nb8:c6');
chess.submit();
chess.move('3w. 3:Qe2:h5');
chess.submit();
chess.print();
console.log(chess.inCheckmate);
```

### In Browser

Include this tag in the HTML before invoking the library:
``` html
<script src="https://unpkg.com/5d-chess-js/dist/5d-chess.js"></script>
```

To use the library, the `Chess` class is exposed in the global scope. Here is the same 3 action checkmate example for in browser use.

``` js
var chess = new Chess();
chess.move('1w. 1:e2:e3');
chess.submit();
chess.move('1b. 1:f7:f6');
chess.submit();
chess.move('2w. 2:Qd1:e2');
chess.submit();
chess.move('2b. 2:Nb8:c6');
chess.submit();
chess.move('3w. 3:Qe2:h5');
chess.submit();
chess.print();
console.log(chess.inCheckmate);
```

## Supported Variants

Currently supported variants:

 - Standard - This uses the standard chess layout (use the string literal "standard" for functions and metadata tag).
 - Defended Pawn - This variant switches the queen and queenside knight (use the string literal "defended_pawn" for functions and metadata tag).

## Notation and Terminology

### Terms

Terms used in the notation of 5d Chess JS:

  - Move - A move is considered as a single movement of a piece (Capturing, En Passant, and Castling are considered a single move).
  - Action - A collection of moves that when submitted results in other player's time to play.
  - Action Number - A number starting from 1 that indicates both the current player and how many actions has been taken. Increments by 1 every time an action is played
  - Turn - A movable dimension within the game. A single turn has both white and black actions.
  - Timeline - A movable dimension within the game. Timelines contain multiple boards across turns.
  - Rank - A movable dimension within the game. Same as standard chess.
  - File - A movable dimension within the game. Same as standard chess.
  - Full Board - A full board is considered as the full board state between actions. Contains all timelines, turns, and singular chessboards with all pieces.

### Notation

Metadata section: `[(Key) "(Value)"]`

This is used to store metadata information about the game in the same style as chess PGN tags.

Valid characters for the Value is alphanumeric characters, `_`, `-`, and `.`.

Valid characters for the Value is alphanumeric characters, `_`, `-`, `/`, `*`, `.`, and space.

The only required metadata is the `Variant` key. This is automatically added on export.

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
[Date "2020.22.2020"]
[Round "1"]
[White "Random Bot"]
[Black "Random Bot"]
[Result "1-0"]
[Variant "defended_pawn"]
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

## API

### Constructor

**Chess([import, variant])**

Creates a new instance of the `Chess` class.

  - import - *[Optional]* List of actions to import. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - variant = *[Optional]* String of variant to use, required if import is not notation string.
  - **Return** - A new `Chess` object.

### Fields

These fields are implemented as a getter function. If getter functions are unsupported on the platform, call these fields as a function instead (example `.board` becomes `.board()`).

**.board**

  - **Return** - Current full board state as a `Board` object.

**.actionNumber**

  - **Return** - Current action number as an integer.

**.boardHistory**

  - **Return** - Array of `Board` objects representing all past and current boards.

**.actionHistory**

  - **Return** - Array of `Action` objects representing all past actions played by both players during the whole game.

**.moveBuffer**

  - **Return** - Array of `Move` objects representing all current moves played by the current player before submitting.

**.player**

  - **Return** - String (either `"white"` or `"black"`) representing the current player.

**.inCheck**

  - **Return** - Boolean indicating if the current board state has the current player in check.

**.inCheckmate**

  - **Return** - Boolean indicating if the current board state has the current player in checkmate (i.e. current player loses).

**.inStalemate**

  - **Return** - Boolean indicating if the current board state has the current player in stalemate.

**.checkmateTimeout**

  - **Return** - Number indicating milliseconds for the max time the checkmate detection can run, this value is writable (Note: This is an actual internal variable and not a getter function)

**.hash**

  - **Return** - String of md5 hash of the board data.

### Functions

**.import(import)**

Imports data to have the internal state match the state that the imported data represents. Since the imported data is a list of actions from the start of the game (accessible through **.actionHistory** or **.export()**), this function effectively replays all actions to arrive at the desired internal state. Action/Move validation occurs at each step, so performance may suffer if the imported data represents a large full board state. Will throw errors.

  - import - List of actions to import (this will reset the internal state). Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - variant = *[Optional]* String of variant to use, required if import is not notation string.
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Nothing.

**.importable(import)**

Check if the imported data is valid and can be imported. Does not modify internal state and will not throw errors.

  - import - List of actions to import (this will reset the internal state). Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Boolean representing if the imported data is valid and can be imported.

**.reset()**

Resets the internal state to the initial full board state.

  - variant = *[Optional]* String of variant to use, required if import is not notation string.
  - **Return** - Nothing.

**.action(action, [skipDetection])**

Plays an action as the current player and submits the move. Will modify internal state and will throw errors.

  - action - The action (list of moves) to play as the current player. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), `Action` object, JSON string of `Action` object, array of `Move` objects, or JSON string of an array of `Move` objects.
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Nothing.

**.actionable(action, [skipDetection])**

Check if an action is playable as the current player and can submit. Does not modify internal state and will not throw errors.

  - action - The action (list of moves) to play as the current player. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Move` objects, or JSON string of an array of `Move` objects.
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Boolean representing if the action is playable and submittable.

**.actions([format, activeOnly, presentOnly, newActiveTimelinesOnly])**

Generate all possible submittable actions. Does not modify internal state, but will throw errors. **Warning! Due to the complexity of 5D chess, performance may severely suffer if the full board is large enough. Calling this function with more than 3 present timelines is not advised.**

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return. Valid formats are: `"object"`, `"json"`, `"notation"`, or `"notation_short"`.
  - activeOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves in the action come from only active timelines.
  - presentOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves in the action come from only present timelines (will override `activeOnly` argument).
  - newActiveTimelinesOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if the action will only create active timelines (i.e. cannot create inactive timelines).
  - **Return** - List of actions. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.

**.checks([format])**

Generate all opponent moves that can capture the king (assuming a null move on any present timelines that still have not advanced). Does not modify internal state, but will throw errors.

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return. Valid formats are: `"object"`, `"json"`, `"notation"`, or `"notation_short"`.

**.move(move)**

Plays an move as the current player. Will modify internal state and will throw errors.

  - move - The move to play as the current player. Can be a notation string, `Move` object, or JSON string of a `Move` object.
  - **Return** - Nothing.

**.moveable(action, [skipDetection])**

Check if a move is playable as the current player and can submit. Does not modify internal state and will not throw errors.

  - move - The move to play as the current player. Can be a notation string, `Move` object, or JSON string of a `Move` object.
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Boolean representing if the move is playable.

**.moves([format, activeOnly, presentOnly, skipDetection])**

Generate all possible moves. Does not modify internal state, but will throw errors.

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return. Valid formats are: `"object"`, `"json"`, `"notation"`, or `"notation_short"`.
  - activeOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves come from only active timelines.
  - presentOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves come from only present timelines (will override `activeOnly` argument).
  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - List of moves. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Move` objects, or JSON string of an array of `Move` objects.

**.submit([skipDetection])**

Submit all moves in move buffer and switch the current player to the other player. Advances the action number counter. Will modify internal state and will throw errors.

  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Nothing.

**.submittable([skipDetection])**

Check if the player can submit all moves in move buffer. Does not modify internal state and will not throw errors.

  - skipDetection - *[Optional]* Defaults to false, this argument indicating whether to check for checkmate and stalemate as part of validation (primarily used to prevent checkmate detection multiple times).
  - **Return** - Boolean representing if the current internal state is submittable.

**.undo()**

Undo the latest move in the move buffer. Will modify internal state and will throw errors.

  - **Return** - Nothing.

**.undoable()**

Check if the current internal state allows undoing. Does not modify internal state and will not throw errors.

  - **Return** - Boolean representing if the current player can undo current internal state.

**.export([format])**

Return exportable data as a list of all actions the both players have played during the whole game.

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return. Valid formats are: `"object"`, `"json"`, `"notation"`, or `"notation_short"`.
  - **Return** - List of actions. Can be notation string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.

**.print()**

Print the current internal state to console through `console.log()` function.

  - **Return** - Nothing.

### Schemas

These schemas define the various object types that the API interacts with.

**Position**

``` js
{
  timeline: Integer,                                          // Timeline number of the position, 0 is neutral, negative integers are for black and positive integers are for white.
  turn: Integer,                                              // Turn number of the position, starts from 1.
  player: String Enum ['white','black'],                      // Indicates the player that the turn belongs to.
  coordinate: String SAN Coordinate ['(a-h)(1-8)'),           // SAN Coordinate of the rank and file of this position.
  rank: Integer,                                              // Rank number of the position, range is from 1 to 8 (same as rank component of a SAN Coordinate).
  file: Integer                                               // File number of the position, range is from 1 to 8 (a = 1, b = 2, etc).
}
```

**Move**

``` js
{
  start: Position,                                            // Position object of the starting location of the move.
  end: Position,                                              // Position object of the end location of the move.
  player: String Enum ['white','black'],                      // Indicates the player that is making the move.
  promotion: null || String SAN Piece ['B','N','R','Q','K'],  // SAN Piece character of the piece to promote to during pawn promotion. Null if move is not promotion.
  enPassant: null || Position,                                // Position object of the location of the piece captured during pawn En Passant movement. Null if move is not En Passant.
  castling: null || Object,                                   // Object containing start and end position object of rook movement during castling. Null if move is not castling.
    start: Position,                                          // Position object of the starting location of the rook movement during castling.
    end: Position                                             // Position object of the end location of the rook movement during castling.
}
```

**Action**

``` js
{
  action: Integer,                                            // Action number of the action.
  player: String Enum ['white','black'],                      // Indicates the player that is making the action.
  moves: Array,                                               // Array of Move objects (ordered from first move to the last)
    items: Move
}
```

**Piece**

``` js
{
  piece: String SAN Piece ['B','N','R','Q','K'],              // SAN Piece character of the piece (empty character is pawn).
  player: String Enum ['white','black'],                      // Indicates the player that the piece belongs to.
  position: Position,                                         // Position object of the location of the piece on a board.
  hasMoved: Boolean                                           // Indicate if the piece has moved
}
```

**Turn**

``` js
{
  turn: Integer,                                              // Turn number of the position, starts from 1.
  player: String Enum ['white','black'],                      // Indicates the player that the turn belongs to.
  pieces: Array,                                              // Array of Piece objects
    items: Piece
}
```

**Timeline**

``` js
{
  timeline: Integer,                                          // Timeline number of the timeline, 0 is neutral, negative integers are for black and positive integers are for white.
  player: String Enum ['white','black'],                      // Indicates the player that made the timeline.
  active: Boolean,                                            // Indicates if the timeline is currently active
  present: Boolean,                                           // Indicate if the timeline is currently present
  turns: Array,                                               // Array of Turn objects
    items: Turn
}
```

**Board**

``` js
{
  action: Integer,                                            // Action number of the player that is making the next action.
  player: String Enum ['white','black'],                      // Indicates the player that is making the next action.
  timelines: Array,                                           // Array of Timeline Objects
    items: Timeline
}
```

## Internal Raw Format

This library had a previous first attempt. It had a more traditional object-based format similar to the `Board` object format. This resulted in terrible performance, especially in generating actions.
This version uses a 4D array to store the full board state, with numbers as the piece indicator.

Here is the format: `board[timeline][turn][rank][file] = piece`
  - Timeline: starts from 0 (0, +1, +2, +3 => 0, 2, 4, 6 and -1, -2, -3 => 1, 3, 5)
  - Turn: starts from 0 (white player: 1, 2, 3 => 0, 2, 4 and black player: 1, 2, 3 => 1, 3, 5)
  - Rank: starts from 0 (1, 2, 3 => 7, 6 ,5)
  - File: start from 0 (a, b, c => 0, 1, 2)
  - Piece:
    - Pawn: (white player: -2 [unmoved], 2 and black player: -1 [unmoved], 1)
    - Bishop: (white player: 4 and black player: 3)
    - Knight: (white player: 6 and black player: 5)
    - Rook: (white player: -8 [unmoved], 8 and black player: -7 [unmoved], 7)
    - Queen: (white player: 10 and black player: 9)
    - King: (white player: -12 [unmoved], 12 and black player: -11 [unmoved], 11)

## FAQ

### Is it any good?

Yes (maybe).

### You incorrectly evaluated this full board as a checkmate (or not a checkmate)!

If you can provide me an action list (object, json, or notation) or the full board state, and submit it as an issue, I can get right on it. This goes for any other bugs. A good way to verify if it is correct or not is to repeat the same moves in the same order in '5D Chess With Multiverse Time Travel' and see if it matches this library.

### Why is this on GitLab instead of GitHub?

I made the switch from GitHub to GitLab mid 2019 when I was starting a new long term project called KSS. Back then, GitHub did not have many of the features it does now, such as integrated CI/CD and more. GitLab was the superior product in almost every way. Furthermore, as a believer in the open source, it seem ironic that open source software would be hosted on closed source platforms. With GitLab being open source, I can be sure that if GitLab.org crumbles, I can still maintain the overall project structure via GitLab instances. This allows me to preserve the Git repo itself, but also the issues, labels, rules, pipelines, etc. that are fundamental to a project. With GitHub, developers do not have this guarantee and they also do not have full control over their project structure.

For a (biased, but not untrue) comparison, visit this link [here](https://about.gitlab.com/devops-tools/github/decision-kit.html)

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).

Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).

5D Chess JS in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.

## Copyright

All source code is released under AGPL v3.0 (license can be found under the `LICENSE` file).

Any addition copyrightable material not covered under AGPL v3.0 is released under CC BY-SA.
