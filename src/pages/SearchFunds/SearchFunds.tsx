import { useMemo, useState, useEffect } from "react";
import { Loader, Portal } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { List, Search } from "src/components";
import style from "./style.module.scss";
import { useSearchFunds } from "./useSearchFunds";
import { HighlightedText } from "src/components";

export const SearchFunds = () => {
  const { funds, searchValue, setSearchValue, isSearching, placeholder } =
    useSearchFunds();
  const [dropdown, setDropdown] = useState<HTMLInputElement | null>(null);
  const [control, setControl] = useState<HTMLInputElement | null>(null);

  const [opened, setOpened] = useState(false);
  useClickOutside(() => setOpened(false), null, [control as any, dropdown]);
  const ref = useClickOutside(() => setOpened(false), ["mouseup", "touchend"]);
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
  const onHideAutocomplete = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      control?.blur();
      setOpened(false);
    }
  };

  return (
    <div className={style.container} ref={ref}>
      <Search
        onKeyDown={onHideAutocomplete}
        searchRef={setControl}
        search={searchValue}
        setOpened={setOpened}
        setSearch={setSearchValue}
        placeholder="Search for securities"
      />
      {opened &&
        (isSearching ? (
          <Loader className={style.loader} />
        ) : (
          <List
            rows={rows}
            headers={headers}
            placeholder={placeholder}
            listRef={setDropdown}
            onKeyDown={onHideAutocomplete}
          />
        ))}
    </div>
  );
};
