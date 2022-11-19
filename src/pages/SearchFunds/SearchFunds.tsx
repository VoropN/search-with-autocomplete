import { useMemo, useState, useEffect } from "react";
import { Loader, Portal } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { List, Search, SearchWithAutocomplete } from "src/components";
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
    <SearchWithAutocomplete
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchPlaceholder="Search for securities"
        listPlaceholder={placeholder}
        rows={rows}
        headers={headers}
      />
  );
};
