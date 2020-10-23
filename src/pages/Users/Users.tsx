import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import VolvoButton from '../../common/components/VolvoButton/VolvoButton';
import FormModal from './FormModal/FormModal';
import { User, UserPOSForm } from './interfaces';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageBody from '../../common/components/PageBody/PageBody';
import UserRow from './UserRow/UserRow';
import TableFilter from '../../common/components/TableFilter/TableFilter';
import { filterRows } from '../../common/utils/utils';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import AppContext from '../../AppContext';

const userColumns = [
	{
		title: 'Código',
	},
	{
		title: 'Nombre',
	},
	{
		title: 'Email',
	},
	{
		title: 'Teléfono',
	},
	{
		title: 'Fecha de Creación',
	},
	{
		title: 'Tipo',
	},
	{
		title: 'Estado',
	},
	{
		title: 'Fecha de Baja',
	},
	{
		title: 'Acciones',
		props: { align: 'center' as 'center' },
	},
];

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
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [users, setUsers] = useState<User[]>([]);
	const [filtered, setFiltered] = useState<User[]>([]);
	const { addPageMessage } = useContext(AppContext);

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
		addPageMessage!({
			title: 'Usuario Agregado',
			text: 'Se agregó un nuevo usuario correctamente',
			status: 'success',
		});
	};

	const onEditUser = (user: User) => {
		const newUsers = users.map((d) => (d.id === user.id ? user : d));
		setUsers(newUsers);
		setFiltered(newUsers);
		// Perform API call
		addPageMessage!({
			title: 'Usuario Editado',
			text: 'Se editó un usuario correctamente',
			status: 'success',
		});
	};

	const onReestablishPassword = (id: string) => {
		// Perform API call
		addPageMessage!({
			title: 'Contraseña restablecida',
			text: `Se restableció la contraseña del usuario con id: ${id}`,
			status: 'success',
		});
	};

	const onAssociatePOS = (data: UserPOSForm) => {
		// Perform API call
		addPageMessage!({
			title: 'Usuario Asociado',
			text: `Se asoció al usuario con el POS: ${data.pos}`,
			status: 'success',
		});
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
		addPageMessage!({
			title: 'Usuario Desactivado',
			text: 'Se desactivó un usuario correctamente',
			status: 'success',
		});
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
						<BasicTable columns={userColumns}>
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
