import type { Card } from "./types";

import { atom, createStore } from "jotai";

export const wasteAtom = atom<Card[]>([]);
export const tableauAtom = atom<Record<number, Card[]>>({});
export const foundationAtom = atom<Record<number, Card[]>>({
  0: [],
  1: [],
  2: [],
  3: [],
});

export const store = createStore();
