import { useMemo } from 'react'
import { SearchWithAutocomplete, HighlightedText } from 'src/components'
import { useSearchFunds } from './useSearchFunds'
import style from './style.module.scss'

export const SearchFunds = () => {
  const { funds, searchValue, setSearchValue, isSearching, placeholder } =
    useSearchFunds()
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
  )
  const headers = useMemo(() => [
    { name: 'Name', className: style.nameHead },
    { name: 'Ticker' },
    { name: 'Exchange' }
  ], [])

  return (
    <SearchWithAutocomplete
      rows={rows}
      headers={headers}
      isSearching={isSearching}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      listPlaceholder={placeholder}
      searchPlaceholder="Search for securities"
    />
  )
}
