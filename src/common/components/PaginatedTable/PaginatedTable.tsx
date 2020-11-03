import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableCellProps,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core';
import { TABLE_ROWS_OPTIONS } from 'common/constants/tableColumn';
import React from 'react';
import TablePaginationActions from './TablePaginationActions/TablePaginationActions';

interface Column {
	title: string;
	props?: TableCellProps;
}

interface PaginatedTableProps {
	tableClassname?: string;
	size?: 'small' | 'medium' | undefined;
	page: number;
	rowsPerPage: number;
	count: number;
	columns: Column[];
	children: JSX.Element;
	onChangePage: any;
	onChangeRowsPerPage: any;
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const PaginatedTable: React.FC<PaginatedTableProps> = ({
	tableClassname = '',
	columns,
	size,
	page,
	rowsPerPage,
	count,
	children,
	onChangePage,
	onChangeRowsPerPage,
}: PaginatedTableProps) => {
	const classes = useStyles();

	return (
		<TableContainer className={tableClassname} component={Paper}>
			<Table className={classes.table} size={size} aria-label='tabla paginada'>
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
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={TABLE_ROWS_OPTIONS}
							count={count}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'filas por página' },
								native: true,
							}}
							labelRowsPerPage='Filas por página'
							onChangePage={onChangePage}
							onChangeRowsPerPage={onChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default PaginatedTable;
