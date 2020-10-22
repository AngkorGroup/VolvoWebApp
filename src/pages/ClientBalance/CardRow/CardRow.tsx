import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import CardListModal from '../CardListModal/CardListModal';
import { CardType } from '../interfaces';

interface CardRowProps {
	item: CardType;
}

const CardRow = ({ item }: CardRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { id, cardType, currency, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	return (
		<TableRow>
			<TableCell>{cardType}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>{balance}</TableCell>
			<TableCell align='center'>
				<VolvoIconButton
					color='success'
					onClick={onOpenModal}
					title='Ver Tarjetas'
				>
					<ViewCarouselIcon />
				</VolvoIconButton>
			</TableCell>
			<CardListModal
				show={showModal}
				id={id}
				currency={currency}
				balance={balance}
				cardType={cardType}
				onClose={onCloseModal}
			/>
		</TableRow>
	);
};

export default CardRow;
