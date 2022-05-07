export type FullBoard = never | TimelineArray[]
export type TimelineArray = never | TurnArray[]
export type TurnArray = never | RankArray[]
export type RankArray = never | FileArray[]
export type FileArray = never | number

export type State = {
  checkmateTimeout: number;
  skipDetection: boolean;
  enableConsole: boolean;
  checkmateCache: any[];
  metadata: {
    board: string;
    mode: string;
    promotions?: string;
    size?: string;
  };
  rawPromotionPieces: number[];
  rawAction: number;
  rawStartingAction: number;
  rawBoardHistory: number[][][][][];
  rawBoard: number[][][][];
  rawActionHistory: any;
  rawMoveBuffer: any;
}

export type Board = {
  action: number;
  player: 'white' | 'black';
  width: number;
  height: number;
  timelines: Timeline[];
  items: Timeline;
}

export type Timeline = {
  timeline: number;
  player: 'white' | 'black';
  active: boolean;
  present: boolean;
  turns: Turn[];
  items: Turn;
}

export type Turn = {
  turn: number;
  player: 'white' | 'black';
  width: number;
  height: number;
  pieces: Piece[];
  items: Piece;
}

export type Piece = {
  piece: string;
  player: 'white' | 'black';
  position: Position;
  hasMoved: boolean;
}

export type Position = {
  timeline: number;
  turn: number;
  player: 'white' | 'black';
  coordinate?: any;
  rank: number;
  file: number;
}

export type PositionArray = [
  number,
  number,
  number,
  number,
  number?
]

export type Move = {
  start: Position;
  end: Position;
  realEnd: Position;
  player: 'white' | 'black';
  promotion: string | null;
  enPassant: Position | null;
  castling: null | {
    start: Position;
    end: Position;
    realEnd: Position;
  }
}

export type MoveArray = [
  PositionArray,
  PositionArray,
  PositionArray?,
  PositionArray?,
]

export type Action = {
  action: number,
  player: 'white' | 'black',
  moves: Move[],
  items: Move
}

export type ActionArray = MoveArray[]