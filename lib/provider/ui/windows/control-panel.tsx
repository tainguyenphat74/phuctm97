import type { ReactNode } from "react";
import type { SelectProps } from "react95";
import type { Theme } from "react95/dist/types";

import { capitalCase, splitSeparateNumbers } from "change-case";
import { atom, useAtom, useAtomValue } from "jotai";
import { Suspense, useCallback } from "react";
import { GroupBox, Hourglass, Select } from "react95";
import styled from "styled-components";

import { themeAtom } from "~/lib/theme-atom";
import { Window } from "~/lib/window";

const themesAtom = atom(async () => {
  const imported = await import("react95/dist/themes");
  return Object.entries(imported.default).map(([key, value]) => ({
    label: capitalCase(key, { split: splitSeparateNumbers }),
    value,
  }));
});

function ThemeSelect(): ReactNode {
  const themes = useAtomValue(themesAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const handleChange = useCallback<NonNullable<SelectProps<Theme>["onChange"]>>(
    ({ value }) => {
      setTheme(value);
    },
    [setTheme],
  );
  return (
    <Select
      options={themes}
      value={theme}
      onChange={handleChange}
      menuMaxHeight={120}
      width="100%"
    />
  );
}

const Centered = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export function ControlPanel(): ReactNode {
  return (
    <Window window="Control Panel" defaultWidth={280} defaultHeight={250}>
      <Suspense
        fallback={
          <Centered>
            <Hourglass />
          </Centered>
        }
      >
        <GroupBox label="Theme">
          <ThemeSelect />
        </GroupBox>
      </Suspense>
    </Window>
  );
}
