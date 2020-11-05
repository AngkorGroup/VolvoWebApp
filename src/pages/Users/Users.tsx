import React, { useEffect, useState } from 'react';
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
import { buildAlertBody as at, filterRows } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { User, UserPOSForm } from './interfaces';
import UserRow from './UserRow/UserRow';
import { USER_COLUMNS } from './columns';
import { useAlert } from 'react-alert';

const userRows: User[] = [
	{
		id: '00098',
		name: 'Federico Montero',
		email: 'fmontero@gmail.com',
		phone: '999888777',
		createdAt: '10/01/2020',
		type: 'Web',
		status: 'Activo',
		deletedAt: '',
	},
	{
		id: '00099',
		name: 'Gianfranco Galvez',
		email: 'fmontero@gmail.com',
		phone: '963852741',
		createdAt: '11/01/2020',
		type: 'Web',
		status: 'Activo',
		deletedAt: '',
	},
	{
		id: '00100',
		name: 'Mauricio Castañeda',
		email: 'fmontero@gmail.com',
		phone: '951753456',
		createdAt: '10/01/2020',
		type: 'Web',
		status: 'Inactivo',
		deletedAt: '15/09/2020',
	},
	{
		id: '00101',
		name: 'Brajean Junchaya',
		email: 'fmontero@gmail.com',
		phone: '987654321',
		createdAt: '10/01/2020',
		type: 'Web',
		status: 'Inactivo',
		deletedAt: '10/09/2020',
	},
	{
		id: '00102',
		name: 'Luis Salazar',
		email: 'lsalazar@gmail.com',
		phone: '999666333',
		createdAt: '13/01/2020',
		type: 'App Cajero',
		status: 'Activo',
		deletedAt: '',
	},
];

const Dealers: React.FC = () => {
	const alert = useAlert();
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [users, setUsers] = useState<User[]>([]);
	const [filtered, setFiltered] = useState<User[]>([]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, users);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setUsers(userRows);
			setFiltered(userRows);
		}, 1500);
	}, []);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddUser = (user: User) => {
		const newUsers = [...users, user];
		setUsers(newUsers);
		setFiltered(newUsers);
		// Perform API call
		alert.success(
			at('Usuario Agregado ', 'Se agregó un nuevo usuario correctamente'),
		);
	};

	const onEditUser = (user: User) => {
		const newUsers = users.map((d) => (d.id === user.id ? user : d));
		setUsers(newUsers);
		setFiltered(newUsers);
		// Perform API call
		alert.success(at('Usuario Editado ', 'Se editó un usuario correctamente'));
	};

	const onReestablishPassword = (id: string) => {
		// Perform API call
		alert.success(
			at(
				'Contraseña restablecida',
				`Se restableció la contraseña del usuario con id: ${id}`,
			),
		);
	};

	const onAssociatePOS = (data: UserPOSForm) => {
		// Perform API call
		alert.success(
			at('Usuario Asociado ', `Se asoció al usuario con el POS: ${data.pos}`),
		);
	};

	const onDeleteUser = (id: string) => {
		const status = 'Inactivo';
		const deletedAt = '14/10/2020';
		const newUsers = users.map((d) =>
			d.id !== id ? d : { ...d, status, deletedAt },
		);
		setUsers(newUsers);
		setFiltered(newUsers);
		// Perform API call
		alert.success(
			at('Usuario Desactivado ', 'Se desactivó un usuario correctamente'),
		);
	};
	return (
		<div>
			<div>
				<PageTitle title='Gestión de Usuarios' />
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && users.length > 0 && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
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
										onAssociatePOS={onAssociatePOS}
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
