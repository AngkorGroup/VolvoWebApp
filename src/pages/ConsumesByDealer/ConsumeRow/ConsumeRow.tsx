import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import { Consume } from '../interface';
import ImageModal from '../../../common/components/ImageModal/ImageModal';
import { Amount } from 'common/components';

interface ConsumeRowProps {
	item: Consume;
}

const ConsumeRow = ({ item }: ConsumeRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		voucher,
		paymentType,
		status,
		cardType,
		cardNumber,
		cashier,
		client,
		date,
		contact,
		currency,
		amount,
		voucherURL,
	} = item;
	return (
		<TableRow>
			<TableCell>{voucher}</TableCell>
			<TableCell>{cardType}</TableCell>
			<TableCell>{cardNumber}</TableCell>
			<TableCell>{cashier}</TableCell>
			<TableCell>{client}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{paymentType}</TableCell>
			<TableCell>{status}</TableCell>
			<TableCell>{contact}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={amount} />
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
