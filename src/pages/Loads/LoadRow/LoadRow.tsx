import { TableCell, TableRow } from '@material-ui/core';
import { Amount } from 'common/components';
import React from 'react';
import { TableLoad } from '../interfaces';

interface LoadRowProps {
	item: TableLoad;
}

const LoadRow = ({ item }: LoadRowProps) => {
	const {
		number,
		ruc,
		name,
		date,
		chassis,
		invoice,
		amount,
		balance,
		currency,
		type,
		reason,
		card,
		tpNumber,
	} = item;
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{ruc}</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{chassis}</TableCell>
			<TableCell>{invoice}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell>
				<Amount value={amount} />
			</TableCell>
			<TableCell>
				<Amount value={balance} />
			</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell>{reason}</TableCell>
			<TableCell>{card}</TableCell>
			<TableCell>{tpNumber}</TableCell>
		</TableRow>
	);
};

export default LoadRow;
