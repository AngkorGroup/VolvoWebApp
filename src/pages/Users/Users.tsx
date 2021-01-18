import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import { buildAlertBody as at } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { mapUserAdmins, UserForm } from './interfaces';
import { USER_COLUMNS } from './columns';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import {
	addUser,
	deleteUser,
	editUser,
	getUsers,
	resetUser,
} from 'common/services';
import UserActions from './UserActions/UserActions';
import { ACTIONS_COLUMN_V2 } from 'common/constants';

const Users: React.FC = () => {
	const alert = useAlert();
	const [loading, setLoading] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const { data, status, refetch } = useQuery(
		['getUsers', onlyActive],
		getUsers,
	);
	const users = useMemo(() => {
		if (data?.ok) {
			return mapUserAdmins(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddUser = async (user: UserForm) => {
		const newUser = {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			password: user.password,
			email: user.email,
			dealerId: +(user.dealerId || '0'),
			cashierId: +(user.cashierId || '0'),
			roleIds: user.roleIds?.map((op) => +op.value) || null,
		};
		const response = await addUser(newUser);
		if (response.ok) {
			refetch();
			alert.success(
				at('Usuario Agregado ', 'Se agregó un nuevo usuario correctamente'),
			);
		}
	};

	const onEditUser = async (user: UserForm) => {
		const newUser = {
			id: parseInt(user.innerId || '0', 10),
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			email: user.email,
			dealerId: +(user.dealerId || '0'),
			cashierId: +(user.cashierId || '0'),
			roleIds: user.roleIds?.map((op) => +op.value) || null,
		};
		const response = await editUser(newUser);
		if (response.ok) {
			refetch();
			alert.success(
				at('Usuario Editado ', 'Se editó un usuario correctamente'),
			);
		}
	};

	const onReestablishPassword = async (id: string) => {
		setLoading(true);
		const response = await resetUser(id);
		setLoading(false);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Contraseña restablecida',
					`Se restableció la contraseña del usuario con id: ${id}`,
				),
			);
		}
	};

	const onSelectContact = async (id: string, contactId: string) => {
		setLoading(true);
		const response = await deleteUser(id, contactId);
		setLoading(false);
		if (response.ok) {
			alert.success(
				at('Usuario Desactivado ', 'Se desactivó un usuario correctamente'),
			);
		}
	};

	const onDeleteUser = async (id: string) => {
		setLoading(true);
		const response = await deleteUser(id);
		setLoading(false);
		if (response.ok) {
			alert.success(
				at('Usuario Desactivado ', 'Se desactivó un usuario correctamente'),
			);
		}
	};

	const columns = useMemo(
		() => [
			...USER_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<UserActions
						item={cell?.row?.original}
						onEdit={onEditUser}
						onReestablishPassword={onReestablishPassword}
						onSelectContact={onSelectContact}
						onDelete={onDeleteUser}
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
				<PageTitle title='Gestión de Usuarios' />
			</div>
			<PageBody>
				{(status === 'loading' || loading) && <PageLoader />}
				{(status === 'success' || !loading) && (
					<GenericTable
						filename='Usuarios'
						columns={columns}
						data={users}
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
								onClick={setAddModalVisible(true)}
							/>
						}
					/>
				)}
				{showAddModal && (
					<FormModal
						title='Agregar Usuario'
						show={showAddModal}
						onClose={setAddModalVisible(false)}
						onConfirm={onAddUser}
					/>
				)}
			</PageBody>
		</div>
	);
};

export default Users;
