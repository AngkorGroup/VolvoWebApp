import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Amount, ImageModal, VolvoIconButton } from 'common/components';
import { BatchMovementRow } from '../../interfaces';

interface BatchMovementsRowProps {
	item: BatchMovementRow;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		negative: {
			color: palette.error.main,
		},
	}),
);

const BatchMovementsRow = ({ item }: BatchMovementsRowProps) => {
	const classes = useStyles();
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		cardNumber,
		number,
		date,
		currency,
		amount,
		dealer,
		cashier,
		batch,
		voucherURL,
	} = item;
	const amountColor = amount < 0 ? classes.negative : '';
	return (
		<TableRow>
			<TableCell>{cardNumber}</TableCell>
			<TableCell>{number}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell className={amountColor} align='right'>
				<Amount value={amount} />
			</TableCell>
			<TableCell>{dealer}</TableCell>
			<TableCell>{cashier}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell align='center'>
				{!!voucherURL && (
					<VolvoIconButton
						color='primary'
						title='Ver Recibo'
						onClick={onOpenModal}
					>
						<ReceiptIcon />
					</VolvoIconButton>
				)}
			</TableCell>
			{!!voucherURL && (
				<ImageModal
					show={showModal}
					title='Detalle del Voucher'
					url={voucherURL}
					onClose={onCloseModal}
				/>
			)}
		</TableRow>
	);
};

export default BatchMovementsRow;
