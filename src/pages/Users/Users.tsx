import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	OnlyActiveFilter,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	PaginatedTable,
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
} from 'common/services';
import { ADMIN_TYPE } from 'common/constants/constants';
import { TABLE_ROWS_PER_PAGE } from 'common/constants/tableColumn';

const Users: React.FC = () => {
	const alert = useAlert();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(0);
	const [onlyActive, setOnlyActive] = useState(true);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [showAddModal, setShowAddModal] = useState(false);
	const [filtered, setFiltered] = useState<User[]>([]);
	const { data, status } = useQuery(['getUsers', onlyActive], getUsers);
	const users = useMemo(() => {
		if (data?.ok) {
			const rows = mapUserAdmins(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onOnlyActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const handleChangePage = (_: any, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const rows = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, filtered],
	);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, users);
		setQuery(newQuery);
		setFiltered(filtered);
		setPage(0);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddUser = async (user: UserForm) => {
		const newUser = {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			password: user.password,
			email: user.email,
			dealerId: +(user.dealerId || '0'),
			roleIds: user.roleIds?.map((op) => +op.value) || null,
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
			dealerId: +(user.dealerId || '0'),
			roleIds: user.roleIds?.map((op) => +op.value) || null,
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
						<PageActionBar
							justifyContent={users.length === 0 ? 'flex-end' : 'space-between'}
						>
							{users.length > 0 && (
								<div>
									<TableFilter value={query} onChange={onFilterChange} />
									<OnlyActiveFilter
										checked={onlyActive}
										onChange={onOnlyActiveChange}
									/>
								</div>
							)}
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							{showAddModal && (
								<FormModal
									title='Agregar Usuario'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAddUser}
								/>
							)}
						</PageActionBar>
						<PaginatedTable
							columns={USER_COLUMNS}
							count={users.length}
							page={page}
							rowsPerPage={rowsPerPage}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						>
							<React.Fragment>
								{rows.map((item, i: number) => (
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
						</PaginatedTable>
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default Users;
