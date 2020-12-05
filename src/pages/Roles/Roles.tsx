import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import { buildAlertBody as at } from 'common/utils';
import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import {
	addRole,
	deleteRole,
	editRole,
	getQueryRoles,
} from 'common/services/Roles';
import { mapRoles } from './interfaces';
import { ROLE_COLUMNS } from './columns';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import RoleActions from './RoleActions/RoleActions';
import { RoleForm } from 'common/validations/Role';
import RoleFormModal from './RoleForm/RoleForm';

const Roles = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryRoles', onlyActive],
		getQueryRoles,
	);
	const cardTypes = useMemo(() => {
		if (data?.ok) {
			return mapRoles(data?.data || []);
		}
		return [];
	}, [data]);

	const onAddRole = async (role: RoleForm) => {
		const body = {
			name: role.name || '',
			roleMenus: role.roleMenus.map((m) => m.value),
		};
		const response = await addRole(body);
		if (response.ok) {
			refetch();
			alert.success(at('Rol Agregado', 'Se agregó un nuevo rol correctamente'));
		}
	};

	const onEditRole = async (role: RoleForm) => {
		const body = {
			id: +(role.id || '0'),
			name: role.name || '',
			roleMenus: role.roleMenus.map((m) => m.value),
		};
		const response = await editRole(body);
		if (response.ok) {
			refetch();
			alert.success(at('Rol Editado', 'Se editó un rol correctamente'));
		}
	};

	const onDeleteRole = async (id: string) => {
		const response = await deleteRole(id);
		if (response.ok) {
			refetch();
			alert.success(at('Rol Eliminado', 'Se eliminó un rol correctamente'));
		}
	};

	const columns = useMemo(
		() => [
			...ROLE_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<RoleActions
						item={cell?.row?.original}
						onEdit={onEditRole}
						onDelete={onDeleteRole}
					/>
				),
			},
		],
		// eslint-disable-next-line
		[],
	);

	return (
		<div>
			<div>
				<PageTitle title='Roles' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							columns={columns}
							data={cardTypes}
							customFilters={
								<OnlyActiveFilter
									checked={onlyActive}
									onChange={(e: any) => setOnlyActive(e.target.checked)}
								/>
							}
							rightButton={
								<VolvoButton
									text='Agregar'
									icon={<AddIcon />}
									color='primary'
									onClick={() => setShowAddModal(true)}
								/>
							}
						/>
					</PageBody>
				)}
			</PageBody>
			{showAddModal && (
				<RoleFormModal
					title='Agregar Rol'
					show={showAddModal}
					onClose={() => setShowAddModal(false)}
					onConfirm={onAddRole}
				/>
			)}
		</div>
	);
};

export default Roles;
