import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

export interface ClientUserForm {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	documentTypeId: string;
	documentNumber: string;
}

export const ClientUserSchema = yup.object<ClientUserForm>({
	id: yup.string(),
	firstName: yup.string().max(TEXT_MAX_LENGTH).required(),
	lastName: yup.string().max(TEXT_MAX_LENGTH).required(),
	phone: yup.string().max(9).matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).required(),
	email: yup.string().max(TEXT_MAX_LENGTH).email().required(),
	documentTypeId: yup.string().required(),
	documentNumber: yup
		.string()
		.max(11)
		.matches(/^\d+$/, NUMERIC_FIELD_MESSAGE)
		.required(),
});
