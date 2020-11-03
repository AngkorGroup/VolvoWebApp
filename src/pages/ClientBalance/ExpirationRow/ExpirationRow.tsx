import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { Amount, VolvoIconButton } from 'common/components';
import BatchMovementsModal from '../BatchMovementsModal/BatchMovementsModal';
import { Expiration, VolvoCardData } from '../interfaces';

interface ExpirationRowProps {
	item: Expiration;
}

const ExpirationRow = ({ item }: ExpirationRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { cardType, cardNumber, batch, expiration, currency, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	const cardData: VolvoCardData = {
		type: cardType,
		number: cardNumber,
		balance: `${currency} - 4,000.00`,
	};
	const batchText = `Lote: ${batch} - ${currency} ${balance}`;
	return (
		<TableRow>
			<TableCell>{cardType}</TableCell>
			<TableCell>{cardNumber}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell>{expiration}</TableCell>
			<TableCell align='center'>{currency}</TableCell>
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

export default ExpirationRow;
