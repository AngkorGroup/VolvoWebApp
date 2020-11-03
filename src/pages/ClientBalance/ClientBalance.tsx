import { makeStyles } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import {
	BasicTable,
	CustomTab,
	CustomTabs,
	EmptyState,
	PageBody,
	PageLoader,
	PageTitle,
	TabPanel,
	PageActionBar,
	TableFilter,
	AsyncTypeAhead,
	PaginatedTable,
} from 'common/components';
import { filterRows, Option, parseClients } from 'common/utils';
import CardRow from './CardRow/CardRow';
import ExpirationRow from './ExpirationRow/ExpirationRow';
import {
	CardType,
	mapCardType,
	Expiration,
	mapExpirations,
} from './interfaces';
import { CARD_COLUMNS, EXPIRATION_COLUMNS } from './columns';
import { getClientCardTypes, getClients } from 'common/services';
import { getClientBatches } from 'common/services/Batches';
import { TABLE_ROWS_PER_PAGE } from 'common/constants/tableColumn';

const useStyles = makeStyles({
	cardsTable: {
		width: '650px',
	},
});

const ClientBalance: React.FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadingClients, setLoadingClients] = useState(false);
	const [selectedClient, setSelectedClient] = useState('');
	const [clients, setClients] = useState<Option[]>([]);
	const [queryCard, setQueryCard] = useState('');
	const [queryExpiration, setQueryExpiration] = useState('');
	const [cards, setCards] = useState<CardType[]>([]);
	const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
	const [expirations, setExpirations] = useState<Expiration[]>([]);
	const [filteredExpirations, setFilteredExpirations] = useState<Expiration[]>(
		[],
	);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);
	const [expPage, setExpPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);

	const handleChangePage = (
		e: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setExpPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setExpPage(0);
	};

	const onTypeQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingClients(true);
		const query = e.target.value;
		const response = await getClients(query);
		setLoadingClients(false);
		if (response.ok) {
			const data = parseClients(response.data || []);
			setClients(data);
		}
	};

	const onClientChange = async (_: any, newValue: string | Option) => {
		const clientId = (newValue as Option).value;
		setSelectedClient(clientId);
		setLoading(true);
		const cardTypesResponse = await getClientCardTypes(clientId);
		if (cardTypesResponse.ok) {
			const cardData = mapCardType(cardTypesResponse.data || []);
			setCards(cardData);
			setFilteredCards(cardData);
		}
		const movementsResponse = await getClientBatches(clientId);
		if (movementsResponse.ok) {
			const expirationData = mapExpirations(movementsResponse.data || []);
			setExpirations(expirationData);
			setFilteredExpirations(expirationData);
		}
		setLoading(false);
	};

	const onCardFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, cards);
		setQueryCard(newQuery);
		setFilteredCards(filtered);
	};

	const onExpirationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, expirations);
		setQueryExpiration(newQuery);
		setFilteredExpirations(filtered);
		setExpPage(0);
	};

	const expRows = useMemo(
		() =>
			filteredExpirations.slice(
				expPage * rowsPerPage,
				expPage * rowsPerPage + rowsPerPage,
			),
		[expPage, rowsPerPage, filteredExpirations],
	);

	return (
		<div>
			<div>
				<PageTitle title='Saldos Clientes' />
				<AsyncTypeAhead
					options={clients}
					placeholder='Cliente'
					loading={loadingClients}
					onChange={onClientChange}
					onType={onTypeQuery}
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
								<PageActionBar>
									<TableFilter
										value={queryCard}
										onChange={onCardFilterChange}
									/>
								</PageActionBar>
								<BasicTable
									tableClassname={classes.cardsTable}
									columns={CARD_COLUMNS}
								>
									<React.Fragment>
										{filteredCards.map((item, i: number) => (
											<CardRow key={i} item={item} clientId={selectedClient} />
										))}
									</React.Fragment>
								</BasicTable>
							</TabPanel>
						)}
						{!loading && expirations.length > 0 && (
							<TabPanel value={tab} index={1}>
								<PageActionBar>
									<TableFilter
										value={queryExpiration}
										onChange={onExpirationFilterChange}
									/>
								</PageActionBar>
								<PaginatedTable
									columns={EXPIRATION_COLUMNS}
									page={expPage}
									count={filteredExpirations.length}
									rowsPerPage={rowsPerPage}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								>
									<React.Fragment>
										{expRows.map((item, i: number) => (
											<ExpirationRow key={i} item={item} />
										))}
									</React.Fragment>
								</PaginatedTable>
							</TabPanel>
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default ClientBalance;
