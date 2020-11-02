import { createStyles, makeStyles } from '@material-ui/core';
import {
	AsyncTypeAhead,
	BasicTable,
	CustomTab,
	CustomTabs,
	EmptyState,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	TabPanel,
	VolvoCard,
} from 'common/components';
import { getCardsByFilter } from 'common/services';
import { Card, filterRows, Option, parseCard } from 'common/utils';
import React, { useState } from 'react';
import { EXPIRATION_COLUMNS, MOVEMENT_COLUMNS } from './columns';
import ExpirationRow from './ExpirationRow/ExpirationRow';
import { Expiration, Movement } from './interface';
import MovementRow from './MovementRow/MovementRow';

const movementRows: Movement[] = [
	{
		type: 'CARGA',
		operation: {
			number: '667558',
			date: '01/01/2020',
		},
		reason: 'COMPRA',
		amount: '5,000.00',
		dealer: {
			id: '1',
			name: 'AUTOMOTORES TACNA',
		},
		cashier: '-',
		batch: '01012020',
		source: '-',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
];

const expirationRows: Expiration[] = [
	{
		type: 'VREP',
		number: '924201002274611260',
		batch: '01012020',
		currency: 'US$',
		balance: '1,200.00',
		expirationDate: '24/06/2021',
	},
];

const useStyles = makeStyles(
	createStyles({
		header: {
			display: 'flex',
		},
		headerItem: {
			flexGrow: 3,
		},
		cardContainer: {
			display: 'flex',
			justifyContent: 'center',
			flexGrow: 1,
		},
	}),
);

const CardBalance: React.FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [options, setOptions] = useState<Option[]>([]);
	const [cards, setCards] = useState<Card[]>([]);
	const [queryMovement, setQueryMovement] = useState('');
	const [queryExpiration, setQueryExpiration] = useState('');
	const [card, setCard] = useState<Card | null>(null);
	const [movements, setMovements] = useState<Movement[]>([]);
	const [filteredMovements, setFilteredMovements] = useState<Movement[]>([]);
	const [expirations, setExpirations] = useState<Expiration[]>([]);
	const [filteredExpirations, setFilteredExpirations] = useState<Expiration[]>(
		[],
	);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);

	const onTypeCard = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingOptions(true);
		const response = await getCardsByFilter(e.target.value);
		if (response.ok) {
			const data = parseCard(response.data || []);
			setCards(response.data || []);
			setOptions(data);
		}
		setLoadingOptions(false);
	};

	const onCardChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		const curCard =
			cards.find((c) => `${c.id}` === (newValue as Option).value) || null;
		setCard(curCard);
		setTimeout(() => {
			setMovements(movementRows);
			setFilteredMovements(movementRows);
			setExpirations(expirationRows);
			setFilteredExpirations(expirationRows);
			setLoading(false);
		}, 1200);
	};

	const onMovementFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, movements);
		setQueryMovement(newQuery);
		setFilteredMovements(filtered);
	};

	const onExpirationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, expirations);
		setQueryExpiration(newQuery);
		setFilteredExpirations(filtered);
	};
	return (
		<div>
			<div className={classes.header}>
				<div className={classes.headerItem}>
					<PageTitle title='Saldos Tarjeta' />
					<AsyncTypeAhead
						options={options}
						placeholder='Número de Tarjeta'
						loading={loadingOptions}
						onChange={onCardChange}
						onType={onTypeCard}
					/>
				</div>
				<div className={[classes.headerItem, classes.cardContainer].join(' ')}>
					{card && (
						// TODO: replace when endpoint retrieves type and name
						<VolvoCard
							type={'VURE'}
							title={'VOLVO UREA'}
							number={card.code}
							balance={card.balance.value}
							currency={card.balance.currency}
						/>
					)}
				</div>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && movements.length + expirations.length === 0 && (
					<EmptyState text='Ingrese un número de tarjeta' />
				)}
				{!loading && movements.length > 0 && expirations.length > 0 && (
					<div>
						<CustomTabs value={tab} onChange={onTabChange}>
							<CustomTab id='movements' label='Movimientos' />
							<CustomTab id='expirations' label='Vencimientos' />
						</CustomTabs>
						{!loading && movements.length > 0 && (
							<TabPanel value={tab} index={0}>
								<PageActionBar>
									<TableFilter
										value={queryMovement}
										onChange={onMovementFilterChange}
									/>
								</PageActionBar>
								<BasicTable columns={MOVEMENT_COLUMNS}>
									<React.Fragment>
										{filteredMovements.map((item, i: number) => (
											<MovementRow key={i} item={item} />
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

export default CardBalance;
