export enum EXCHANGES {
  'NYSE', 'NASDAQ', 'OTC Markets', 'CBOE', 'CME'
};

export interface IFunds {
  name: string;
  ticker: string;
  exchange: EXCHANGES;
  id: string;
}