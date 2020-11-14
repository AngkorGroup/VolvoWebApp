import { NUMERIC_FIELD_MESSAGE, TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface UserForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	dealerId: string;
}

export const UserSchema = yup.object<UserForm>({
	firstName: yup.string().max(TEXT_MAX_LENGTH).required(),
	lastName: yup.string().max(TEXT_MAX_LENGTH).required(),
	email: yup.string().max(TEXT_MAX_LENGTH).email().required(),
	password: yup.string(),
	phone: yup.string().max(9).matches(/^\d+$/, NUMERIC_FIELD_MESSAGE).required(),
	dealerId: yup.string().required(),
});
