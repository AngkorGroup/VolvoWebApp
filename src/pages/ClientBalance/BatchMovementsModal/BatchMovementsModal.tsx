import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Theme,
} from '@material-ui/core';
import {
	BasicTable,
	PageLoader,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { getCardsBatchMovements } from 'common/services';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { BATCH_MOVEMENTS_COLUMNS } from '../columns';
import { mapExpirationMovements, VolvoCardData } from '../interfaces';
import BatchMovementsRow from './BatchMovementsRow/BatchMovementsRow';

interface BatchMovementsModalProps {
	show: boolean;
	id: string;
	cardData: VolvoCardData;
	batchText: string;
	onClose: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		cardContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: spacing(2),
		},
		batchInfoContainer: {
			marginBottom: spacing(2),
		},
	}),
);

const BatchMovementsModal: React.FC<BatchMovementsModalProps> = ({
	show,
	id: batch,
	cardData,
	batchText,
	onClose,
}: BatchMovementsModalProps) => {
	const classes = useStyles();
	const { data, status } = useQuery(
		[cardData.id, batch],
		getCardsBatchMovements,
	);
	const batchMovements = useMemo(() => {
		if (data?.ok) {
			return mapExpirationMovements(data.data || []);
		}
		return [];
	}, [data]);

	return (
		<Dialog
			fullWidth
			maxWidth='lg'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Movimientos</DialogTitle>
			<DialogContent>
				<div className={classes.cardContainer}>
					<VolvoCard
						balance={cardData.balance}
						title={cardData.name}
						number={cardData.number}
						type={cardData.type}
						currency={cardData.currency}
					/>
				</div>
				<div className={classes.batchInfoContainer}>{batchText}</div>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<BasicTable columns={BATCH_MOVEMENTS_COLUMNS}>
						<React.Fragment>
							{batchMovements.map((item, i: number) => (
								<BatchMovementsRow key={i} item={item} />
							))}
						</React.Fragment>
					</BasicTable>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default BatchMovementsModal;
