import { ChangeEvent, memo, useCallback, useRef } from "react";
import style from "./style.module.scss";

interface ISearch {
  search: string;
  placeholder?: string;
  setSearch: (value: string) => void;
}

export const Search = memo(({ search, setSearch, placeholder = '' }: ISearch) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onUpdateSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const onClear = useCallback(() => setSearch(""), [setSearch]);
  const onFocus = useCallback(() => inputRef.current?.focus(), [inputRef]);

  return (
    <div className={style.container}>
      <span className={style.searchIcon} onClick={onFocus} />
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={onUpdateSearch}
        className={style.searchInput}
        placeholder={placeholder}
      />
      {search && <span className={style.closeIcon} onClick={onClear} />}
    </div>
  );
});
