import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Amount, VolvoIconButton } from 'common/components';
import { ClientCardRow, VolvoCardData } from '../../interfaces';
import CardBatchesModal from '../../CardBatchesModal/CardBatchesModal';

interface CardListRowProps {
	item: ClientCardRow;
	cardData: VolvoCardData;
}

const CardListRow = ({ item, cardData }: CardListRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { cardId, number, contact, currency, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const newCardData: VolvoCardData = {
		...cardData,
		balance,
		number,
	};
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{contact}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={balance} />
			</TableCell>
			<TableCell align='center'>
				<VolvoIconButton
					color='success'
					title='Ver Lotes'
					onClick={onOpenModal}
				>
					<DashboardIcon />
				</VolvoIconButton>
			</TableCell>
			{showModal && (
				<CardBatchesModal
					show={showModal}
					id={cardId}
					cardData={newCardData}
					onClose={onCloseModal}
				/>
			)}
		</TableRow>
	);
};

export default CardListRow;
