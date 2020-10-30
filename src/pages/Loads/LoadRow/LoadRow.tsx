import { TableCell, TableRow } from '@material-ui/core';
import Amount from 'common/components/Amount/Amount';
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
			<TableCell>
				<Amount value={amount} />
			</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell>{reason}</TableCell>
			<TableCell>{card}</TableCell>
			<TableCell>{tpNumber}</TableCell>
		</TableRow>
	);
};

export default LoadRow;
