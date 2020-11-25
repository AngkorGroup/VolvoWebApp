import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import {
	PageLoader,
	PaginatedTable,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { CardBatch } from 'common/utils';
import CardBatchesRow from './CardBatchesRow/CardBatchesRow';
import { CardBatchRow, VolvoCardData } from '../interfaces';
import { CARD_BATCH_COLUMNS } from '../columns';
import { useQuery } from 'react-query';
import { getCardBatches } from 'common/services/Batches';
import { TABLE_ROWS_PER_PAGE } from 'common/constants/tableColumn';

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
		currency: balance.currency?.symbol,
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
	const { data, status } = useQuery([id], getCardBatches);
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
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);

	const handleChangePage = (_: any, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const rows = useMemo(
		() =>
			cardBatches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, cardBatches],
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
					<PaginatedTable
						columns={CARD_BATCH_COLUMNS}
						page={page}
						count={cardBatches.length}
						rowsPerPage={rowsPerPage}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					>
						<React.Fragment>
							{rows.map((item, i: number) => (
								<CardBatchesRow key={i} item={item} cardData={newCardData} />
							))}
						</React.Fragment>
					</PaginatedTable>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default CardBatchesModal;
