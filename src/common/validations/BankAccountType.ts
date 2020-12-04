import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface BankAccountTypeForm {
    name: string;
}

export const BankAccountTypeSchema = yup.object<BankAccountTypeForm>({
    name: yup.string().max(TEXT_MAX_LENGTH).required(),
});