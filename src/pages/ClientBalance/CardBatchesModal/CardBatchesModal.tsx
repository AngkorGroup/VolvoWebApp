import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import {
	GenericTable,
	PageLoader,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { CardBatch } from 'common/utils';
import { CardBatchRow, VolvoCardData } from '../interfaces';
import { CARD_BATCH_COLUMNS } from '../columns';
import { useQuery } from 'react-query';
import { getQueryCardBatches } from 'common/services';
import CardBatchActions from './CardBatchActions/CardBatchActions';
import { ACTIONS_COLUMN_V2 } from 'common/constants';

interface CardBatchesModalProps {
	show: boolean;
	id: string;
	cardData: VolvoCardData;
	onClose: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		cardContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: spacing(2),
		},
	}),
);

const mapCardBatchList = (data: CardBatch[]): CardBatchRow[] => {
	return data.map(({ card, batchId, expiresAt, balance }) => ({
		number: card.code,
		batch: `${batchId}`,
		expiration: expiresAt,
		currency: balance.currencySymbol,
		balance: balance.value,
	}));
};

const CardBatchesModal: React.FC<CardBatchesModalProps> = ({
	show,
	id,
	cardData,
	onClose,
}: CardBatchesModalProps) => {
	const classes = useStyles();
	const { data, status } = useQuery(
		['getQueryCardBatches', id],
		getQueryCardBatches,
	);
	const cardBatches = useMemo(() => {
		if (data?.ok) {
			return mapCardBatchList(data?.data || []);
		}
		return [];
	}, [data]);
	const { color, number, balance, name, currency } = cardData;
	const newCardData: VolvoCardData = {
		...cardData,
		id,
	};

	const columns = useMemo(
		() => [
			...CARD_BATCH_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<CardBatchActions item={cell?.row?.original} cardData={newCardData} />
				),
			},
		],
		[newCardData],
	);
	return (
		<Dialog
			fullWidth
			maxWidth='md'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Lotes</DialogTitle>
			<DialogContent>
				<div className={classes.cardContainer}>
					<VolvoCard
						balance={balance}
						title={name}
						number={number}
						currency={currency}
						color={color}
					/>
				</div>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable
						filename={`Saldos_Cliente_Lotes_de_Tarjeta_${cardData.number}`}
						columns={columns}
						data={cardBatches}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default CardBatchesModal;
