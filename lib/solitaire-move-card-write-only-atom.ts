import type { Card } from "~/lib/solitaire-card-interface";
import type { Place } from "~/lib/solitaire-types";

import { atom } from "jotai";

import {
  canMoveToFoundation,
  canMoveToTableau,
} from "~/lib/solitaire-card-validation";
import { foundationAtom } from "~/lib/solitaire-foudation-atom";
import { tableauAtom } from "~/lib/solitaire-tableau-atom";
import { wasteAtom } from "~/lib/solitaire-waste-atom";

interface MoveCardParams {
  card: Card;
  from: {
    place: Place;
    column: number;
  };
  to: {
    place: Place;
    column: number;
  };
}

export const moveCardAtom = atom(
  null,
  (get, set, { card, from, to }: MoveCardParams) => {
    switch (from.place) {
      case "tableau": {
        const tableau = { ...get(tableauAtom) };
        const sourceColumn = tableau[from.column];
        const cardIndex = sourceColumn.findIndex((c) => c.id === card.id);
        const cardsToMove = sourceColumn.splice(cardIndex);

        // Update place and column for all moved cards
        for (const c of cardsToMove) {
          c.place = to.place;
          c.column = to.column;
        }

        // Face up the last card in source column if exists
        const lastCard = sourceColumn.at(-1);
        if (lastCard) lastCard.facingUp = true;

        set(tableauAtom, tableau);

        // Handle moving to destination
        if (to.place === "tableau") {
          const newTableau = { ...get(tableauAtom) };
          const targetColumn = newTableau[to.column];

          if (!canMoveToTableau(card, targetColumn)) return;

          newTableau[to.column].push(...cardsToMove);
          set(tableauAtom, newTableau);
        } else if (to.place === "foundation") {
          const foundation = { ...get(foundationAtom) };
          const targetColumn = foundation[to.column];

          if (!canMoveToFoundation(card, targetColumn)) return;

          foundation[to.column].push(card);
          set(foundationAtom, foundation);
        }

        break;
      }
      case "waste": {
        const waste = [...get(wasteAtom)];
        const cardIndex = waste.findIndex((c) => c.id === card.id);
        const [movedCard] = waste.splice(cardIndex, 1);

        // Update place and column for moved card
        movedCard.place = to.place;
        movedCard.column = to.column;

        set(wasteAtom, waste);

        if (to.place === "tableau") {
          const tableau = { ...get(tableauAtom) };
          const targetColumn = tableau[to.column];

          if (!canMoveToTableau(movedCard, targetColumn)) return;

          tableau[to.column].push(movedCard);
          set(tableauAtom, tableau);
        } else if (to.place === "foundation") {
          const foundation = { ...get(foundationAtom) };
          const targetColumn = foundation[to.column];

          if (!canMoveToFoundation(movedCard, targetColumn)) return;

          foundation[to.column].push(movedCard);
          set(foundationAtom, foundation);
        }

        break;
      }
      case "foundation": {
        const foundation = { ...get(foundationAtom) };
        const [movedCard] = foundation[from.column].splice(-1, 1);

        // Update place and column for moved card
        movedCard.place = to.place;
        movedCard.column = to.column;

        set(foundationAtom, foundation);

        if (to.place === "tableau") {
          const tableau = { ...get(tableauAtom) };
          const targetColumn = tableau[to.column];

          if (!canMoveToTableau(movedCard, targetColumn)) return;

          tableau[to.column].push(movedCard);
          set(tableauAtom, tableau);
        }

        break;
      }
    }
  },
);
