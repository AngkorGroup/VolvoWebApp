import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import {
	Admin,
	buildAlertBody as at,
	filterRows,
	UserAdmin,
} from 'common/utils';
import FormModal from './FormModal/FormModal';
import { mapUserAdmin, mapUserAdmins, User, UserForm } from './interfaces';
import UserRow from './UserRow/UserRow';
import { USER_COLUMNS } from './columns';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import {
	addUser,
	deleteUser,
	editUser,
	getUsers,
	resetUser,
} from 'common/services/Admins';
import { ADMIN_TYPE } from 'common/constants/constants';

const Dealers: React.FC = () => {
	const alert = useAlert();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [filtered, setFiltered] = useState<User[]>([]);
	const { data, status } = useQuery('users', getUsers);
	const users = useMemo(() => {
		if (data?.ok) {
			const rows = mapUserAdmins(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, users);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddUser = async (user: UserForm) => {
		const newUser = {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			password: user.password,
			email: user.email,
		};
		const response = await addUser(newUser);
		if (response.ok) {
			const newAdmin = response.data || ({} as Admin);
			const newUserAdmin = {
				id: newAdmin.userId,
				type: ADMIN_TYPE,
				createdAt: newAdmin.createdAt,
				admin: newAdmin,
			};
			const newData = mapUserAdmin(newUserAdmin as UserAdmin);
			setFiltered((old) => [...old, newData]);
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
		};
		const response = await editUser(newUser);
		if (response.ok) {
			const newAdmin = response.data || ({} as Admin);
			const newUserAdmin = {
				id: newAdmin.userId,
				type: ADMIN_TYPE,
				createdAt: newAdmin.createdAt,
				admin: newAdmin,
			};
			const newData = mapUserAdmin(newUserAdmin as UserAdmin);
			const newUsers = users.map((d) => (d.id === user.id ? newData : d));
			setFiltered(newUsers);
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
	return (
		<div>
			<div>
				<PageTitle title='Gestión de Usuarios' />
			</div>
			<PageBody>
				{(status === 'loading' || loading) && <PageLoader />}
				{(status === 'success' || !loading) && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{users.length > 0 && (
								<TableFilter value={query} onChange={onFilterChange} />
							)}
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							<FormModal
								title='Agregar Usuario'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddUser}
							/>
						</PageActionBar>
						<BasicTable columns={USER_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<UserRow
										key={i}
										item={item}
										onEdit={onEditUser}
										onReestablishPassword={onReestablishPassword}
										onSelectContact={onSelectContact}
										onDelete={onDeleteUser}
									/>
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default Dealers;
