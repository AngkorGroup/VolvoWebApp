import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface BankForm {
    name: string;
    abbreviation: string;
    tpCode: string;
}

export const BankSchema = yup.object<BankForm>({
    name: yup.string().max(TEXT_MAX_LENGTH).required(),
    abbreviation: yup.string().max(5).required(),
    tpCode: yup.string().matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).required(),
});