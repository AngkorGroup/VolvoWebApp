import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableCellProps,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';

interface Column {
	title: string;
	props?: TableCellProps;
}

interface BasicTableProps {
	tableClassname?: string;
	size?: 'small' | 'medium' | undefined;
	columns: Column[];
	children: JSX.Element;
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const BasicTable: React.FC<BasicTableProps> = ({
	tableClassname = '',
	columns,
	size,
	children,
}: BasicTableProps) => {
	const classes = useStyles();

	return (
		<TableContainer className={tableClassname} component={Paper}>
			<Table className={classes.table} size={size} aria-label='material table'>
				<TableHead>
					<TableRow>
						{columns.map((col: Column, i: number) => (
							<TableCell key={i} {...(col.props || {})}>
								{col.title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{children}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BasicTable;
