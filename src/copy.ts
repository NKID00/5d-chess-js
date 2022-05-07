import { ActionArray, MoveArray, PositionArray } from "./types/chess";

export function move(givenMove: MoveArray): MoveArray {
  let copiedMove: MoveArray = [] as unknown as MoveArray;

  for (const position of givenMove) {
    copiedMove.push(position.slice() as PositionArray);
  }

  return copiedMove;
}

export function action(givenAction: ActionArray): ActionArray {
  let copiedAction: ActionArray = [];

  for (const givenMove of givenAction) {
    copiedAction.push(move(givenMove));
  }

  return copiedAction;
}

export function actions(givenActions: ActionArray[]): ActionArray[] {
  let copiedActions: ActionArray[] = [];

  for (const givenAction of givenActions) {
    copiedActions.push(action(givenAction));
  }

  return copiedActions;
}
