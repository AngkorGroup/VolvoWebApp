import { BANKS_URL } from 'common/constants/api';
import { api, Bank } from 'common/utils';

export const getBanks = async (onlyActive?: boolean) => {
    return await api.get<Bank[]>(BANKS_URL, { onlyActive });
};

export const getQueryBank = async (
    key: string,
    onlyActive?: boolean,
) => {
    return await getBanks(onlyActive);
}

export const addBank = async (bank: any) => {
    return await api.post<Bank>(BANKS_URL, bank);
};

export const editBank = async (bank: any) => {
    return await api.put<Bank>(BANKS_URL, bank);
};

export const deleteBank = async (id: string) => {
    return await api.delete(`${BANKS_URL}/${id}`);
};