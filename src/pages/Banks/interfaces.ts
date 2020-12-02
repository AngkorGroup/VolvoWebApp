import { Bank } from 'common/utils';

export interface TableBank {
    id: string;
    name: string;
    abbreviation: string;
    tpCode: string;
    status: string;
    archiveAt: string;
}

export type BankForm = Partial<TableBank>;

export const mapBank = (banks: Bank): TableBank => ({
    id: `${banks.id}`,
    name: banks.name,
    abbreviation: banks.abbreviation,
    tpCode: banks.tpCode,
    status: banks.status,
    archiveAt: banks.archiveAt,
});

export const mapBanks = (banks: Bank[]): TableBank[] => {
    return banks.map(mapBank);
};