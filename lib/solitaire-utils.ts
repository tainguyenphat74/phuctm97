import type { Card } from "~/lib/solitaire-card-interface";
import type { Type } from "~/lib/solitaire-types";

export function updateCardInfo<T extends Card>(
  target: T,
  updates: Partial<T>,
): void {
  Object.assign(target, updates);
}

export function shuffleCards(cards: Card[]): void {
  for (let index = cards.length - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[index_]] = [cards[index_], cards[index]];
  }
}

export function isBlack(type: Type): boolean {
  return type === "clubs" || type === "spades";
}
