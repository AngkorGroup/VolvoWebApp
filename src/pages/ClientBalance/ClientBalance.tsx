import CancelIcon from '@material-ui/icons/Cancel';
import React, { useMemo, useState } from 'react';
import {
	CustomTab,
	CustomTabs,
	EmptyState,
	PageBody,
	PageLoader,
	PageTitle,
	TabPanel,
	AsyncTypeAhead,
	GenericTable,
	Amount,
} from 'common/components';
import { getKeyStatus, Option, parseClients } from 'common/utils';
import {
	CardType,
	mapCardType,
	Expiration,
	mapExpirations,
	BatchMovementRow,
} from './interfaces';
import { EXPIRATION_COLUMNS, CARD_COLUMNS } from './columns';
import {
	getClientCardTypes,
	getClientBatches,
	getQueryClients,
} from 'common/services';
import { ACTIONS_COLUMN_V2 } from 'common/constants/tableColumn';
import ExpirationActions from './ExpirationActions/ExpirationActions';
import CardActions from './CardActions/CardActions';
import { useQuery } from 'react-query';

interface ClientRuc {
	id: number;
	ruc: string;
}

type Event = React.ChangeEvent<HTMLInputElement>;

export const renderAmount = ({ amount, chargeStatus }: BatchMovementRow) => {
	const status = getKeyStatus(chargeStatus as any);
	return (
		<>
			{status === 'P' && `(${status}) `}
			{status === 'R' && <CancelIcon color='error' titleAccess='Rechazado' />}
			<Amount value={amount} />
		</>
	);
};

const ClientBalance: React.FC = () => {
	const [tab, setTab] = useState(0);
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [selectedClient, setSelectedClient] = useState('');
	const [clientRUCList, setClientRUCList] = useState<ClientRuc[]>([]);
	const [cards, setCards] = useState<CardType[]>([]);
	const [expirations, setExpirations] = useState<Expiration[]>([]);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);
	const { data: dataOptions, isLoading: loadingClients } = useQuery(
		['getQueryClients', query, true],
		getQueryClients,
	);
	const options = useMemo(() => {
		if (dataOptions?.ok) {
			const data = dataOptions?.data || [];
			setClientRUCList(data.map((d) => ({ id: d.id, ruc: d.ruc })));
			return parseClients(data);
		}
		return [];
	}, [dataOptions]);

	const onClientChange = async (_: any, newValue: string | Option) => {
		const clientId = (newValue as Option).value;
		setSelectedClient(clientId);
		setLoading(true);
		const cardTypesResponse = await getClientCardTypes(clientId);
		if (cardTypesResponse.ok) {
			const cardData = mapCardType(cardTypesResponse.data || []);
			setCards(cardData);
		}
		const movementsResponse = await getClientBatches(clientId);
		if (movementsResponse.ok) {
			const expirationData = mapExpirations(movementsResponse.data || []);
			setExpirations(expirationData);
		}
		setLoading(false);
	};

	const curClient = clientRUCList.find((c) => `${c.id}` === selectedClient);
	const clientRUC = curClient && curClient.ruc;

	const cardColumns = useMemo(
		() => [
			...CARD_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<CardActions item={cell?.row?.original} clientId={selectedClient} />
				),
			},
		],
		[selectedClient],
	);

	const expirationColumns = useMemo(
		() => [
			...EXPIRATION_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => <ExpirationActions item={cell?.row?.original} />,
			},
		],
		[],
	);

	return (
		<div>
			<div>
				<PageTitle title='Saldos Clientes' />
				<AsyncTypeAhead
					options={options}
					placeholder='Cliente'
					loading={loadingClients}
					onChange={onClientChange}
					onType={(e: Event) => setQuery(e.target.value)}
				/>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && cards.length + expirations.length === 0 && (
					<EmptyState text='Ingrese un cliente' />
				)}
				{!loading && cards.length > 0 && expirations.length > 0 && (
					<div>
						<CustomTabs value={tab} onChange={onTabChange}>
							<CustomTab id='cards' label='Tarjetas' />
							<CustomTab id='expirations' label='Vencimientos' />
						</CustomTabs>
						{!loading && cards.length > 0 && (
							<TabPanel value={tab} index={0}>
								<GenericTable
									filename={`Saldos_Cliente_Tipos_de_Tarjetas_${clientRUC}`}
									columns={cardColumns}
									data={cards}
								/>
							</TabPanel>
						)}
						{!loading && expirations.length > 0 && (
							<TabPanel value={tab} index={1}>
								<GenericTable
									filename={`Saldos_Cliente_Vencimientos_${clientRUC}`}
									columns={expirationColumns}
									data={expirations}
								/>
							</TabPanel>
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default ClientBalance;
