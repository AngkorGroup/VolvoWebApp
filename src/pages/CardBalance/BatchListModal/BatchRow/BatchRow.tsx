import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { Batch } from '../../interface';

interface BatchRowProps {
	item: Batch;
}

const BatchRow = ({ item }: BatchRowProps) => {
	const { number, batch, expirationDate, currency, balance } = item;
	return (
		<TableRow>
			<TableCell>{number}</TableCell>
			<TableCell>{batch}</TableCell>
			<TableCell>{expirationDate}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell align='right'>{balance}</TableCell>
		</TableRow>
	);
};

export default BatchRow;
