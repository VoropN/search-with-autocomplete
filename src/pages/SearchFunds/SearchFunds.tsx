import { List, Search } from "src/components";
import style from './style.module.scss';
import { useSearchFunds } from "./useSearchFunds";

export const SearchFunds = () => {
  const { funds, searchValue, setSearchValue } = useSearchFunds();

  return (
    <div className={style.container}>
      <Search search={searchValue} setSearch={setSearchValue} />
      <List list={funds} />
    </div>
  )
}