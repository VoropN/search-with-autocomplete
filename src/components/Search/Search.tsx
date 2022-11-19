import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";
import style from "./style.module.scss";

interface ISearch {
  search: string;
  placeholder?: string;
  setOpened: (isOpen: boolean) => void;
  setSearch: (value: string) => void;
  searchRef?: any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const Search = memo(
  ({
    searchRef,
    search,
    setSearch,
    setOpened,
    onKeyDown,
    placeholder = "",
  }: ISearch) => {
    const onUpdateSearch = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      },
      [setSearch]
    );
    const onClear = useCallback(() => setSearch(""), [setSearch]);
    const onFocus = useCallback(() => {
      searchRef.current?.focus();
      setOpened(true);
    }, [searchRef]);

    return (
      <div className={style.container}>
        <span className={style.searchIcon} onClick={onFocus} />
        <input
          onKeyDown={onKeyDown}
          onClick={onFocus}
          ref={searchRef}
          type="text"
          value={search}
          onChange={onUpdateSearch}
          className={style.searchInput}
          placeholder={placeholder}
        />
        {search && <span className={style.closeIcon} onClick={onClear} />}
      </div>
    );
  }
);
