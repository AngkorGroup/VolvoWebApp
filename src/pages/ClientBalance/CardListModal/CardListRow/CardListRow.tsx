import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { ClientCardRow, VolvoCardData } from '../../interfaces';
import VolvoIconButton from '../../../../common/components/VolvoIconButton/VolvoIconButton';
import CardBatchesModal from '../../CardBatchesModal/CardBatchesModal';

interface CardListRowProps {
	item: ClientCardRow;
	cardData: VolvoCardData;
}

const CardListRow = ({ item, cardData }: CardListRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { number, contact, currency, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const newCardData: VolvoCardData = {
		...cardData,
		balance: `${currency} ${balance}`,
		number,
	};
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{contact}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>{balance}</TableCell>
			<TableCell align='center'>
				<VolvoIconButton
					color='success'
					title='Ver Lotes'
					onClick={onOpenModal}
				>
					<DashboardIcon />
				</VolvoIconButton>
			</TableCell>
			<CardBatchesModal
				show={showModal}
				id={number}
				cardData={newCardData}
				onClose={onCloseModal}
			/>
		</TableRow>
	);
};

export default CardListRow;
