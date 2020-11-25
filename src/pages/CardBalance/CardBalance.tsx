import { createStyles, makeStyles } from '@material-ui/core';
import {
	AsyncTypeAhead,
	CustomTab,
	CustomTabs,
	EmptyState,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	PaginatedTable,
	TableFilter,
	TabPanel,
	VolvoCard,
} from 'common/components';
import { TABLE_ROWS_PER_PAGE } from 'common/constants/tableColumn';
import {
	getCardBatches,
	getCardsByFilter,
	getMovementsByCard,
} from 'common/services';
import { Card, filterRows, Option, parseCards } from 'common/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { EXPIRATION_COLUMNS, MOVEMENT_COLUMNS } from './columns';
import ExpirationRow from './ExpirationRow/ExpirationRow';
import {
	Expiration,
	mapExpirations,
	CardMovement,
	mapMovements,
} from './interface';
import MovementRow from './MovementRow/MovementRow';

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
	const [movements, setMovements] = useState<CardMovement[]>([]);
	const [filteredMovements, setFilteredMovements] = useState<CardMovement[]>(
		[],
	);
	const [expirations, setExpirations] = useState<Expiration[]>([]);
	const [filteredExpirations, setFilteredExpirations] = useState<Expiration[]>(
		[],
	);
	const [movPage, setMovPage] = useState(0);
	const [movRowsPerPage, setRowsMovPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [expPage, setExpPage] = useState(0);
	const [expRowsPerPage, setExpRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);

	useEffect(() => {
		setLoadingOptions(true);
		const fetchCards = async () => {
			const response = await getCardsByFilter();
			if (response.ok) {
				const data = parseCards(response.data || []);
				setCards(response.data || []);
				setOptions(data);
			}
			setLoadingOptions(false);
		};

		fetchCards();
	}, []);

	const onMovChangePage = (_: any, newPage: number) => {
		setMovPage(newPage);
	};

	const onMovChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsMovPerPage(parseInt(event.target.value, 10));
		setMovPage(0);
	};

	const onExpChangePage = (_: any, newPage: number) => {
		setExpPage(newPage);
	};

	const onExpChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setExpRowsPerPage(parseInt(event.target.value, 10));
		setExpPage(0);
	};

	const onTypeCard = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingOptions(true);
		const response = await getCardsByFilter(e.target.value);
		if (response.ok) {
			const data = parseCards(response.data || []);
			setCards(response.data || []);
			setOptions(data);
		}
		setLoadingOptions(false);
	};

	const onCardChange = async (_: any, newValue: string | Option) => {
		setLoading(true);
		const cardId = (newValue as Option).value;
		const curCard = cards.find((c) => `${c.id}` === cardId) || null;
		setCard(curCard);
		const movResponse = await getMovementsByCard(cardId);
		if (movResponse.ok) {
			const movementRows = mapMovements(movResponse?.data || []);
			setMovements(movementRows);
			setFilteredMovements(movementRows);
		}
		const expResponse = await getCardBatches(cardId);
		if (expResponse.ok) {
			const expirationRows = mapExpirations(expResponse?.data || []);
			setExpirations(expirationRows);
			setFilteredExpirations(expirationRows);
		}
		setLoading(false);
	};

	const onMovementFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, movements);
		setQueryMovement(newQuery);
		setFilteredMovements(filtered);
		setMovPage(0);
	};

	const onExpirationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, expirations);
		setQueryExpiration(newQuery);
		setFilteredExpirations(filtered);
		setExpPage(0);
	};

	const movRows = useMemo(
		() =>
			filteredMovements.slice(
				movPage * movRowsPerPage,
				movPage * movRowsPerPage + movRowsPerPage,
			),
		[movPage, movRowsPerPage, filteredMovements],
	);

	const expRows = useMemo(
		() =>
			filteredExpirations.slice(
				expPage * expRowsPerPage,
				expPage * expRowsPerPage + expRowsPerPage,
			),
		[expPage, expRowsPerPage, filteredExpirations],
	);
	const cardType = card?.cardType?.name || '';
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
							title={card?.cardType?.displayName}
							number={card.code}
							balance={card.balance.value}
							currency={card.balance.currency?.symbol}
							color={card?.cardType?.color}
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
								<PaginatedTable
									columns={MOVEMENT_COLUMNS}
									count={filteredMovements.length}
									page={movPage}
									rowsPerPage={movRowsPerPage}
									onChangePage={onMovChangePage}
									onChangeRowsPerPage={onMovChangeRowsPerPage}
								>
									<React.Fragment>
										{movRows.map((item, i: number) => (
											<MovementRow key={i} item={item} />
										))}
									</React.Fragment>
								</PaginatedTable>
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
									count={filteredExpirations.length}
									page={expPage}
									rowsPerPage={expRowsPerPage}
									onChangePage={onExpChangePage}
									onChangeRowsPerPage={onExpChangeRowsPerPage}
								>
									<React.Fragment>
										{expRows.map((item, i: number) => (
											<ExpirationRow
												key={i}
												item={{ ...item, type: cardType }}
											/>
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

export default CardBalance;
