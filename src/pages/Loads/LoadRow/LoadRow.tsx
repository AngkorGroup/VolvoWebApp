import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
	Theme,
} from '@material-ui/core';
import { Amount } from 'common/components';
import React from 'react';
import { TableLoad } from '../interfaces';

interface LoadRowProps {
	item: TableLoad;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		errorColumn: {
			color: palette.error.main,
		},
	}),
);

const LoadRow = ({ item }: LoadRowProps) => {
	const classes = useStyles();
	const {
		index,
		number,
		ruc,
		name,
		date,
		chassis,
		invoice,
		amount,
		dealer,
		contactName,
		contactPhone,
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
			{errorMessage && lineContent ? (
				<React.Fragment>
					<TableCell className={classes.errorColumn}>{index}</TableCell>
					<TableCell className={classes.errorColumn}>{errorMessage}</TableCell>
					<TableCell className={classes.errorColumn} colSpan={14}>
						{lineContent}
					</TableCell>
				</React.Fragment>
			) : (
				<React.Fragment>
					<TableCell>{index}</TableCell>
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
					<TableCell>{dealer}</TableCell>
					<TableCell>{contactName}</TableCell>
					<TableCell>{contactPhone}</TableCell>
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
