import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { Amount, VolvoIconButton } from 'common/components';
import { CardBatchRow, VolvoCardData } from '../../interfaces';
import BatchMovementsModal from '../../BatchMovementsModal/BatchMovementsModal';

interface CardBatchesRowProps {
	item: CardBatchRow;
	cardData: VolvoCardData;
}

const CardBatchesRow = ({ item, cardData }: CardBatchesRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { number, batch, expiration, currency, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const batchText = `Lote: ${batch} - ${currency} ${balance}`;
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell>{expiration}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={balance} />
			</TableCell>
			<TableCell align='center'>
				<VolvoIconButton
					color='success'
					title='Ver Movimientos'
					onClick={onOpenModal}
				>
					<FormatListNumberedIcon />
				</VolvoIconButton>
			</TableCell>
			<BatchMovementsModal
				show={showModal}
				id={batch}
				cardData={cardData}
				onClose={onCloseModal}
				batchText={batchText}
			/>
		</TableRow>
	);
};

export default CardBatchesRow;
