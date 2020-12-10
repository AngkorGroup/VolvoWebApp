import { VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ClientCardRow, VolvoCardData } from 'pages/ClientBalance/interfaces';
import CardBatchesModal from 'pages/ClientBalance/CardBatchesModal/CardBatchesModal';

interface CardListActionsProps {
	item: ClientCardRow;
	cardData: VolvoCardData;
}

const CardListActions: React.FC<CardListActionsProps> = ({
	item,
	cardData,
}) => {
	const [showModal, setShowModal] = useState(false);
	const { cardId, number, balance } = item;
	const newCardData: VolvoCardData = {
		...cardData,
		balance,
		number,
		id: cardId,
	};
	return (
		<>
			<VolvoIconButton
				color='success'
				title='Ver Lotes'
				onClick={() => setShowModal(true)}
			>
				<DashboardIcon />
			</VolvoIconButton>
			{showModal && (
				<CardBatchesModal
					show={showModal}
					id={cardId}
					cardData={newCardData}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default CardListActions;
