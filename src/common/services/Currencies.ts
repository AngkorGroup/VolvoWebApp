import { CURRENCIES_URL } from 'common/constants/api';
import { api, Currency } from 'common/utils';

export const getCurrencies = async (onlyActive?: boolean) => {
    return await api.get<Currency[]>(CURRENCIES_URL, { onlyActive });
};

export const getNewQueryCurrencies = async (key: string, onlyActive?: boolean) => {
    return await getCurrencies(onlyActive);
};

export const addCurrency = async (currency: any) => {
    return await api.post<Currency>(CURRENCIES_URL, currency);
};

export const editCurrency = async (currency: any) => {
    return await api.put<Currency>(CURRENCIES_URL, currency);
};

export const deleteCurrency = async (id: string) => {
    return await api.delete(`${CURRENCIES_URL}/${id}`);
};