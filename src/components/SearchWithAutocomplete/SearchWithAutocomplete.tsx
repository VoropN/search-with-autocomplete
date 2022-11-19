import { useState, useCallback } from "react";
import { Loader } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { List, Search } from "src/components";

import style from "./style.module.scss";

interface ISearchWithAutocomplete {
  rows: React.ReactNode[];
  headers: { name: string; className?: string }[];
  searchValue: string;
  isSearching?: boolean;
  setSearchValue: (value: string) => void;
  listPlaceholder?: React.ReactNode;
  searchPlaceholder?: string;
}

export const SearchWithAutocomplete = ({
  rows,
  headers,
  searchValue,
  isSearching,
  setSearchValue,
  listPlaceholder,
  searchPlaceholder,
}: ISearchWithAutocomplete) => {
  const [dropdown, setDropdown] = useState<HTMLInputElement | null>(null);
  const [control, setControl] = useState<HTMLInputElement | null>(null);

  const [opened, setOpened] = useState(false);
  useClickOutside(() => setOpened(false), null, [control, dropdown as any]);
  const onHideAutocomplete = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        control?.blur();
        setOpened(false);
      }
    },
    [control, setOpened]
  );
  const onFocus = useCallback(() => {
    control?.focus();
    setOpened(true);
  }, [control]);

  return (
    <div className={style.container}>
      <Search
        onFocus={onFocus}
        onKeyDown={onHideAutocomplete}
        searchRef={setControl}
        setOpened={setOpened}
        setSearch={setSearchValue}
        searchValue={searchValue}
        placeholder={searchPlaceholder}
      />
      {opened &&
        (isSearching ? (
          <Loader className={style.loader} />
        ) : (
          <List
            rows={rows}
            headers={headers}
            listRef={setDropdown}
            onKeyDown={onHideAutocomplete}
            placeholder={listPlaceholder}
          />
        ))}
    </div>
  );
};
