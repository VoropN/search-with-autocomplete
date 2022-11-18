import { ChangeEvent, memo, useCallback, useRef } from "react";
import style from "./style.module.scss";

interface ISearch {
  search: string;
  setSearch: (value: string) => void;
}

export const Search = memo(({ search, setSearch }: ISearch) => {
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
    <div>
      <span className={style.searchIcon} onClick={onFocus} />
      <input
        type="text"
        value={search}
        onChange={onUpdateSearch}
        ref={inputRef}
        className={style.searchInput}
      />
      {search && <span className={style.closeIcon} onClick={onClear} />}
    </div>
  );
});
