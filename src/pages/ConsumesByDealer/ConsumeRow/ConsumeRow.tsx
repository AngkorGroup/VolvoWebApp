import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import { Consume } from '../interface';
import ImageModal from '../../../common/components/ImageModal/ImageModal';

interface ConsumeRowProps {
	item: Consume;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		negative: {
			color: palette.error.main,
		},
	}),
);

const ConsumeRow = ({ item }: ConsumeRowProps) => {
	const classes = useStyles();
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		cardType,
		cardNumber,
		tpNumber,
		client,
		date,
		contact,
		currency,
		amount,
		voucherURL,
	} = item;
	const amountColor = amount.includes('-') ? classes.negative : '';
	return (
		<TableRow>
			<TableCell>{cardType}</TableCell>
			<TableCell>{cardNumber}</TableCell>
			<TableCell>{tpNumber}</TableCell>
			<TableCell>{client}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{contact}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell className={amountColor} align='right'>
				{amount}
			</TableCell>
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

export default ConsumeRow;
