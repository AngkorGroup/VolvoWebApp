import { createStyles, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {
	Amount,
	AsyncTypeAhead,
	CustomTab,
	CustomTabs,
	EmptyState,
	GenericTable,
	PageBody,
	PageLoader,
	PageTitle,
	TabPanel,
	VolvoCard,
} from 'common/components';
import { ACTIONS_COLUMN_V2 } from 'common/constants/tableColumn';
import {
	getQueryCardBatches,
	getQueryCardsByFilter,
	getQueryMovementsByCard,
} from 'common/services';
import { Card, getKeyStatus, Option, parseCards } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { NEW_EXPIRATION_COLUMNS, NEW_MOVEMENT_COLUMNS } from './columns';
import { mapExpirations, CardMovement, mapMovements } from './interface';
import MovementActions from './MovementActions/MovementActions';

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

export const renderMovementAmount = (item: CardMovement) => {
	const { chargeStatus, amount } = item;
	const status = getKeyStatus(chargeStatus as any);
	return (
		<>
			{status === 'P' && `(${status}) `}
			{status === 'R' && <CancelIcon color='error' titleAccess='Rechazado' />}
			<Amount value={amount} />
		</>
	);
};

type Event = React.ChangeEvent<HTMLInputElement>;

const initialMovements: any = { data: [] };
const initialExpiration: any = { data: [] };

const CardBalance: React.FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState(0);
	const [query, setQuery] = useState('');
	const [cardId, setCardId] = useState('');
	const [cards, setCards] = useState<Card[]>([]);
	const [card, setCard] = useState<Card | null>(null);
	const onTabChange = (_: any, newTab: number) => setTab(newTab);
	const { data: dataOptions, isLoading: loadingOptions } = useQuery(
		['getQueryCardsByFilter', query],
		getQueryCardsByFilter,
	);
	const options = useMemo(() => {
		if (dataOptions?.ok) {
			setCards(dataOptions?.data || []);
			return parseCards(dataOptions?.data || []);
		}
		return [];
	}, [dataOptions]);

	const movementQuery = useQuery(
		['getQueryMovementsByCard', cardId],
		getQueryMovementsByCard,
		{ initialData: cardId ? undefined : initialExpiration },
	);
	const movements = useMemo(() => {
		if (cardId && movementQuery.data?.ok) {
			return mapMovements(movementQuery.data?.data || []);
		}
		return [];
	}, [movementQuery, cardId]);

	const expirationQuery = useQuery(
		['getQueryCardBatches', cardId],
		getQueryCardBatches,
		{ initialData: cardId ? undefined : initialMovements },
	);
	const expirations = useMemo(() => {
		if (cardId && expirationQuery.data?.ok) {
			return mapExpirations(expirationQuery.data?.data || []);
		}
		return [];
	}, [expirationQuery, cardId]);

	const onTypeCard = (e: Event) => setQuery(e.target.value);

	const onCardChange = async (_: any, newValue: string | Option) => {
		const id = (newValue as Option).value;
		const curCard = cards.find((c) => `${c.id}` === id) || null;
		setCardId(id);
		setCard(curCard);
	};

	const movementColumns = useMemo(
		() => [
			...NEW_MOVEMENT_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => <MovementActions item={cell?.row?.original} />,
			},
		],
		[],
	);

	const loading = movementQuery.isLoading || expirationQuery.isLoading;

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
						{!movementQuery.isLoading && movements.length > 0 && (
							<TabPanel value={tab} index={0}>
								<GenericTable
									filename={`Saldos_Tarjeta_Movimientos_${card?.code}`}
									columns={movementColumns}
									data={movements}
								/>
							</TabPanel>
						)}
						{!expirationQuery.isLoading && expirations.length > 0 && (
							<TabPanel value={tab} index={1}>
								<GenericTable
									filename={`Saldos_Tarjeta_Vencimientos_${card?.code}`}
									columns={NEW_EXPIRATION_COLUMNS}
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

export default CardBalance;
