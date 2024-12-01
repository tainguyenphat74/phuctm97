/* eslint-disable no-restricted-imports */
import type { CSSProperties, ReactNode } from "react";

import type { Card } from "~/lib/provider/ui/windows/solitaire/types";

import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

import {
  cardHeight,
  cardWidth,
} from "~/lib/provider/ui/windows/solitaire/global";
import img from "~/lib/provider/ui/windows/solitaire/spritesheet.png";
import { moveCard } from "~/lib/provider/ui/windows/solitaire/utils";

const CardStyled = styled.div<{
  card: Card;
}>`
  display: flex;
  cursor: pointer;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  background-image: url(${img.src});
  background-position: ${({ card }) =>
    card.facingUp
      ? card.backgroundPositionFacingUp
      : card.backgroundPositionFacingDown};
`;

interface CardProps {
  card: Card;
  canDrag?: boolean;
  canDrop?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Card({
  card,
  canDrag = true,
  canDrop = true,
  style,
  children,
}: CardProps): ReactNode {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { droppedCard: card },
    canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    canDrop: () => canDrop,
    drop: ({ droppedCard }: { droppedCard: Card }) => {
      moveCard(droppedCard, card.place, card.column);
    },
  });

  return drag(
    drop(
      <div>
        <CardStyled
          card={card}
          style={{ ...style, opacity: isDragging ? 0 : 1 }}
        >
          {children}
        </CardStyled>
      </div>,
    ),
  );
}
