/*! # FEN Conversion utilities

    This module contains a few functions allowing the conversion from/to 5DFEN.

    The FEN format is described in [fen.ebnf](../fen.ebnf).
*/

exports.TO_FEN = ['', 'p', 'P', 'b', 'B', 'n', 'N', 'r', 'R', 'q', 'Q', 'k', 'K', 's', 'S'];
exports.FROM_FEN = {
    'p': 1,
    'P': 2,
    'b': 3,
    'B': 4,
    'n': 5,
    'N': 6,
    'r': 7,
    'R': 8,
    'q': 9,
    'Q': 10,
    'k': 11,
    'K': 12,
    's': 13,
    'S': 14
};
exports.OMMIT_UNMOVED = [
    true,           //none
    false, false,   //pawn
    true, true,     //bishop
    true, true,     //knight
    false, false,   //rook
    true, true,     //queen
    false, false,   //king
    true, true,     //princess
];

/**
    Converts a raw turn (`turn`) into a 5DFEN board string.
**/
exports.toFen = (turnObj, l, t) => {
    let blanks = 0;
    let res = '';
    for (let row of turnObj) {
        for (let piece of row) {
            if (piece == 0) {
                blanks++;
            } else if (blanks > 0) {
                res += blanks.toString(10);
                blanks = 0;
            }

            if (piece != 0) {
                let unmoved = piece < 0;
                piece = Math.abs(piece);
                if (exports.TO_FEN[piece]) {
                    res += exports.TO_FEN[piece];
                } else {
                    res += '?';
                }
                if (unmoved && !exports.OMMIT_UNMOVED[piece]) {
                    res += '*';
                }
            }
        }
        if (blanks > 0) {
            res += blanks.toString(10);
            blanks = 0;
        }
        res += '/';
    }
    res = res.slice(0, -1); // remove the last `/`

    res += ':';

    if (l % 2 === 1) {
        l = -(l + 1) / 2;
    } else {
        l /= 2;
    }

    if (l > 0) {
        res += '+' + Math.floor(l);
    } else if (l < 0) {
        res += '-' + Math.floor(-l);
    } else {
        res += '0';
    }

    res += ':';
    res += Math.floor(t / 2) + 1;
    res += ':';
    res += t % 2 ? 'b' : 'w';

    return `[${res}]`;
}

/**
    Converts a 5DFEN board string into its corresponding internal board and position.
**/
exports.fromFen = (raw, width = 8, height = 8) => {
    if (typeof raw !== 'string') {
        throw new Error("TypeError: expected argument `raw` to be of type `string`, got: " + typeof raw);
    }
    if (raw.startsWith('[') && raw.endsWith(']')) {
        raw = raw.slice(1, -1);
    }
    let split = raw.split(':');
    if (split.length !== 4) {
        throw new Error("SyntaxError: raw 5DFEN board string doesn't have 4 fields.");
    }
    let rows = split[0].split('/');
    if (rows.length !== height) {
        throw new Error("SyntaxError: the amount of rows isn't equal to the height of the board, did you forget a slash (/) or to set the `size` header?");
    }
    let board = [];
    for (let raw_row of rows) {
        let row = [];
        while (raw_row.length) {
            let match;
            if (match = /^\d+/.exec(raw_row)) {
                raw_row = raw_row.slice(match[0].length);
                for (let n = 0; n < +match[0]; n++) {
                    row.push(0);
                }
            } else if (match = /^([a-zA-Z]\+?)(\*?)/.exec(raw_row)) {
                raw_row = raw_row.slice(match[0].length);
                let piece = exports.FROM_FEN[match[1]];
                if (!piece) {
                    throw new Error(`SyntaxError: invalid piece '${match[1]}'`);
                }
                row.push(match[2] ? -piece : piece);
            } else {
                throw new Error(`SyntaxError: unexpected character: '${raw_row[0]}'`)
            }
        }
        if (row.length !== width) {
            throw new Error("SyntaxError: row doesn't have the right width, did you forget a slash (/) or to set the `size` header?");
        }
        board.push(row);
    }
    var reversedTurn = [];
    for(var i = board.length - 1;i >= 0;i--) {
        reversedTurn.push(board[i]);
    }

    let l;
    if (split[1] === '-0' || split[1] === '+0') {
        l = 0;
    } else {
        l = +split[1];
    }

    if (isNaN(l)) {
        throw new Error("Invalid FEN timeline: " + split[1]);
    } else if (l < 0) {
        l = -l * 2 - 1;
    } else {
        l *= 2;
    }

    let t = +split[2] * 2;

    if (isNaN(t)) {
        throw new Error("Invalid FEN turn: " + split[2]);
    }

    if (split[3] === 'w') {
        t -= 2;
    } else if (split[3] === 'b') {
        t -= 1;
    } else {
        throw new Error("Invalid FEN color: " + split[3]);
    }

    return [reversedTurn, l, t];
}

