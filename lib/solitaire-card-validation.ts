import type { Card } from "~/lib/solitaire-card-interface";

export function canMoveToFoundation(
  sourceCard: Card,
  targetColumn: Card[],
): boolean {
  const lastCard = targetColumn.at(-1);

  // For empty foundation pile, only Ace (1) can be placed
  if (!lastCard) return sourceCard.number === 1;

  // For non-empty foundation pile:
  // 1. Must be same suit (type)
  // 2. Must be one number higher than last card
  return (
    lastCard.type === sourceCard.type &&
    lastCard.number === sourceCard.number - 1
  );
}

export function canMoveToTableau(
  sourceCard: Card,
  targetColumn: Card[],
): boolean {
  const lastCard = targetColumn.at(-1);

  // For empty tableau pile, only King (13) can be placed
  if (!lastCard) return sourceCard.number === 13;

  // For non-empty tableau pile:
  // 1. Must be alternate colors (black/red)
  // 2. Must be one number lower than last card
  return (
    lastCard.black !== sourceCard.black &&
    lastCard.number === sourceCard.number + 1
  );
}
