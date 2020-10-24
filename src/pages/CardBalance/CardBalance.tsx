import { createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import CustomTab from '../../common/components/CustomTab/CustomTab';
import CustomTabs from '../../common/components/CustomTabs/CustomTabs';
import EmptyState from '../../common/components/EmptyState/EmptyState';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import PageBody from '../../common/components/PageBody/PageBody';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import TableFilter from '../../common/components/TableFilter/TableFilter';
import TabPanel from '../../common/components/TabPanel/TabPanel';
import TypeAhead, { Option } from '../../common/components/TypeAhead/TypeAhead';
import VolvoCard from '../../common/components/VolvoCard/VolvoCard';
import { MOCKED_CARDS_TYPEAHEAD } from '../../common/utils/mocked';
import { filterRows } from '../../common/utils/utils';
import { EXPIRATION_COLUMNS, MOVEMENT_COLUMNS } from './columns';
import ExpirationRow from './ExpirationRow/ExpirationRow';
import { Expiration, Movement, Card } from './interface';
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

const volvoCards: Card[] = [
	{ id: '1', type: 'VURE', name: 'BONO UREA', balance: 'US$ 4,800.00' },
	{ id: '2', type: 'VREP', name: 'REPUESTOS', balance: 'US$ 3,800.00' },
	{ id: '3', type: 'VURE', name: 'BONO UREA', balance: 'US$ 400.00' },
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

	const onCardChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		const curCard =
			volvoCards.find((c) => c.id === (newValue as Option).value) || null;
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
					<TypeAhead
						options={MOCKED_CARDS_TYPEAHEAD}
						placeholder='Número de Tarjeta'
						onChange={onCardChange}
					/>
				</div>
				<div className={[classes.headerItem, classes.cardContainer].join(' ')}>
					{card && (
						<VolvoCard
							type={card.type}
							title={card.name}
							balance={card.balance}
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
