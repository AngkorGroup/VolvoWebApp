import { TEXT_MAX_LENGTH } from 'common/constants';
import { Option } from 'common/utils';
import yup from './YupLocale';

export interface RoleForm {
	id: string;
	name: string;
	roleMenus: any[];
}

export const RoleSchema = yup.object<RoleForm>({
	id: yup.string(),
	name: yup.string().required().max(TEXT_MAX_LENGTH),
	roleMenus: yup
		.array()
		.of(
			yup.object<Option>({
				value: yup.string(),
				label: yup.string(),
			}),
		)
		.required('Debe seleccionar al menos un menú'),
});
