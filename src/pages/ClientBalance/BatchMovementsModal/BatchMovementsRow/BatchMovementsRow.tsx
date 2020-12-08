import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Amount, ImageModal, VolvoIconButton } from 'common/components';
import CancelIcon from '@material-ui/icons/Cancel';
import { BatchMovementRow } from '../../interfaces';
import { getKeyStatus } from 'common/utils';

interface BatchMovementsRowProps {
	item: BatchMovementRow;
}

const BatchMovementsRow = ({ item }: BatchMovementsRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const {
		number,
		date,
		currency,
		amount,
		dealer,
		cashier,
		batch,
		voucherURL,
		chargeStatus,
		type,
	} = item;
	const status = getKeyStatus(chargeStatus as any);
	return (
		<TableRow>
			<TableCell>{type}</TableCell>
			<TableCell>{number}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				{status === 'P' && `(${status}) `}
				{status === 'R' && <CancelIcon color='error' titleAccess='Rechazado' />}
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
