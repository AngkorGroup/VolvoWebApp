import React, { useMemo, useState } from 'react';
import {
	AsyncTypeAhead,
	EmptyState,
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
} from 'common/components';
import { buildAlertBody as at, parseClients } from 'common/utils';
import { mapContacts } from './interfaces';
import { CLIENT_USER_COLUMNS } from './columns';
import { Option } from 'common/utils/types';
import {
	editContact,
	getQueryClients,
	makeContactPrimary,
	getQueryContactsByClient,
} from 'common/services';
import { useAlert } from 'react-alert';
import ContactActions from './ContactActions/ContactActions';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import { ClientUserForm } from 'common/validations';
import { useQuery } from 'react-query';

type Event = React.ChangeEvent<HTMLInputElement>;

const initialContacts: any = { data: [] };

const ClientUsers: React.FC = () => {
	const alert = useAlert();
	const [clientId, setClientId] = useState('');
	const [query, setQuery] = useState('');
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, isLoading: loadingOptions } = useQuery(
		['getQueryClients', query, onlyActive],
		getQueryClients,
	);
	const options = useMemo(() => {
		if (data?.ok) {
			return parseClients(data?.data || []);
		}
		return [];
	}, [data]);

	const { data: dataContacts, status, isLoading, refetch } = useQuery(
		['getQueryContactsByClient', clientId, onlyActive],
		getQueryContactsByClient,
		{ initialData: clientId ? undefined : initialContacts },
	);
	const contacts = useMemo(() => {
		if (dataContacts?.ok) {
			return mapContacts(dataContacts?.data || []);
		}
		return [];
	}, [dataContacts]);

	const onOnlyActiveChange = (e: Event) => setOnlyActive(e.target.checked);

	const onTypeQuery = (e: Event) => setQuery(e.target.value);

	const onClientChange = (_: any, newValue: string | Option) =>
		setClientId((newValue as Option).value);

	const onTurnUser = async (id: string) => {
		const response = await makeContactPrimary(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Contacto Convertido',
					'Se hizo la conversión a usuario del contacto correctamente',
				),
			);
		}
	};

	const onEditClient = async (form: ClientUserForm) => {
		const response = await editContact(form);
		if (response.ok) {
			refetch();
			alert.success(
				at('Contacto Editado', 'Se ha editado el contacto correctamente'),
			);
		}
	};

	const columns = useMemo(
		() => [
			...CLIENT_USER_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<ContactActions
						item={cell?.row?.original}
						onEdit={onEditClient}
						onTurnUser={onTurnUser}
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
				<PageTitle title='Contactos por Cliente' />
				<AsyncTypeAhead
					options={options}
					placeholder='Cliente'
					loading={loadingOptions}
					onChange={onClientChange}
					onType={onTypeQuery}
				/>
			</div>
			<PageBody>
				{isLoading && <PageLoader />}
				{!isLoading && !clientId && <EmptyState text='Ingrese un cliente' />}
				{!isLoading && clientId && status === 'success' && (
					<PageBody>
						<GenericTable
							filename={`Contactos_por_cliente_${clientId}`}
							columns={columns}
							data={contacts}
							customFilters={
								<OnlyActiveFilter
									checked={onlyActive}
									onChange={onOnlyActiveChange}
								/>
							}
						/>
					</PageBody>
				)}
			</PageBody>
		</div>
	);
};

export default ClientUsers;
