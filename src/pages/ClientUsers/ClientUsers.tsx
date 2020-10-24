import React, { useContext, useState } from 'react';
import {
	BasicTable,
	EmptyState,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	TypeAhead,
} from 'common/components';
import { filterRows, MOCKED_CLIENTS_TYPEAHEAD } from 'common/utils';
import { ClientUser } from './interfaces';
import ClientUserRow from './ClientUserRow/ClientUserRow';
import AppContext from '../../AppContext';
import { CLIENT_USER_COLUMNS } from './columns';
import { Option } from 'common/utils/types';

const clientUserRows: ClientUser[] = [
	{
		id: '1',
		documentType: 'dni',
		documentNumber: '72258936',
		type: 'Principal',
		phone: '999666333',
		email: 'fmontero@gmail.com',
		name: 'Federico Montero',
	},
];

const ClientUsers: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [clientUsers, setClientUsers] = useState<ClientUser[]>([]);
	const [filtered, setFiltered] = useState<ClientUser[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, clientUsers);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onClientChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setClientUsers(clientUserRows);
			setFiltered(clientUserRows);
		}, 1000);
	};

	const onEditClient = (clientUser: ClientUser) => {
		const newClients = clientUsers.map((d) =>
			d.id === clientUser.id ? clientUser : d,
		);
		setClientUsers(newClients);
		setFiltered(newClients);
		// Perform API call
		addPageMessage!({
			title: 'Contacto Editado',
			text: 'Se edito el contacto correctamente',
			status: 'success',
		});
	};

	const onTurnUser = (id: string) => {
		// Perform API call
		addPageMessage!({
			title: 'Contacto Convertido',
			text: 'Se hizo la conversión a usuario del contacto correctamente',
			status: 'success',
		});
	};

	return (
		<div>
			<div>
				<PageTitle title='Contactos por Cliente' />
				<TypeAhead
					options={MOCKED_CLIENTS_TYPEAHEAD}
					placeholder='Cliente'
					onChange={onClientChange}
				/>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && clientUsers.length === 0 && (
					<EmptyState text='Ingrese un cliente' />
				)}
				{!loading && clientUsers.length > 0 && (
					<React.Fragment>
						<PageActionBar>
							<TableFilter value={query} onChange={onFilterChange} />
						</PageActionBar>
						<BasicTable columns={CLIENT_USER_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<ClientUserRow
										key={i}
										item={item}
										onEdit={onEditClient}
										onTurnUser={onTurnUser}
									/>
								))}
							</React.Fragment>
						</BasicTable>
					</React.Fragment>
				)}
			</PageBody>
		</div>
	);
};

export default ClientUsers;
