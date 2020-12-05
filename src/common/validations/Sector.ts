import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

export interface SectorForm {
	id: string;
	name: string;
	tpCode: string;
}

export const SectorSchema = yup.object<SectorForm>({
	id: yup.string(),
	name: yup.string().required().max(TEXT_MAX_LENGTH),
	tpCode: yup.string().required().max(TEXT_MAX_LENGTH),
});
