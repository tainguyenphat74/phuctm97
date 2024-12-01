import type { CSSProperties } from "styled-components";

import type { Card } from "./types";

export const cardWidth = 71;
export const cardHeight = 96;
export const backgroundPositionFacingDown = `${(cardWidth * -Math.floor(Math.random() * 12) + 1).toString()}px ${(cardHeight * -4).toString()}px`;
export const backgroundPositionEmpty = `${(cardWidth * -1).toString()}px ${(cardHeight * -5).toString()}px`;
export const absolute: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
};
export const stock: Card[] = [];
