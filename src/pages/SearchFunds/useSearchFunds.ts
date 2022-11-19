import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

import { FUNDS, IFunds } from 'src/API';
import { useDebounce } from 'src/hooks';

export const useSearchFunds = () => {
  const [funds, setFunds] = useState<IFunds[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 300);
  const searchableLength = 2;

  useEffect(() => {
    if (debouncedSearch.length < searchableLength) {
      setIsSearching(false);
      setFunds([]);
      return;
    }
    setIsSearching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const url = new URL(FUNDS.get);
    url.searchParams.append('term', debouncedSearch);
    axios.get<IFunds[]>(url.toString(), { signal }).then(({ data }) => {
      setFunds(data);
      setIsSearching(false);
    }).catch((err) => {
      if (err.message === 'canceled') {
        return;
      }
      showNotification({
        title: 'Error',
        message: err.message,
        color: 'red',
      });
    })

    return () => controller.abort();
  }, [debouncedSearch]);

  return {
    funds: isSearching ? [] : funds,
    searchValue,
    isSearching,
    placeholder: !funds.length && !isSearching && debouncedSearch.length >= searchableLength ? "Not Found" : "",
    setSearchValue,
  };
}
