/* eslint-disable no-restricted-imports */
import type { ReactNode } from "react";

import type { Card, Place } from "~/lib/provider/ui/windows/solitaire/types";

import { useDrop } from "react-dnd";
import styled from "styled-components";

import {
  cardHeight,
  cardWidth,
} from "~/lib/provider/ui/windows/solitaire/global";
import img from "~/lib/provider/ui/windows/solitaire/spritesheet.png";
import { moveCard } from "~/lib/provider/ui/windows/solitaire/utils";

const HolderStyled = styled.div`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  background-image: url(${img.src});
  background-position: ${(cardWidth * -0).toString()}px
    ${(cardHeight * -4).toString()}px;

  border-radius: 5px;
  position: relative;
`;

export function Holder({
  children,
  place,
  columnIndex,
  canDrop = true,
}: {
  children: ReactNode;
  place: Place;
  columnIndex: number;
  canDrop?: boolean;
}): ReactNode {
  const [, drop] = useDrop({
    accept: "CARD",
    canDrop: () => canDrop,
    drop: ({ droppedCard }: { droppedCard: Card }) => {
      moveCard(droppedCard, place, columnIndex);
    },
  });

  return drop(
    <div>
      <HolderStyled>{children}</HolderStyled>
    </div>,
  );
}
