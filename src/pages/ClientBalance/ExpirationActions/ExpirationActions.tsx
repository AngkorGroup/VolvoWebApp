import { VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { Expiration } from '../interfaces';
import BatchMovementsModal from '../BatchMovementsModal/BatchMovementsModal';
import { formatNumber } from 'common/utils';

interface ExpirationActionsProps {
	item: Expiration;
}

const ExpirationActions: React.FC<ExpirationActionsProps> = ({ item }) => {
	const [showModal, setShowModal] = useState(false);
	const {
		balance,
		cardId,
		cardType,
		cardNumber,
		cardName,
		cardBalance,
		cardColor,
		batch,
		currency,
	} = item;
	const cardData = {
		id: cardId,
		type: cardType,
		number: cardNumber,
		balance: cardBalance,
		currency,
		name: cardName,
		color: cardColor,
	};
	const batchText = `Lote: ${batch} - ${currency} ${formatNumber(balance)}`;
	return (
		<>
			<VolvoIconButton
				color='success'
				title='Ver Movimientos'
				onClick={() => setShowModal(true)}
			>
				<FormatListNumberedIcon />
			</VolvoIconButton>
			{showModal && (
				<BatchMovementsModal
					show={showModal}
					id={batch}
					cardData={cardData}
					onClose={() => setShowModal(false)}
					batchText={batchText}
				/>
			)}
		</>
	);
};

export default ExpirationActions;
