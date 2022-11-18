import { ChangeEvent, memo, useCallback } from 'react';

interface ISearch {
  search: string;
  setSearch: (value: string) => void;
}

export const Search = memo(({ search, setSearch }: ISearch) => {
  const onUpdateSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  
  return <input type="text" value={search} onChange={onUpdateSearch} />
});