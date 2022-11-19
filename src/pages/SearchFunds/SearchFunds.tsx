import { useMemo } from "react";
import { Loader } from "@mantine/core";
import { List, Search } from "src/components";
import style from "./style.module.scss";
import { useSearchFunds } from "./useSearchFunds";
import { HighlightedText } from "src/components";

export const SearchFunds = () => {
  const { funds, searchValue, setSearchValue, isSearching, placeholder } =
    useSearchFunds();
  const rows = useMemo(
    () =>
      funds.map(({ name, ticker, exchange, id }) => (
        <tr key={id}>
          <td className={style.nameContent}>
            <HighlightedText text={name} valueToHighlight={searchValue} />
          </td>
          <td>
            <HighlightedText text={ticker} valueToHighlight={searchValue} />
          </td>
          <td>{exchange}</td>
        </tr>
      )),
    [funds, searchValue]
  );
  const headers = [
    { name: "Name", className: style.nameHead },
    { name: "Ticker" },
    { name: "Exchange" },
  ];

  return (
    <div className={style.container}>
      <Search
        search={searchValue}
        setSearch={setSearchValue}
        placeholder="Search for securities"
      />
      {isSearching ? (
        <Loader className={style.loader} />
      ) : (
        <List rows={rows} headers={headers} placeholder={placeholder} />
      )}
    </div>
  );
};
