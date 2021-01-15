import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface DealerForm {
	code: string;
	name: string;
	ruc: string;
	address: string;
	type: string;
	phone?: string;
	zone: string;
	maxCashiers: number;
}

export const DealerSchema = yup.object<DealerForm>({
	code: yup.string().max(15).required(),
	name: yup.string().max(TEXT_MAX_LENGTH).required(),
	ruc: yup.string().matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).max(11).required(),
	address: yup.string().max(TEXT_MAX_LENGTH).required(),
	type: yup.string().max(TEXT_MAX_LENGTH).required(),
	phone: yup.string().max(9).matches(/^\d+$/, NUMERIC_FIELD_MESSAGE),
	zone: yup.string().max(TEXT_MAX_LENGTH).required(),
	maxCashiers: yup.number().max(100).required(),
});
