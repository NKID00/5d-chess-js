import { Chess } from '../index';

test('Test simple 3 action checkmate', () => {
  var chess = new Chess();
  chess.move('e3');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('f6');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Qe2');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Nc6');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Qh5');
  chess.submit();
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(true);
});

test('Test simple 3 action check but not checkmate', () => {
  var chess = new Chess();
  chess.move('a3');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('a6');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('e3');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('f5');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Qe2');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Nf6');
  chess.submit();
  expect(chess.inCheck).toBe(false);
  expect(chess.inCheckmate).toBe(false);
  chess.move('Qh5');
  chess.submit();
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(false);
});

test('Test check but not checkmate', () => {
  var chess = new Chess();
  //chess.import('1w. 1:d2:d4\n1b. 1:c7:c5\n2w. 2:Bc1:f4\n2b. 2:Nb8:c6\n3w. 3:Nb1:c3\n3b. 3:c5:xd4\n4w. 4:Nc3:d5\n4b. 4:Qd8:a5\n5w. 5:Bf4:d2\n5b. 5:Qa5:xd5\n6w. 6:Ng1:f3\n6b. 6:e7:e6\n7w. 7:g2:g3\n7b. 7:Bf8:b4\n8w. 8:c2:c3\n8b. 8:d4:xc3\n9w. 9:b2:xc3\n9b. 9:Qd5:c5\n10w. 10:c3:xb4\n10b. 10:Qc5<-1>7:xf2+\n11w. 8-1:Ke1:xf2\n11b. 8-1:d4:d3\n12w. 9-1:e2:e3\n12b. 9-1:Nc6:e5\n13w. 11:Bd2<+1>8:xd5\n13b. 8+1:Ng8:e7\n14w. 9+1:Bd2:xb4\n14b. 9+1:Nc6:xb4\n15w. 10-1:Bf1:g2\n15w. 10+1:Nf3:e5\n15b. 10-1:Qd5<>+1:xd5\n16w. 11-1:Nf3:xe5\n16w. 11+1:Ne5:xf7\n16b. 11-1:Ng8:f6\n16b. 11:Ng8:f6\n16b. 11+1:Nb4:xc2\n17w. 12-1:Ne5<>+0:c5\n17w. 12+1:Qd1:xc2\n17b. 12+1:Qd5:b5\n17b. 12:Nf6:g4\n17b. 12-1:Nf6:g4\n18w. 13:Nc5<>+1:c7\n18w. 13-1:Qd1:xg4\n18b. 13:Bc8<>+1:xc7\n18b. 13-1:Bf8:c5\n19w. 14-1:Qg4:xe6\n19w. 14:Qd1:xd7\n19w. 14+1:Qc2:xc7');
  chess.import('1. d4 / c5 2. Bf4 / Nc6 3. Nc3 / cxd4 4. Nd5 / Qa5 5. Bd2 / Qxd5 6. Nf3 / e6 7. g3 / Bb4 8. c3 / dxc3 9. bxc3 / Qc5 10. cxb4 / (0T10)Qc5>>x(0T7)f2 11. (-1T8)Kxf2 / (-1T8)d3 12. (-1T9)e3 / (-1T9)Ne5 13. (0T11)Bd2>>x(0T8)d5 / (1T8)Nge7 14. (1T9)Bxb4 / (1T9)Nxb4 15. (-1T10)Bg2 (1T10)Ne5 / (-1T10)Qd5>x(1T10)d5 16. (-1T11)Nxe5 (1T11)Nxf7 / (-1T11)Nf6 (0T11)Nf6 (1T11)Nxc2 17. (-1T12)Ne5>(0T12)c5 (1T12)Qxc2 / (1T12)Qb5 (0T12)Ng4 (-1T12)Ng4 18. (0T13)Nc5>(1T13)c7 (-1T13)Qxg4 / (0T13)Bc8>x(1T13)c7 (-1T13)Bc5 19. (-1T14)Qxe6 (0T14)Qxd7 (1T14)Qxc7');
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(false);
  //chess.import('1w. 1:d2:d4\n1b. 1:c7:c5\n2w. 2:Bc1:f4\n2b. 2:Nb8:c6\n3w. 3:Nb1:c3\n3b. 3:c5:xd4\n4w. 4:Nc3:d5\n4b. 4:Qd8:a5\n5w. 5:Bf4:d2\n5b. 5:Qa5:xd5\n6w. 6:Ng1:f3\n6b. 6:e7:e6\n7w. 7:g2:g3\n7b. 7:Bf8:b4\n8w. 8:c2:c3\n8b. 8:d4:xc3\n9w. 9:b2:xc3\n9b. 9:Qd5:c5\n10w. 10:c3:xb4\n10b. 10:Qc5<-1>7:xf2+\n11w. 8-1:Ke1:xf2\n11b. 8-1:d4:d3\n12w. 9-1:e2:e3\n12b. 9-1:Nc6:e5\n13w. 11:Bd2<+1>8:xd5\n13b. 8+1:Ng8:e7\n14w. 9+1:Bd2:xb4\n14b. 9+1:Nc6:xb4\n15w. 10-1:Bf1:g2\n15w. 10+1:Nf3:e5\n15b. 10-1:Qd5<>+1:xd5\n16w. 11-1:Nf3:xe5\n16w. 11+1:Ne5:xf7\n16b. 11-1:Ng8:f6\n16b. 11:Ng8:f6\n16b. 11+1:Nb4:xc2\n17w. 12-1:Ne5<>+0:c5\n17w. 12+1:Qd1:xc2\n17b. 12+1:Qd5:b5\n17b. 12:Nf6:g4\n17b. 12-1:Nf6:g4\n18w. 13:Nc5<>+1:c7\n18w. 13-1:Qd1:xg4\n18b. 13:Bc8<>+1:xc7\n18b. 13-1:Bf8:c5\n19w. 14-1:Qg4:xe6\n19w. 14:Qd1:xd7\n19w. 14+1:Qc2:xc7\n19b. 14+1:Qb5<-2>11:xb2\n20w. 15+1:Qc7<>12-2:f4\n20b. 12-2:Qb2:c3\n21w. 13-2:Qf4:d2\n21b. 13-2:Nb4:xc2\n22w. 14-2:Qd1:xc2\n22b. 14-2:Qd5<>+0:xd7\n22b. 14-1:f7:xe6\n23w. 15-1:Bd2<>+0:d3\n23w. 15-2:Qc2:xc3\n23b. 15-2:0-0\n23b. 15-1:0-0\n23b. 15:Qd7:d6\n23b. 15+1:0-0\n24w. 16+1:Nf7<>-1:xf8\n24w. 16:a2:a3\n24w. 16-2:Qc3:xd4\n24b. 16+1:Rf8<>-1:xf8\n24b. 16:Nc6:xb4\n24b. 16-2:Rf8:xf7\n25w. 17-2:Qd4<>+0:xd6\n25w. 17-1:Bg2:f3\n25w. 17+1:Bf1:h3\n25b. 17-2:Rf7<>-1:f7\n25b. 17:Nb4:xd3\n25b. 17+1:Ne7:d5\n26w. 18-2:Qd2:g5\n26w. 18-1:c2:xd3\n26w. 18:e2:xd3\n26w. 18+1:Bh3:xe6\n26b. 18+1:d7:xe6\n26b. 18:Ng4:e3\n26b. 18-1:Rf7:xf3\n26b. 18-2:Ne7:c6\n27w. 19:f2:xe3\n27w. 19-2:Qg5<+2>+0:e7\n27w. 19+1:0-0\n27w. 19-1:Kf2:e1\n27b. 19+1:Bc8<-3>14:c3+\n28w. 15-3:b2:xc3\n28b. 15-3:0-0\n29w. 16-3:Nf7:h6\n29b. 16-3:g7:xh6\n30w. 17-3:e2:e3\n30b. 17-3:Qb5:f5\n31w. 18-3:Qc7:f4\n31b. 18-3:Qf5:xf4\n32w. 19-3:g3:xf4');
  chess.import('1. d4 / c5 2. Bf4 / Nc6 3. Nc3 / cxd4 4. Nd5 / Qa5 5. Bd2 / Qxd5 6. Nf3 / e6 7. g3 / Bb4 8. c3 / dxc3 9. bxc3 / Qc5 10. cxb4 / (0T10)Qc5>>x(0T7)f2 11. (-1T8)Kxf2 / (-1T8)d3 12. (-1T9)e3 / (-1T9)Ne5 13. (0T11)Bd2>>x(0T8)d5 / (1T8)Nge7 14. (1T9)Bxb4 / (1T9)Nxb4 15. (-1T10)Bg2 (1T10)Ne5 / (-1T10)Qd5>x(1T10)d5 16. (-1T11)Nxe5 (1T11)Nxf7 / (-1T11)Nf6 (0T11)Nf6 (1T11)Nxc2 17. (-1T12)Ne5>(0T12)c5 (1T12)Qxc2 / (1T12)Qb5 (0T12)Ng4 (-1T12)Ng4 18. (0T13)Nc5>(1T13)c7 (-1T13)Qxg4 / (0T13)Bc8>x(1T13)c7 (-1T13)Bc5 19. (-1T14)Qxe6 (0T14)Qxd7 (1T14)Qxc7 / (1T14)Qb5>>x(1T11)b2 20. (1T15)Qc7>(-2T12)f4 / (-2T12)Qc3 21. (-2T13)Qfd2 / (-2T13)Nxc2 22. (-2T14)Q1xc2 / (-2T14)Qd5>x(0T14)d7 (-1T14)fxe6 23. (-1T15)Bd2>(0T15)d3 (-2T15)Qcxc3 / (-2T15)O-O (-1T15)O-O (0T15)Qd6 (1T15)O-O 24. (1T16)Nf7>x(-1T16)f8 (0T16)a3 (-2T16)Qcxd4 / (1T16)Rf8>x(-1T16)f8 (0T16)Nxb4 (-2T16)Rxf7 25. (-2T17)Qd4>x(0T17)d6 (-1T17)Bf3 (1T17)Bh3 / (-2T17)Rf7>(-1T17)f7 (0T17)Nxd3 (1T17)Nd5 26. (-2T18)Qg5 (-1T18)cxd3 (0T18)exd3 (1T18)Bxe6 / (1T18)dxe6 (0T18)Ne3 (-1T18)Rxf3 (-2T18)Nc6 27. (0T19)fxe3 (-2T19)Qg5>>(0T19)e7 (1T19)O-O (-1T19)Ke1 / (1T19)Bc8>>(1T14)c3 28. (-3T15)bxc3 / (-3T15)O-O 29. (-3T16)Nh6 / (-3T16)gxh6 30. (-3T17)e3 / (-3T17)Qf5 31. (-3T18)Qf4 / (-3T18)Qxf4 32. (-3T19)gxf4');
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(false);
  //chess.import('1w. 1:e2:e3\n1b. 1:h7:h5\n2w. 2:a2:a4\n2b. 2:h5:h4\n3w. 3:c2:c3\n3b. 3:h4:h3\n4w. 4:Ng1:f3\n4b. 4:h3:xg2\n5w. 5:Bf1:xg2\n5b. 5:Rh8:xh2\n6w. 6:Nf3:xh2\n6b. 6:g7:g5\n7w. 7:Bg2<+1>6:g1\n7b. 6+1:Rh2:xh1\n8w. 7+1:Bg2:xh1\n8b. 7+1:g7:g5\n8b. 7:g5:g4\n9w. 8+1:Nf3:xg5\n9w. 8:Qd1:c2\n9b. 8+1:f7:f5\n9b. 8:g4:g3\n10w. 9:Qc2:h7\n10w. 9+1:Qd1:h5\n10b. 9:f7<>+1:f7\n11w. 10+1:Qh5<+2>9:g6\n11w. 10:f2:xg3\n11b. 10+1:f5:f4\n11b. 10:e7:e5\n12w. 11:Qh7:g6\n12w. 11+1:Bh1:d5\n12b. 11+1:Ng8<>+0:xg6\n13w. 12+1:Bd5:xf7\n13w. 12:a4:a5\n13b. 12:Bf8<-1>6:xf2+\n14w. 7-1:Ke1:xf2\n14b. 7-1:g7:g5\n15w. 8-1:Bg2:xb7\n15b. 8-1:Ng8<-2>7:g6\n16w. 8-2:Bg2:xb7\n16b. 8-2:Ng6:f4\n17w. 9-1:Bb7<+3>8:xc7\n17b. 8+3:Qd8:xc7\n18w. 9-2:e3:xf4\n18w. 9+3:Bg2:xb7\n18b. 9-1:Nb8<-3>8:b6+\n19w. 9-3:Kf2:f3\n19b. 9-3:Nb6<-4>8-1:b6\n20w. 9-4:Qd1<+4>+0:h5+');
  chess.import('1. e3 / h5 2. a4 / h4 3. c3 / h3 4. Nf3 / hxg2 5. Bxg2 / Rxh2 6. Nxh2 / g5 7. (0T7)Bg2>>(0T6)g1 / (1T6)Rxh1 8. (1T7)Bxh1 / (1T7)g5 (0T7)g4 9. (1T8)Nxg5 (0T8)Qc2 / (1T8)f5 (0T8)g3 10. (0T9)Qh7 (1T9)Qh5 / (0T9)Pf7>(1T9)f7 11. (1T10)Qh5>>(1T9)g6 (0T10)fxg3 / (1T10)f4 (0T10)e5 12. (0T11)Qg6 (1T11)Bd5 / (1T11)Ng8>x(0T11)g6 13. (1T12)Bxf7 (0T12)a5 / (0T12)Bf8>>x(0T6)f2 14. (-1T7)Kxf2 / (-1T7)g5 15. (-1T8)Bxb7 / (-1T8)Ng8>>(-1T7)g6 16. (-2T8)Bxb7 / (-2T8)Nf4 17. (-1T9)Bb7>>x(-1T8)c7 / (3T8)Qxc7 18. (-2T9)exf4 (3T9)Bxb7 / (-1T9)Nb8>>(-1T8)b6 19. (-3T9)Kf3 / (-3T9)Nb6>>(-1T8)b6 20. (-4T9)Qd1>>(0T9)h5');
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(false);
});

test('Test reversed royalty checkmates', () => {
  let chess = new Chess();
  chess.import(`
[Board "Standard - Reversed Royalty"]
[Size "8x8"]

1. d4 / Nf6
2. Bf4 / d5
3. Bxc7 / RQxc7
4. Nc3 / Bd7
5. (0T5)Nc3>>(0T4)c5* / (0T5)Yc7>>(0T2)c4
6. (-1T3)e3 / (-1T3)Ya4
7. (-1T4)Nc3#
  `);
  expect(chess.inCheck).toBe(true);
  expect(chess.inCheckmate).toBe(true);
});
