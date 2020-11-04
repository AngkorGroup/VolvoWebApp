import React, { useContext, useState } from 'react';
import {
	AsyncTypeAhead,
	BasicTable,
	EmptyState,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
} from 'common/components';
import { filterRows, parseClients } from 'common/utils';
import { ClientUser, mapContacts } from './interfaces';
import ClientUserRow from './ClientUserRow/ClientUserRow';
import AppContext from '../../AppContext';
import { CLIENT_USER_COLUMNS } from './columns';
import { Option } from 'common/utils/types';
import { editContact, getClients, getContactsByClient } from 'common/services';

const ClientUsers: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [clients, setClients] = useState<Option[]>([]);
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

	const onTypeQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingOptions(true);
		const response = await getClients(e.target.value);
		if (response.ok) {
			const data = parseClients(response.data || []);
			setClients(data);
		}
		setLoadingOptions(false);
	};

	const onClientChange = async (_: any, newValue: string | Option) => {
		setLoading(true);
		const clientId = (newValue as Option).value;
		const response = await getContactsByClient(clientId);
		if (response.ok) {
			const data = mapContacts(response.data || []);
			setClientUsers(data);
			setFiltered(data);
		}
		setLoading(false);
	};

	const onEditClient = async (clientUser: ClientUser) => {
		const response = await editContact(clientUser);
		if (response.ok) {
			addPageMessage!({
				title: 'Contacto Convertido',
				text: 'Se hizo la conversión a usuario del contacto correctamente',
				status: 'success',
			});
		}
	};

	return (
		<div>
			<div>
				<PageTitle title='Contactos por Cliente' />
				<AsyncTypeAhead
					options={clients}
					placeholder='Cliente'
					loading={loadingOptions}
					onChange={onClientChange}
					onType={onTypeQuery}
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
									<ClientUserRow key={i} item={item} onEdit={onEditClient} />
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
