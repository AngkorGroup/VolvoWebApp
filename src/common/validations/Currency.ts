import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface CurrencyForm {
	name: string;
	tpCode: string;
	abbreviation: string;
	symbol: string;
}

export const CurrencySchema = yup.object<CurrencyForm>({
	name: yup.string().max(TEXT_MAX_LENGTH).required(),
	tpCode: yup.string().required(),
	abbreviation: yup.string().max(5).required(),
	symbol: yup.string().max(5).required(),
});
