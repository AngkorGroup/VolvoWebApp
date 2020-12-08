import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface CardTypeForm {
	type: string;
	description: string;
	currencyId: string;
	term: string;
	color: string;
	tpCode: string;
}

export const CardTypeSchema = yup.object<CardTypeForm>({
	type: yup.string().max(10).required(),
	description: yup.string().max(TEXT_MAX_LENGTH).required(),
	currencyId: yup.string().required(),
	term: yup.string().matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).max(2).required(),
	color: yup.string().required(),
	tpCode: yup.string().required(),
});
