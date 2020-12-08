import { NUMERIC_FIELD_MESSAGE } from 'common/constants';
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
	account: yup
		.string()
		.matches(/^\d+$/, NUMERIC_FIELD_MESSAGE)
		.max(15)
		.required(),
	cci: yup.string().matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).max(20).required(),
	currencyId: yup.string().required(),
	isDefault: yup.boolean(),
	bankAccountTypeId: yup.string().required(),
	bankId: yup.string().required(),
});
