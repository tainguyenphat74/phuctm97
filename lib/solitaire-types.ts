export type Type = "clubs" | "diamonds" | "hearts" | "spades";
export type Place = "waste" | "foundation" | "tableau";
export type MoveType =
  | "waste_to_foundation"
  | "waste_to_tableau"
  | "tableau_to_foundation"
  | "tableau_to_tableau";
