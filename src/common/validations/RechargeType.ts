import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

export interface RechargeTypeForm {
	id: string;
	name: string;
	tpCode: string;
}

export const RechargeTypeSchema = yup.object<RechargeTypeForm>({
	id: yup.string(),
	name: yup.string().required().max(TEXT_MAX_LENGTH),
	tpCode: yup.string().required().max(TEXT_MAX_LENGTH),
});
