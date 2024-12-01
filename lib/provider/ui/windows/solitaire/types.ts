export enum Type {
  // it strictly follows the card types order in the game
  CLUBS = "clubs",
  DIAMONDS = "diamonds",
  HEARTS = "hearts",
  SPADES = "spades",
}
export enum Place {
  // STOCK = "stock",
  WASTE = "waste",
  FOUNDATION = "foundation",
  TABLEAU = "tableau",
}
export interface Card {
  id: string;
  type: Type;
  black: boolean;
  number: number;
  facingUp: boolean;
  place: Place;
  column: number;
  backgroundPositionFacingUp?: string;
  backgroundPositionFacingDown?: string;
}

export enum MoveType {
  WASTE_TO_FOUNDATION = "WASTE_TO_FOUNDATION",
  WASTE_TO_TABLEAU = "WASTE_TO_TABLEAU",
  TABLEAU_TO_FOUNDATION = "TABLEAU_TO_FOUNDATION",
  TABLEAU_TO_TABLEAU = "TABLEAU_TO_TABLEAU",
  FOUNDATION_TO_FOUNDATION = "FOUNDATION_TO_FOUNDATION",
}
