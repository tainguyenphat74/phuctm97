export interface Card {
  id: string;
  type: "clubs" | "diamonds" | "hearts" | "spades";
  black: boolean;
  number: number;
  facingUp: boolean;
  place: "waste" | "foundation" | "tableau";
  column: number;
  backgroundPositionFacingUp?: string;
  backgroundPositionFacingDown?: string;
}
