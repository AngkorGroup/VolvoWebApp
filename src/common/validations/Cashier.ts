import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface CashierForm {
	imei: string;
	phone: string;
	email: string;
	firstName: string;
	lastName: string;
	tpCode: string;
}

export const CashierSchema = yup.object<CashierForm>({
	imei: yup.string().max(TEXT_MAX_LENGTH).required(),
	phone: yup.string().max(9).matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).required(),
	email: yup.string().max(TEXT_MAX_LENGTH).email().required(),
	firstName: yup.string().max(TEXT_MAX_LENGTH).required(),
	lastName: yup.string().max(TEXT_MAX_LENGTH).required(),
	tpCode: yup.string().required(),
});
