import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {
	BasicTable,
	CustomTab,
	CustomTabs,
	EmptyState,
	PageBody,
	PageLoader,
	PageTitle,
	TabPanel,
	TypeAhead,
	PageActionBar,
	TableFilter,
} from 'common/components';
import { filterRows, MOCKED_CLIENTS_TYPEAHEAD, Option } from 'common/utils';
import CardRow from './CardRow/CardRow';
import ExpirationRow, { Expiration } from './ExpirationRow/ExpirationRow';
import { CardType } from './interfaces';
import { CARD_COLUMNS, EXPIRATION_COLUMNS } from './columns';

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
									columns={CARD_COLUMNS}
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
								<BasicTable columns={EXPIRATION_COLUMNS}>
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
