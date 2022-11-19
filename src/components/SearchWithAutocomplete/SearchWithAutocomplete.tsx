import { useState, useRef, useCallback } from "react";
import { Loader } from "@mantine/core";
import { List, Search } from "src/components";

import style from "./style.module.scss";
import { useOnClickOutside } from "src/hooks";

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
  const listRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState(false);
  useOnClickOutside(() => setOpened(false), [listRef, searchRef]);

  const onHideAutocomplete = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        searchRef.current?.blur();
        setOpened(false);
      }
    },
    [searchRef, setOpened]
  );
  const onFocus = useCallback(() => {
    searchRef.current?.focus();
    setOpened(true);
  }, [searchRef]);

  return (
    <div className={style.container}>
      <Search
        onFocus={onFocus}
        onKeyDown={onHideAutocomplete}
        searchRef={searchRef}
        setOpened={setOpened}
        setSearch={setSearchValue}
        searchValue={searchValue}
        placeholder={searchPlaceholder}
      />
      {opened &&
        (isSearching ? (
          <Loader className={style.loader} />
        ) : (
          <div
            tabIndex={0}
            className={style.listContainer}
            onKeyDown={onHideAutocomplete}
          >
            <List
              rows={rows}
              headers={headers}
              listRef={listRef}
              placeholder={listPlaceholder}
            />
          </div>
        ))}
    </div>
  );
};
