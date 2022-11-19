import { ChangeEvent, memo, useCallback } from "react";
import style from "./style.module.scss";

interface ISearch {
  onFocus?: () => void;
  setOpened: (isOpen: boolean) => void;
  setSearch: (value: string) => void;
  searchRef?: any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  searchValue: string;
  placeholder?: string;
}

export const Search = memo(
  ({
    onFocus,
    searchRef,
    onKeyDown,
    setSearch,
    searchValue,
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
          ref={searchRef}
          type="text"
          value={searchValue}
          onClick={onFocus}
          onKeyDown={onKeyDown}
          onChange={onUpdateSearch}
          className={style.searchInput}
          placeholder={placeholder}
        />
        {searchValue && <span className={style.closeIcon} onClick={onClear} />}
      </div>
    );
  }
);
