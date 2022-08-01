const Chess = require('@local/index');

test('Standard Variant Parsing', () => {
    let chess = new Chess();
    chess.import(`
    [Board "Standard - Turn Zero"]
    [Mode "5D"]
    1. (0T1)Ng1f3 / (0T1)Ng8f6
    2. (0T2)d2d4 / (0T2)d7d5
    3. (0T3)Nf3>>(0T1)f4 / (1T1)Ng8f6
    4. (1T2)Nf4d3 / (1T2)Nf6g4
    5. (1T3)Nd3>>(1T2)d5 / (1T3)Ng4>>(1T1)g5
    `);
    expect(chess.export('5dpgn active timeline')).toBe(
        `[Board "Standard - Turn Zero"]\n`
        + `[Mode "5D"]\n`
        + `1. Nf3 / Nf6\n`
        + `2. d4 / d5\n`
        + `3. (0T3)Nf3>>(0T1)f4~ (>L1) / (1T1)Nf6\n`
        + `4. (1T2)Nd3 / (1T2)Ng4\n`
        + `5. (1T3)Nd3>>(1T2)d5 (>L2) / (1T3)Ng4>>(1T1)g5~ (>L-1)`
    );
});

test('Custom Variant Parsing', () => {
    let chess = new Chess();
    chess.import(`
    [Board "Custom"]
    [Mode "5D"]
    [R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:0:b]
    [R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:1:w]
    1. (0T1)Ng1f3 / (0T1)Ng8f6
    2. (0T2)d2d4 / (0T2)d7d5
    3. (0T3)Nf3>>(0T1)f4 / (1T1)Ng8f6
    4. (1T2)Nf4d3 / (1T2)Nf6g4
    5. (1T3)Nd3>>(1T2)d5 / (1T3)Ng4>>(1T1)g5
    `);
    expect(chess.export('5dpgn active timeline')).toBe(
        `[Board "Custom"]\n`
        + `[Mode "5D"]\n`
        + `[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:0:b]\n`
        + `[R*NBQK*BNR*/P*P*P*P*P*P*P*P*/8/8/8/8/p*p*p*p*p*p*p*p*/r*nbqk*bnr*:0:1:w]\n`
        + `1. Nf3 / Nf6\n`
        + `2. d4 / d5\n`
        + `3. (0T3)Nf3>>(0T1)f4~ (>L1) / (1T1)Nf6\n`
        + `4. (1T2)Nd3 / (1T2)Ng4\n`
        + `5. (1T3)Nd3>>(1T2)d5 (>L2) / (1T3)Ng4>>(1T1)g5~ (>L-1)`
    );
});
