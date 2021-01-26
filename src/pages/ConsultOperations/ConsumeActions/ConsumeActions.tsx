import { ImageModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Consume } from '../interface';

interface ConsumeActionsProps {
	item: Consume;
}

const ConsumeActions: React.FC<ConsumeActionsProps> = ({ item }) => {
	const [showModal, setShowModal] = useState(false);
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const { voucherURL } = item;
	return (
		<>
			{!!voucherURL && (
				<VolvoIconButton
					color='primary'
					title='Ver Recibo'
					onClick={onOpenModal}
				>
					<ReceiptIcon />
				</VolvoIconButton>
			)}
			{showModal && !!voucherURL && (
				<ImageModal
					show={showModal}
					title='Detalle del Voucher'
					url={voucherURL}
					onClose={onCloseModal}
				/>
			)}
		</>
	);
};

export default ConsumeActions;
