import { TableCell, TableRow } from '@material-ui/core';
import { Amount } from 'common/components';
import React from 'react';
import { TableLoad } from '../interfaces';

interface LoadRowProps {
	item: TableLoad;
}

const LoadRow = ({ item }: LoadRowProps) => {
	const {
		index,
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
		errorMessage,
		lineContent,
	} = item;

	return (
		<TableRow>
			<TableCell>{index}</TableCell>
			{errorMessage && lineContent ? (
				<React.Fragment>
					<TableCell>{errorMessage}</TableCell>
					<TableCell colSpan={12}>{lineContent}</TableCell>
				</React.Fragment>
			) : (
				<React.Fragment>
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
				</React.Fragment>
			)}
		</TableRow>
	);
};

export default LoadRow;
