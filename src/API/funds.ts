const { REACT_APP_API ,REACT_APP_FUNDS } = process.env;

export const FUNDS = {
  get: `${REACT_APP_API}${REACT_APP_FUNDS}`
};

export enum EXCHANGES {
  'NYSE', 'NASDAQ', 'OTC Markets', 'CBOE', 'CME'
};

export interface IFunds {
  name: string;
  ticker: string;
  exchange: EXCHANGES;
  id: string;
}