import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import CustomTab from '../../common/components/CustomTab/CustomTab';
import CustomTabs from '../../common/components/CustomTabs/CustomTabs';
import EmptyState from '../../common/components/EmptyState/EmptyState';
import PageBody from '../../common/components/PageBody/PageBody';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import TabPanel from '../../common/components/TabPanel/TabPanel';
import TypeAhead, { Option } from '../../common/components/TypeAhead/TypeAhead';
import { MOCKED_CLIENTS_TYPEAHEAD } from '../../common/utils/mocked';
import { CardType } from './interfaces';
import CardRow from './CardRow/CardRow';
import ExpirationRow, { Expiration } from './ExpirationRow/ExpirationRow';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import TableFilter from '../../common/components/TableFilter/TableFilter';
import { filterRows } from '../../common/utils/utils';

const cardColumns = [
	{ title: 'Tipo de Tarjeta' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: 'center' as 'center' } },
	{ title: 'Acciones', props: { align: 'center' as 'center' } },
];

const cardRows = [
	{
		id: '1',
		cardType: 'VREP',
		currency: 'US$',
		balance: '8,400.00',
	},
	{
		id: '2',
		cardType: 'VURE',
		currency: 'US$',
		balance: '6,400.00',
	},
];

const expirationColumns = [
	{ title: 'Tipo de Tarjeta' },
	{ title: 'Número de Tarjeta' },
	{ title: 'Lote' },
	{ title: 'Vencimiento' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: 'center' as 'center' } },
	{ title: 'Acciones', props: { align: 'center' as 'center' } },
];

const expirationRows = [
	{
		cardType: 'VREP',
		cardNumber: '924201002274611260',
		batch: '01012020',
		expiration: '01/01/2021',
		currency: 'US$',
		balance: '2,500.00',
	},
	{
		cardType: 'VREP',
		cardNumber: '924201002274611260',
		batch: '01062020',
		expiration: '01/06/2021',
		currency: 'US$',
		balance: '900.00',
	},
	{
		cardType: 'VURE',
		cardNumber: '924201002274611262',
		batch: '01072020',
		expiration: '01/07/2021',
		currency: 'US$',
		balance: '400.00',
	},
	{
		cardType: 'VURE',
		cardNumber: '924201002274611262',
		batch: '11082020',
		expiration: '01/08/2021',
		currency: 'US$',
		balance: '200.00',
	},
];

const useStyles = makeStyles({
	cardsTable: {
		width: '650px',
	},
});

const ClientBalance: React.FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [queryCard, setQueryCard] = useState('');
	const [queryExpiration, setQueryExpiration] = useState('');
	const [cards, setCards] = useState<CardType[]>([]);
	const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
	const [expirations, setExpirations] = useState<Expiration[]>([]);
	const [filteredExpirations, setFilteredExpirations] = useState<Expiration[]>(
		[],
	);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);

	const onClientChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setCards(cardRows);
			setFilteredCards(cardRows);
			setExpirations(expirationRows);
			setFilteredExpirations(expirationRows);
			setLoading(false);
		}, 1500);
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
	};
	return (
		<div>
			<div>
				<PageTitle title='Saldos Clientes' />
				<TypeAhead
					options={MOCKED_CLIENTS_TYPEAHEAD}
					placeholder='Cliente'
					onChange={onClientChange}
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
									columns={cardColumns}
								>
									<React.Fragment>
										{filteredCards.map((item, i: number) => (
											<CardRow key={i} item={item} />
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
								<BasicTable columns={expirationColumns}>
									<React.Fragment>
										{filteredExpirations.map((item, i: number) => (
											<ExpirationRow key={i} item={item} />
										))}
									</React.Fragment>
								</BasicTable>
							</TabPanel>
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default ClientBalance;
