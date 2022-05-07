import { Chess } from '../index';

test('White Pawn', () => {
  let chess = new Chess();
  chess.import(`
[Size "5x5"]
[Mode "5D"]
[Board "custom"]
[Promotions "Q"]
[5/5/5/5/5:-2:1:w]
[5/5/5/5/5:-2:1:b]
[5/5/5/5/5:-2:2:w]
[5/5/5/5/5:-2:2:b]
[5/5/5/5/5:-2:3:w]
[5/5/2q2/5/5:-1:1:w]
[5/5/5/5/5:-1:1:b]
[5/5/5/5/5:-1:2:w]
[5/5/5/5/5:-1:2:b]
[5/5/2q2/5/5:-1:3:w]
[5/5/5/5/5:0:1:w]
[5/5/5/5/5:0:1:b]
[5/1q1q1/2P*2/5/5:0:2:w]
[5/5/5/5/5:1:1:w]
[5/5/5/5/5:1:1:b]
[5/5/5/5/5:1:2:w]
[5/5/5/5/5:1:2:b]
[5/5/5/5/5:1:3:w]
[5/5/5/5/5:2:1:w]
[5/5/5/5/5:2:1:b]
[5/5/5/5/5:2:2:w]
[5/5/5/5/5:2:2:b]
[5/5/5/5/5:2:3:w]
`);
  const possibleMoves = chess.moves('notation') as string;
  //Single Forward RF
  expect(possibleMoves.includes('c4')).toBe(true);
  //Forward RF Capture
  expect(possibleMoves.includes('xb4')).toBe(true);
  expect(possibleMoves.includes('xd4')).toBe(true);
  //Double Forward RF + Promotion
  expect(possibleMoves.includes('c5=Q')).toBe(true);
  //Single Forward TL
  expect(possibleMoves.includes('(0T2)Pc3>>(-1T2)c3')).toBe(true);
  //Double Forward TL
  expect(possibleMoves.includes('(0T2)Pc3>>(-2T2)c3')).toBe(true);
  //Single Forward TL Capture
  expect(possibleMoves.includes('(0T2)Pc3>x(-1T3)c3')).toBe(true);
  expect(possibleMoves.includes('(0T2)Pc3>>x(-1T1)c3')).toBe(true);
  //Only these 8 moves are possible
  expect(chess.moves().length === 8).toBe(true);
});

test('Black Pawn', () => {
  let chess = new Chess();
  chess.import(`
[Size "5x5"]
[Mode "5D"]
[Board "custom"]
[Promotions "Q"]
[5/5/5/5/5:-2:1:w]
[5/5/5/5/5:-2:1:b]
[5/5/5/5/5:-2:2:w]
[5/5/5/5/5:-2:2:b]
[5/5/5/5/5:-2:3:w]
[5/5/5/5/5:-2:3:b]
[5/5/5/5/5:-1:1:w]
[5/5/5/5/5:-1:1:b]
[5/5/5/5/5:-1:2:w]
[5/5/5/5/5:-1:2:b]
[5/5/5/5/5:-1:3:w]
[5/5/5/5/5:-1:3:b]
[5/5/5/5/5:0:1:w]
[5/5/5/5/5:0:1:b]
[5/5/5/5/5:0:2:w]
[5/5/2p*2/1Q1Q1/5:0:2:b]
[5/5/5/5/5:1:1:w]
[5/5/2Q2/5/5:1:1:b]
[5/5/5/5/5:1:2:w]
[5/5/5/5/5:1:2:b]
[5/5/5/5/5:1:3:w]
[5/5/2Q2/5/5:1:3:b]
[5/5/5/5/5:2:1:w]
[5/5/5/5/5:2:1:b]
[5/5/5/5/5:2:2:w]
[5/5/5/5/5:2:2:b]
[5/5/5/5/5:2:3:w]
[5/5/5/5/5:2:3:b]
`);
  const possibleMoves = chess.moves('notation') as string;
  //Single Forward RF
  expect(possibleMoves.includes('c2')).toBe(true);
  //Forward RF Capture
  expect(possibleMoves.includes('xb2')).toBe(true);
  expect(possibleMoves.includes('xd2')).toBe(true);
  //Double Forward RF + Promotion
  expect(possibleMoves.includes('c1=Q')).toBe(true);
  //Single Forward TL
  expect(possibleMoves.includes('(0T2)Pc3>>(1T2)c3')).toBe(true);
  //Double Forward TL
  expect(possibleMoves.includes('(0T2)Pc3>>(2T2)c3')).toBe(true);
  //Single Forward TL Capture
  expect(possibleMoves.includes('(0T2)Pc3>x(1T3)c3')).toBe(true);
  expect(possibleMoves.includes('(0T2)Pc3>>x(1T1)c3')).toBe(true);
  //Only these 8 moves are possible
  expect(chess.moves().length === 8).toBe(true);
});

test('White Bishop', () => {
  let chess = new Chess();
  chess.import(`
[Size "3x3"]
[Mode "5D"]
[Board "custom"]
[3/3/3:-1:1:w]
[3/3/3:-1:1:b]
[3/3/3:-1:2:w]
[3/3/3:-1:2:b]
[3/3/3:-1:3:w]
[3/3/3:0:1:w]
[3/3/3:0:1:b]
[3/1B1/3:0:2:w]
[3/3/3:1:1:w]
[3/3/3:1:1:b]
[3/3/3:1:2:w]
[3/3/3:1:2:b]
[3/3/3:1:3:w]
`);
  const possibleMoves = chess.moves('notation') as string;
  expect(possibleMoves.includes('(0T2)Bb1')).toBe(false);             //R
  expect(possibleMoves.includes('(0T2)Ba2')).toBe(false);             //F
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)b2')).toBe(false);    //T
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)b2')).toBe(false);   //L
  expect(possibleMoves.includes('(0T2)Ba1')).toBe(true);              //RF
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)b1')).toBe(true);     //RT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)b1')).toBe(true);    //RL
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)a2')).toBe(true);     //FT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)a2')).toBe(true);    //FL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)b2')).toBe(true);    //TL
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)a1')).toBe(false);    //RFT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)a1')).toBe(false);   //RFL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)b1')).toBe(false);   //RTL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)a2')).toBe(false);   //FTL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)a1')).toBe(false);   //RFTL
  //Only 20 moves are possible
  expect(chess.moves().length === 20).toBe(true);
});

test('Black Bishop', () => {
  let chess = new Chess();
  chess.import(`
[Size "3x3"]
[Mode "5D"]
[Board "custom"]
[3/3/3:-1:1:w]
[3/3/3:-1:1:b]
[3/3/3:-1:2:w]
[3/3/3:-1:2:b]
[3/3/3:-1:3:w]
[3/3/3:-1:3:b]
[3/3/3:0:1:w]
[3/3/3:0:1:b]
[3/3/3:0:2:w]
[3/1b1/3:0:2:b]
[3/3/3:1:1:w]
[3/3/3:1:1:b]
[3/3/3:1:2:w]
[3/3/3:1:2:b]
[3/3/3:1:3:w]
[3/3/3:1:3:b]
`);
  const possibleMoves = chess.moves('notation') as string;
  expect(possibleMoves.includes('(0T2)Bb1')).toBe(false);             //R
  expect(possibleMoves.includes('(0T2)Ba2')).toBe(false);             //F
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)b2')).toBe(false);    //T
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)b2')).toBe(false);   //L
  expect(possibleMoves.includes('(0T2)Ba1')).toBe(true);              //RF
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)b1')).toBe(true);     //RT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)b1')).toBe(true);    //RL
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)a2')).toBe(true);     //FT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)a2')).toBe(true);    //FL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)b2')).toBe(true);    //TL
  expect(possibleMoves.includes('(0T2)Bb2>>(0T1)a1')).toBe(false);    //RFT
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T2)a1')).toBe(false);   //RFL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)b1')).toBe(false);   //RTL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)a2')).toBe(false);   //FTL
  expect(possibleMoves.includes('(0T2)Bb2>>(-1T1)a1')).toBe(false);   //RFTL
  //Only 20 moves are possible
  expect(chess.moves().length === 20).toBe(true);
});

//TODO Knights

test('White Rook', () => {
  let chess = new Chess();
  chess.import(`
[Size "3x3"]
[Mode "5D"]
[Board "custom"]
[3/3/3:-1:1:w]
[3/3/3:-1:1:b]
[3/3/3:-1:2:w]
[3/3/3:-1:2:b]
[3/3/3:-1:3:w]
[3/3/3:0:1:w]
[3/3/3:0:1:b]
[3/1R1/3:0:2:w]
[3/3/3:1:1:w]
[3/3/3:1:1:b]
[3/3/3:1:2:w]
[3/3/3:1:2:b]
[3/3/3:1:3:w]
`);
  const possibleMoves = chess.moves('notation') as string;
  expect(possibleMoves.includes('(0T2)Rb1')).toBe(true);              //R
  expect(possibleMoves.includes('(0T2)Ra2')).toBe(true);              //F
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)b2')).toBe(true);     //T
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)b2')).toBe(true);    //L
  expect(possibleMoves.includes('(0T2)Ra1')).toBe(false);             //RF
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)b1')).toBe(false);    //RT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)b1')).toBe(false);   //RL
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)a2')).toBe(false);    //FT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)a2')).toBe(false);   //FL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)b2')).toBe(false);   //TL
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)a1')).toBe(false);    //RFT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)a1')).toBe(false);   //RFL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)b1')).toBe(false);   //RTL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)a2')).toBe(false);   //FTL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)a1')).toBe(false);   //RFTL
  //Only 7 moves are possible
  expect(chess.moves().length === 7).toBe(true);
});

test('Black Rook', () => {
  let chess = new Chess();
  chess.import(`
[Size "3x3"]
[Mode "5D"]
[Board "custom"]
[3/3/3:-1:1:w]
[3/3/3:-1:1:b]
[3/3/3:-1:2:w]
[3/3/3:-1:2:b]
[3/3/3:-1:3:w]
[3/3/3:-1:3:b]
[3/3/3:0:1:w]
[3/3/3:0:1:b]
[3/3/3:0:2:w]
[3/1r1/3:0:2:b]
[3/3/3:1:1:w]
[3/3/3:1:1:b]
[3/3/3:1:2:w]
[3/3/3:1:2:b]
[3/3/3:1:3:w]
[3/3/3:1:3:b]
`);
  const possibleMoves = chess.moves('notation') as string;
  expect(possibleMoves.includes('(0T2)Rb1')).toBe(true);              //R
  expect(possibleMoves.includes('(0T2)Ra2')).toBe(true);              //F
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)b2')).toBe(true);     //T
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)b2')).toBe(true);    //L
  expect(possibleMoves.includes('(0T2)Ra1')).toBe(false);             //RF
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)b1')).toBe(false);    //RT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)b1')).toBe(false);   //RL
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)a2')).toBe(false);    //FT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)a2')).toBe(false);   //FL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)b2')).toBe(false);   //TL
  expect(possibleMoves.includes('(0T2)Rb2>>(0T1)a1')).toBe(false);    //RFT
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T2)a1')).toBe(false);   //RFL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)b1')).toBe(false);   //RTL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)a2')).toBe(false);   //FTL
  expect(possibleMoves.includes('(0T2)Rb2>>(-1T1)a1')).toBe(false);   //RFTL
  //Only 7 moves are possible
  expect(chess.moves().length === 7).toBe(true);
});

//TODO More pieces