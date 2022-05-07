import { Chess } from '../index';

test('Simple moves', () => {
    let chess = new Chess();
    chess.move('a4');
    chess.submit();
    expect(removeHeaders(chess.export())).toBe('1. a4');

    chess.move('d6');
    chess.submit();
    expect(removeHeaders(chess.export())).toBe('1. a4 / d6');

    chess.move('(0T2)Nb1>>(0T1)b3');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe('1. a4 / d6\n2. (0T2)Nb1>>(0T1)b3~ (>L1)');

    chess.move('(1T1)e6');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe('1. a4 / d6\n2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6');

    chess.move('(1T2)Nb3>>(0T2)b5');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe('1. a4 / d6\n2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n3. (1T2)Nb3>>(0T2)b5 (>L2)');

    chess.move('(0T2)d5');
    chess.move('(1T2)e5');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        '1. a4 / d6\n'
        + '2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n'
        + '3. (1T2)Nb3>>(0T2)b5 (>L2) / (0T2)d5 (1T2)e5'
    );

    chess.move('(0T3)Ra3');
    chess.move('(1T3)Nc3');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        '1. a4 / d6\n'
        + '2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n'
        + '3. (1T2)Nb3>>(0T2)b5 (>L2) / (0T2)d5 (1T2)e5\n'
        + '4. (0T3)Ra3 (1T3)Nc3'
    );

    chess.move('(0T3)Qd8>(1T3)e7')
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        '1. a4 / d6\n'
        + '2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n'
        + '3. (1T2)Nb3>>(0T2)b5 (>L2) / (0T2)d5 (1T2)e5\n'
        + '4. (0T3)Ra3 (1T3)Nc3 / (0T3)Qd8>(1T3)e7'
    );

    chess.move('(1T4)Nd5');
    chess.move('(0T4)Re3');
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        '1. a4 / d6\n'
        + '2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n'
        + '3. (1T2)Nb3>>(0T2)b5 (>L2) / (0T2)d5 (1T2)e5\n'
        + '4. (0T3)Ra3 (1T3)Nc3 / (0T3)Qd8>(1T3)e7\n'
        + '5. (1T4)Nd5 (0T4)Re3'
    );

    chess.move('(1T4)Qe7>>(1T3)e7');
    chess.move('(2T2)Nc6')
    chess.submit();
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        '1. a4 / d6\n'
        + '2. (0T2)Nb1>>(0T1)b3~ (>L1) / (1T1)e6\n'
        + '3. (1T2)Nb3>>(0T2)b5 (>L2) / (0T2)d5 (1T2)e5\n'
        + '4. (0T3)Ra3 (1T3)Nc3 / (0T3)Qd8>(1T3)e7\n'
        + '5. (1T4)Nd5 (0T4)Re3 / (1T4)Qe7>>(1T3)e7~ (~T2) (>L-1) (2T2)Nc6'
    );
});

test('Reformat', () => {
    let chess = new Chess();
    chess.import(`
    [Board "Standard"]
    [Mode "5D"]
    1. Nf3 / Nf6
    2. d4 / d5
    3. (0T3)Nf3>>(0T1)f4 (~T2) (>L1) / (1T1)Nf6
    4. (1T2)Nd3 / (1T2)Ng4
    5. (1T3)Nd3>>(1T2)d5 (>L2) / (1T3)Ng4>>(1T1)g5 (~T4) (>L-1)
    `);
    expect(removeHeaders(chess.export('5dpgn active timeline'))).toBe(
        `1. Nf3 / Nf6\n`
        + `2. d4 / d5\n`
        + `3. (0T3)Nf3>>(0T1)f4~ (>L1) / (1T1)Nf6\n`
        + `4. (1T2)Nd3 / (1T2)Ng4\n`
        + `5. (1T3)Nd3>>(1T2)d5 (>L2) / (1T3)Ng4>>(1T1)g5~ (>L-1)`
    );
});

function removeHeaders(str) {
    return str.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('[')).join('\n').trim();
}
