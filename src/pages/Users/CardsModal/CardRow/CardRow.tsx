import { TableCell, TableRow } from '@material-ui/core';
import { Amount } from 'common/components';
import React from 'react';
import { UserCard } from '../../interfaces';

interface CardRowProps {
	item: UserCard;
}

const CardRow = ({ item }: CardRowProps) => {
	const { number, createdAt, type, currency, balance } = item;
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{createdAt}</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>
				<Amount value={balance} />
			</TableCell>
		</TableRow>
	);
};

export default CardRow;
