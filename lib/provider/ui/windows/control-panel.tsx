import type { ReactNode } from "react";
import type { SelectOption } from "react95/dist/Select/Select.types";
import type { Theme } from "react95/dist/types";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GroupBox, Select } from "react95";
import { titleCase } from "title-case";

import { themeAtom } from "~/lib/theme-atom";
import { Window } from "~/lib/window";

export function ControlPanel(): ReactNode {
  const [theme, setTheme] = useAtom(themeAtom);
  const [selectedTheme, setSelectedTheme] = useState<string>("original");
  const [themesMap, setThemesMap] = useState<Record<string, Theme>>(
    {} as Record<string, Theme>,
  );
  const [themeOptions, setThemeOptions] = useState<SelectOption<string>[]>([]);

  useEffect(() => {
    const loadThemes = async (): Promise<void> => {
      const themes = await import("react95/dist/themes");

      const themeEntries = Object.entries(themes.default);
      setThemesMap(Object.fromEntries(themeEntries));

      const options = themeEntries.map(([key]) => ({
        label: titleCase(key),
        value: key,
      }));
      setThemeOptions(options);
    };

    void loadThemes();
  }, []);

  useEffect(() => {
    const currentThemeType =
      Object.keys(themesMap).find((key) => themesMap[key] === theme) ??
      "original";

    setSelectedTheme(currentThemeType);
  }, [theme, themesMap]);

  const handleThemeChange = (selectedOption: SelectOption<string>): void => {
    setTheme(themesMap[selectedOption.value]);
    setSelectedTheme(selectedOption.value);
  };

  return (
    <Window window="Control Panel" defaultWidth={280} defaultHeight={250}>
      <GroupBox label="Theme">
        <Select
          options={themeOptions}
          onChange={handleThemeChange}
          value={selectedTheme}
          menuMaxHeight={120}
        />
      </GroupBox>
    </Window>
  );
}
