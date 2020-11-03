import { TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Amount, VolvoIconButton } from 'common/components';
import { Expiration } from '../interface';
import BatchListModal from '../BatchListModal/BatchListModal';

interface ExpirationRowProps {
	actions?: boolean;
	item: Expiration;
}

const ExpirationRow = ({ actions, item }: ExpirationRowProps) => {
	const [showModal, setShowModal] = useState(false);
	const { type, number, batch, currency, expirationDate, balance } = item;
	const onOpenModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);
	return (
		<TableRow>
			<TableCell>{type}</TableCell>
			<TableCell>{number}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={balance} />
			</TableCell>
			<TableCell>{expirationDate}</TableCell>
			{actions && (
				<TableCell align='center'>
					<VolvoIconButton
						color='primary'
						onClick={onOpenModal}
						title='Ver Movimientos'
					>
						<VisibilityIcon />
					</VolvoIconButton>
				</TableCell>
			)}
			<BatchListModal show={showModal} id={batch} onClose={onCloseModal} />
		</TableRow>
	);
};

export default ExpirationRow;
