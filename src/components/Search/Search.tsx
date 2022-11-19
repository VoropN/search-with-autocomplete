import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";
import style from "./style.module.scss";

interface ISearch {
  searchValue: string;
  placeholder?: string;
  setOpened: (isOpen: boolean) => void;
  setSearch: (value: string) => void;
  onFocus?: () => void;
  searchRef?: any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const Search = memo(
  ({
    searchRef,
    searchValue,
    setSearch,
    onFocus,
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

    return (
      <div className={style.container}>
        <span className={style.searchIcon} onClick={onFocus} />
        <input
          onKeyDown={onKeyDown}
          onClick={onFocus}
          ref={searchRef}
          type="text"
          value={searchValue}
          onChange={onUpdateSearch}
          className={style.searchInput}
          placeholder={placeholder}
        />
        {searchValue && <span className={style.closeIcon} onClick={onClear} />}
      </div>
    );
  }
);
