import { ImageModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { CardMovement } from '../interface';

interface MovementActionsProps {
	item: CardMovement;
}

const MovementActions: React.FC<MovementActionsProps> = ({ item }) => {
	const [showImage, setShowImage] = useState(false);
	const { voucherURL } = item;
	return (
		<>
			{!!voucherURL && (
				<VolvoIconButton
					color='primary'
					title='Ver Recibo'
					onClick={() => setShowImage(true)}
				>
					<ReceiptIcon />
				</VolvoIconButton>
			)}
			{showImage && (
				<ImageModal
					show={showImage}
					title='Detalle del Voucher'
					url={voucherURL}
					onClose={() => setShowImage(false)}
				/>
			)}
		</>
	);
};

export default MovementActions;
