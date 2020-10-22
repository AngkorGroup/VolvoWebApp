import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { CardData as Card } from '../interfaces';

interface CardDataRowProps {
	item: Card;
}

const CardDataRow = ({ item }: CardDataRowProps) => {
	const { type, number, tpNumber, createdAt, currency, contact, status } = item;
	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{type}</TableCell>
				<TableCell>{number}</TableCell>
				<TableCell>{tpNumber}</TableCell>
				<TableCell>{createdAt}</TableCell>
				<TableCell>{currency}</TableCell>
				<TableCell>{contact.name}</TableCell>
				<TableCell>{contact.type}</TableCell>
				<TableCell>{status}</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default CardDataRow;
