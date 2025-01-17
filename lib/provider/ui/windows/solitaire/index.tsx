import type { ReactNode } from "react";

import { useSetAtom } from "jotai";
import { Button, Toolbar } from "react95";
import styled from "styled-components";

import { foundationAtom } from "~/lib/solitaire-foudation-atom";
import { stock } from "~/lib/solitaire-global";
import { wasteAtom } from "~/lib/solitaire-waste-atom";
import { Window } from "~/lib/window";

import { Game, init } from "./game";

export function Solitaire(): ReactNode {
  const setWaste = useSetAtom(wasteAtom);
  const setFoundation = useSetAtom(foundationAtom);

  const resetGame = (): void => {
    setWaste([]);
    setFoundation({ 0: [], 1: [], 2: [], 3: [] });
    stock.length = 0;
  };

  const handleNewGame = (): void => {
    resetGame();
    init();
  };

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
