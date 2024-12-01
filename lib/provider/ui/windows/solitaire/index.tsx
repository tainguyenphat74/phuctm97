import type { ReactNode } from "react";

import { Button, Toolbar } from "react95";
import styled from "styled-components";

import { Window } from "~/lib/window";

import { Game, init } from "./game";
import { stock } from "./global";
import { foundationAtom, store, wasteAtom } from "./jotai";

const resetGame = (): void => {
  store.set(wasteAtom, []);
  store.set(foundationAtom, { 0: [], 1: [], 2: [], 3: [] });
  stock.length = 0;
};

const handleNewGame = (): void => {
  resetGame();
  init();
};

export function Solitaire(): ReactNode {
  return (
    <StyledWindow window="Solitaire" defaultWidth={1200} defaultHeight={600}>
      <Toolbar noPadding>
        <Button variant="menu" size="sm" onClick={handleNewGame}>
          New Game
        </Button>
        <Button variant="menu" size="sm">
          Help
        </Button>
      </Toolbar>

      <Game />
    </StyledWindow>
  );
}

const StyledWindow = styled(Window)``;
