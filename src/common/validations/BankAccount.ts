import yup from './YupLocale';

export interface AccountForm {
	account: string;
	cci: string;
	currencyId: string;
	isDefault: boolean;
	bankAccountTypeId: string;
	bankId: string;
}

export const BankAccountSchema = yup.object<AccountForm>({
	account: yup.string().max(20).required(),
	cci: yup.string().max(30).required(),
	currencyId: yup.string().required(),
	isDefault: yup.boolean(),
	bankAccountTypeId: yup.string().required(),
	bankId: yup.string().required(),
});
