import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Amount, ImageModal, VolvoIconButton } from 'common/components';
import CancelIcon from '@material-ui/icons/Cancel';
import { CardMovement } from '../interface';
import { getKeyStatus } from 'common/utils';

interface MovementRowProps {
	item: CardMovement;
}

const MovementRow = ({ item }: MovementRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		id,
		type,
		operationNumber,
		operationDate,
		reason,
		amount,
		dealerName,
		cashier,
		source,
		voucherURL,
		chargeStatus,
	} = item;
	const status = getKeyStatus(chargeStatus);
	return (
		<TableRow>
			<TableCell>{type}</TableCell>
			<TableCell>{operationNumber}</TableCell>
			<TableCell>{operationDate}</TableCell>
			<TableCell>{reason}</TableCell>
			<TableCell align='center'>{id}</TableCell>
			<TableCell align='right'>
				{status === 'P' && `(${status}) `}
				{status === 'R' && <CancelIcon color='error' titleAccess='Rechazado' />}
				<Amount value={amount} />
			</TableCell>
			<TableCell>{dealerName}</TableCell>
			<TableCell>{cashier}</TableCell>
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
