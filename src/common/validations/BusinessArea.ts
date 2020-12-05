import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

export interface BusinessAreaForm {
	id: string;
	name: string;
	tpCode: string;
}

export const BusinessAreaSchema = yup.object<BusinessAreaForm>({
	id: yup.string(),
	name: yup.string().required().max(TEXT_MAX_LENGTH),
	tpCode: yup.string().required().max(TEXT_MAX_LENGTH),
});
