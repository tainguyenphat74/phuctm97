import type { Card } from "./types";

import { foundationAtom, store, tableauAtom, wasteAtom } from "./jotai";
import { MoveType, Place, Type } from "./types";

/**
 * Shuffle an array of cards
 * @param cards - The array of cards to shuffle
 */
export function shuffleCards(cards: Card[]): void {
  for (let index = cards.length - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[index_]] = [cards[index_], cards[index]];
  }
}

/**
 * Check if a card is black
 * @param type - The type of the card
 */
export function isBlack(type: Type): boolean {
  return type === Type.CLUBS || type === Type.SPADES;
}

/**
 * Update the properties of a card
 * @param target - The card to update
 * @param updates - The properties to update on the card
 */
export function updateCardInfo<T extends Card>(
  target: T,
  updates: Partial<T>,
): void {
  Object.assign(target, updates);
}

/**
 * Find a card by its id in a record of cards
 * @param record - The record of cards
 * @param cardId - The id of the card to find
 */
export const findCardById = (
  record: Record<number, Card[]>,
  cardId: string,
): Card | undefined => {
  for (const key in record) {
    const card = record[key].find((card) => card.id === cardId);

    if (card) return card;
  }
  return undefined;
};

/**
 * Check if the game is winnable
 */
export function isWinnable(): boolean {
  if (
    Object.values(store.get(foundationAtom)).every((pile) => pile.length === 13)
  )
    return true;

  return false;
}

/**
 * Move a card from one place to another
 * @param source - The card to move
 * @param target - The target place
 * @param targetColumnIndex - The index of the column in the target place
 */
export function moveCard(
  source: Card,
  target: Place,
  targetColumnIndex: number,
): void {
  switch (getMoveType(source, target)) {
    case MoveType.WASTE_TO_FOUNDATION: {
      moveToFoundation(
        source,
        targetColumnIndex,
        (foundationCards: Record<number, Card[]>) => {
          foundationCards[targetColumnIndex].push(source);
          source.column = targetColumnIndex;
          source.place = Place.FOUNDATION;
          store.set(foundationAtom, { ...foundationCards });
          popWasteCard();
        },
      );
      break;
    }
    case MoveType.FOUNDATION_TO_FOUNDATION: {
      moveToFoundation(
        source,
        targetColumnIndex,
        (foundationCards: Record<number, Card[]>) => {
          const oldCard: Card | undefined =
            foundationCards[source.column].pop();
          if (!oldCard) return;
          updateCardInfo(oldCard, {
            column: targetColumnIndex,
          });
          foundationCards[targetColumnIndex].push(oldCard);
          store.set(foundationAtom, { ...foundationCards });
        },
      );
      break;
    }
    case MoveType.TABLEAU_TO_FOUNDATION: {
      moveToFoundation(
        source,
        targetColumnIndex,
        (foundationCards: Record<number, Card[]>) => {
          const boardCards: Record<number, Card[]> = store.get(tableauAtom);
          const newCard: Card | undefined = boardCards[source.column].pop();
          // flip last card, it affect to the reference boardCards
          const last = boardCards[source.column].at(-1);
          if (last) updateCardInfo(last, { facingUp: true });
          if (!newCard) return;
          updateCardInfo(newCard, {
            column: targetColumnIndex,
            place: Place.FOUNDATION,
          });
          foundationCards[targetColumnIndex].push(newCard);
          store.set(foundationAtom, { ...foundationCards });
          store.set(tableauAtom, { ...boardCards });
        },
      );
      break;
    }
    case MoveType.WASTE_TO_TABLEAU: {
      moveToTableau(
        source,
        targetColumnIndex,
        (boardCards: Record<number, Card[]>) => {
          boardCards[targetColumnIndex].push(source);
          source.column = targetColumnIndex;
          source.place = Place.TABLEAU;
          store.set(tableauAtom, { ...boardCards });
          popWasteCard();
        },
      );
      break;
    }
    case MoveType.TABLEAU_TO_TABLEAU: {
      moveToTableau(
        source,
        targetColumnIndex,
        (boardCards: Record<number, Card[]>) => {
          const moveCards: Card[] = boardCards[source.column].splice(
            boardCards[source.column].findIndex((c) => c.id === source.id),
          );
          const last = boardCards[source.column].at(-1);
          if (last) updateCardInfo(last, { facingUp: true });
          boardCards[targetColumnIndex].push(...moveCards);
          moveCards.map((card) => {
            updateCardInfo(card, { column: targetColumnIndex });
          });
          store.set(tableauAtom, { ...boardCards });
        },
      );
      break;
    }
    default: {
      break;
    }
  }
}

function getMoveType(source: Card, target: Place): MoveType | undefined {
  if (source.place === Place.WASTE) {
    if (target === Place.FOUNDATION) return MoveType.WASTE_TO_FOUNDATION;
    if (target === Place.TABLEAU) return MoveType.WASTE_TO_TABLEAU;
  } else if (source.place === Place.TABLEAU) {
    if (target === Place.FOUNDATION) return MoveType.TABLEAU_TO_FOUNDATION;
    if (target === Place.TABLEAU) return MoveType.TABLEAU_TO_TABLEAU;
  } else {
    if (target === Place.FOUNDATION) return MoveType.FOUNDATION_TO_FOUNDATION;
  }

  return undefined;
}

function moveToFoundation(
  source: Card,
  targetColumnIndex: number,
  callback: (foundationCards: Record<number, Card[]>) => void,
): void {
  const foundationCards: Record<number, Card[]> = store.get(foundationAtom);
  const last = foundationCards[targetColumnIndex].at(-1);
  // validate all cases invalid
  if (!last && source.number !== 1) return;
  if (last && (last.type !== source.type || last.number !== source.number - 1))
    return;

  callback(foundationCards);
}

function moveToTableau(
  source: Card,
  targetColumnIndex: number,
  callback: (boardCards: Record<number, Card[]>) => void,
): void {
  const boardCards: Record<number, Card[]> = store.get(tableauAtom);
  const last = boardCards[targetColumnIndex].at(-1);
  if (!last && source.number !== 13) return;
  if (
    last &&
    (last.black === source.black || last.number !== source.number + 1)
  )
    return;

  callback(boardCards);
}

function popWasteCard(): void {
  const wasteCards: Card[] = store.get(wasteAtom);
  if (wasteCards.length === 0) return;
  store.set(wasteAtom, wasteCards.slice(0, -1));
}
