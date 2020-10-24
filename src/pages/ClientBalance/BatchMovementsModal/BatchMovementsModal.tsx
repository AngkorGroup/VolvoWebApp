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
import React, { useEffect, useState } from 'react';
import { BATCH_MOVEMENTS_COLUMNS } from '../columns';
import { BatchMovementRow, VolvoCardData } from '../interfaces';
import BatchMovementsRow from './BatchMovementsRow/BatchMovementsRow';

interface BatchMovementsModalProps {
	show: boolean;
	id: string;
	cardData: VolvoCardData;
	batchText: string;
	onClose: () => void;
}

const batchMovementRows: BatchMovementRow[] = [
	{
		cardNumber: '924201002274611260',
		number: '667558',
		date: '01/01/2021 15:30',
		currency: 'US$',
		amount: '3,500.00',
		dealer: 'VOLVO SANTA ANITA',
		cashier: 'CAJA34',
		batch: '01012020',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		cardNumber: '924201002274611260',
		number: '667559',
		date: '05/03/2021 17:30',
		currency: 'US$',
		amount: '-600.00',
		dealer: 'AUTOMOTORES TACNA',
		cashier: 'CAJA4',
		batch: '01062020',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		cardNumber: '924201002274611260',
		number: '667559',
		date: '05/03/2021 17:30',
		currency: 'US$',
		amount: '-300.00',
		dealer: 'AUTOMOTORES TACNA',
		cashier: 'CAJA4',
		batch: '01072020',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		cardNumber: '924201002274611260',
		number: '667575',
		date: '02/05/2021 12:23',
		currency: 'US$',
		amount: '400.00',
		dealer: 'VOLVO SANTA ANITA',
		cashier: 'CAJA2',
		batch: '01082020',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		cardNumber: '924201002274611260',
		number: '667592',
		date: '04/06/2021 11:47',
		currency: 'US$',
		amount: '-500.00',
		dealer: 'MANUCCI DIESEL TRUJILLO',
		cashier: 'CAJA3',
		batch: '01092020',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
];

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
	const [loading, setLoading] = useState(false);
	const [batchMovements, setBatchMovements] = useState<BatchMovementRow[]>([]);

	useEffect(() => {
		// perform API call with the 'cardNumber' param
		setLoading(true);
		setTimeout(() => {
			setBatchMovements(batchMovementRows);
			setLoading(false);
		}, 1200);
	}, [batch]);

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
						title={cardData.type}
						number={cardData.number}
						type={cardData.type}
					/>
				</div>
				<div className={classes.batchInfoContainer}>{batchText}</div>
				{loading && <PageLoader />}
				{!loading && (
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
