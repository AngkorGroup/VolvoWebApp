import { VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { CardType } from '../interfaces';
import CardListModal from '../CardListModal/CardListModal';

interface CardActionsProps {
	item: CardType;
	clientId: string;
}

const CardActions: React.FC<CardActionsProps> = ({ item, clientId }) => {
	const [showModal, setShowModal] = useState(false);
	const { id, cardType, currency, balance, cardName, cardColor } = item;
	return (
		<>
			<VolvoIconButton
				color='success'
				onClick={() => setShowModal(true)}
				title='Ver Tarjetas'
			>
				<ViewCarouselIcon />
			</VolvoIconButton>
			{showModal && (
				<CardListModal
					show={showModal}
					id={id}
					currency={currency}
					balance={balance}
					cardName={cardName}
					cardColor={cardColor}
					cardType={cardType}
					clientId={clientId}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default CardActions;
