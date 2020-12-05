import { CommonValue } from 'common/utils';

export interface TableBankAccountType {
    id: string;
    name: string;
    status: string;
    archiveAt: string;
}

export type BankAccountTypeForm = Partial<TableBankAccountType>;

export const mapBankAccountType = (bankAccountTypes: CommonValue): TableBankAccountType => ({
    id: `${bankAccountTypes.id}`,
    name: bankAccountTypes.name,
    status: bankAccountTypes.status,
    archiveAt: bankAccountTypes.archiveAt,
});

export const mapBankAccountTypes = (bankAccountTypes: CommonValue[]): TableBankAccountType[] => {
    return bankAccountTypes.map(mapBankAccountType);
};