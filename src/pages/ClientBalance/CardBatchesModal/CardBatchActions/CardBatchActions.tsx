import { VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { CardBatchRow, VolvoCardData } from 'pages/ClientBalance/interfaces';
import BatchMovementsModal from 'pages/ClientBalance/BatchMovementsModal/BatchMovementsModal';
import { formatNumber } from 'common/utils';

interface CardBatchActionsProps {
	item: CardBatchRow;
	cardData: VolvoCardData;
}

const CardBatchActions: React.FC<CardBatchActionsProps> = ({
	item,
	cardData,
}) => {
	const [showModal, setShowModal] = useState(false);
	const { batch, currency, balance } = item;
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

export default CardBatchActions;
