import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

export interface DocumentTypeForm {
	id: string;
	name: string;
	tpCode: string;
	abbreviation: string;
	sunatCode: string;
}

export const DocumentTypeSchema = yup.object<DocumentTypeForm>({
	id: yup.string(),
	name: yup.string().required().max(TEXT_MAX_LENGTH),
	tpCode: yup.string().required().max(TEXT_MAX_LENGTH),
	abbreviation: yup.string().required().max(TEXT_MAX_LENGTH),
	sunatCode: yup.string().required().max(TEXT_MAX_LENGTH),
});
