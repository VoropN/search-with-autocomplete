const { REACT_APP_API ,REACT_APP_FUNDS } = process.env;

export const FUNDS = {
  get: `${REACT_APP_API}${REACT_APP_FUNDS}`
};

