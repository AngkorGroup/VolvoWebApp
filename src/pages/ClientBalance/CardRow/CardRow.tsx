import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { Amount, VolvoIconButton } from 'common/components';
import CardListModal from '../CardListModal/CardListModal';
import { CardType } from '../interfaces';

interface CardRowProps {
	item: CardType;
	clientId: string;
}

const CardRow = ({ item, clientId }: CardRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { id, cardType, currency, balance, cardName, cardColor } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	return (
		<TableRow>
			<TableCell>{cardType}</TableCell>
			<TableCell align='center'>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={balance} />
			</TableCell>
			<TableCell align='center'>
				<VolvoIconButton
					color='success'
					onClick={onOpenModal}
					title='Ver Tarjetas'
				>
					<ViewCarouselIcon />
				</VolvoIconButton>
			</TableCell>
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
					onClose={onCloseModal}
				/>
			)}
		</TableRow>
	);
};

export default CardRow;
