import { Currency } from 'common/utils';

export interface TableCurrency {
    id: string;
    name: string;
    tpCode: string;
    abbreviation: string;
    symbol: string;
    status: string;
    archiveAt: string;
}

export type CurrencyForm = Partial<TableCurrency>;

export const mapCurrency = (currencies: Currency): TableCurrency => ({
    id: `${currencies.id}`,
    name: currencies.name,
    tpCode: currencies.tpCode,
    abbreviation: currencies.abbreviation,
    symbol: currencies.symbol,
    status: currencies.status,
    archiveAt: currencies.archiveAt,
});

export const mapCurrencies = (currencies: Currency[]): TableCurrency[] => {
    return currencies.map(mapCurrency);
};
