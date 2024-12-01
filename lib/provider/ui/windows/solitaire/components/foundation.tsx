/* eslint-disable no-restricted-imports */
import type { ReactNode } from "react";

import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { absolute, stock } from "~/lib/provider/ui/windows/solitaire/global";
import {
  foundationAtom,
  store,
  wasteAtom,
} from "~/lib/provider/ui/windows/solitaire/jotai";
import { Place } from "~/lib/provider/ui/windows/solitaire/types";

import { Card } from "./card";
import { Holder } from "./holder";

export function Foundation(): ReactNode {
  const foundation = useAtomValue(foundationAtom);

  return (
    <>
      {Object.entries(foundation).map(([index, cards]) => (
        <Holder
          place={Place.FOUNDATION}
          columnIndex={Number(index)}
          key={index}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} style={absolute} />
          ))}
        </Holder>
      ))}
    </>
  );
}
