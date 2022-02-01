export interface ICryptoContext {
  cryptos: Array<ICrypto>;
  currencies: Array<ICurrency>;
  simplePrices: Array<ISimplePrice>;
  getCryptos: TGetCryptosFC;
  getCurrencies: TGetCurrenciesFC;
  getSimplePrices: TGetSimplePricesFC;
}

export interface ICrypto {
  crypto: string;
  logo: string;
}

export interface ICurrency {
  currency: string;
  symbol: string;
}

export interface ISimplePrice {
  name: string;
  usd: number;
  eur: number;
  jpy: number;
  image: string;
}

export type TGetCryptosFC = () => Promise<any>;
export type TGetCurrenciesFC = () => Promise<any>;
export type TGetSimplePricesFC = () => Promise<any>;

export const defaultCryptoValue: ICryptoContext = {
  cryptos: [],
  currencies: [],
  simplePrices: [],
  getCryptos: () => Promise.reject(null),
  getCurrencies: () => Promise.reject(null),
  getSimplePrices: () => Promise.reject(null),
};
