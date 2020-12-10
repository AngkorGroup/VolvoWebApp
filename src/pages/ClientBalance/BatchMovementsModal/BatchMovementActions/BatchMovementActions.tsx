import { ImageModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { BatchMovementRow } from 'pages/ClientBalance/interfaces';

interface BatchMovementActionsProps {
	item: BatchMovementRow;
}

const BatchMovementActions: React.FC<BatchMovementActionsProps> = ({
	item,
}) => {
	const [showModal, setShowModal] = useState(false);
	const { voucherURL } = item;
	return (
		<>
			{!!voucherURL && (
				<VolvoIconButton
					color='primary'
					title='Ver Recibo'
					onClick={() => setShowModal(true)}
				>
					<ReceiptIcon />
				</VolvoIconButton>
			)}
			{showModal && (
				<ImageModal
					show={showModal}
					title='Detalle del Voucher'
					url={voucherURL}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default BatchMovementActions;
