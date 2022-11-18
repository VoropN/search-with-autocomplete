import { useEffect, useState } from 'react';
import axios from 'axios';
import { FUNDS, IFunds } from 'src/API';

export const useSearchFunds = () => {
  const [funds, setFunds] = useState<IFunds[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  
  useEffect(() => {
    const url = new URL(FUNDS.get);
    if (searchValue) {
      url.searchParams.append('term', searchValue);
    }
    axios.get<IFunds[]>(url.toString()).then(({ data }) => setFunds(data))
  }, [searchValue]);

  return { searchValue, setSearchValue, funds };
}