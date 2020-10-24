import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { ImageModal, VolvoIconButton } from 'common/components';
import { Movement } from '../interface';

interface MovementRowProps {
	item: Movement;
}

const MovementRow = ({ item }: MovementRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		type,
		operation,
		reason,
		amount,
		dealer,
		cashier,
		batch,
		source,
		voucherURL,
	} = item;
	return (
		<TableRow>
			<TableCell>{type}</TableCell>
			<TableCell>{operation.number}</TableCell>
			<TableCell>{operation.date}</TableCell>
			<TableCell>{reason}</TableCell>
			<TableCell align='right'>{amount}</TableCell>
			<TableCell>{dealer.name}</TableCell>
			<TableCell>{cashier}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell>{source}</TableCell>
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

export default MovementRow;
