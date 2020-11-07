import { TableCell, TableRow } from '@material-ui/core';
import { Amount } from 'common/components';
import React from 'react';
import { CardData as Card } from '../interfaces';

interface CardDataRowProps {
	item: Card;
}

const CardDataRow = ({ item }: CardDataRowProps) => {
	const {
		type,
		number,
		tpNumber,
		createdAt,
		currency,
		amount,
		contactName,
		contactType,
		contactPhone,
		status,
	} = item;
	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{type}</TableCell>
				<TableCell>{number}</TableCell>
				<TableCell>{tpNumber}</TableCell>
				<TableCell>{createdAt}</TableCell>
				<TableCell>{currency}</TableCell>
				<TableCell align='right'>
					<Amount value={amount} />
				</TableCell>
				<TableCell>{contactName}</TableCell>
				<TableCell>{contactType}</TableCell>
				<TableCell>{contactPhone}</TableCell>
				<TableCell>{status}</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default CardDataRow;
