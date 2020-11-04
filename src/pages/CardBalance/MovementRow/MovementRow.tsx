import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Amount, ImageModal, VolvoIconButton } from 'common/components';
import { CardMovement } from '../interface';
import { getPendingStatus } from 'common/utils';

interface MovementRowProps {
	item: CardMovement;
}

const MovementRow = ({ item }: MovementRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		type,
		operationNumber,
		operationDate,
		reason,
		amount,
		dealerName,
		cashier,
		batch,
		source,
		voucherURL,
		chargeStatus,
	} = item;
	const pendingStatus = getPendingStatus(chargeStatus);
	return (
		<TableRow>
			<TableCell>{type}</TableCell>
			<TableCell>{operationNumber}</TableCell>
			<TableCell>{operationDate}</TableCell>
			<TableCell>{reason}</TableCell>
			<TableCell align='right'>
				{pendingStatus && `(${pendingStatus}) `}
				<Amount value={amount} />
			</TableCell>
			<TableCell>{dealerName}</TableCell>
			<TableCell>{cashier}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell align='center'>{source}</TableCell>
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
