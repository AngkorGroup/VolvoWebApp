import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VolvoIconButton from '../../../../common/components/VolvoIconButton/VolvoIconButton';
import { BatchMovementRow } from '../../interfaces';
import ImageModal from '../../../../common/components/ImageModal/ImageModal';

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
	const amountColor = amount.includes('-') ? classes.negative : '';
	return (
		<TableRow>
			<TableCell>{cardNumber}</TableCell>
			<TableCell>{number}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell className={amountColor} align='right'>
				{amount}
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
