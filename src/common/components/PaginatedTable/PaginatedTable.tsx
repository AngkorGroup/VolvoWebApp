import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core';
import {
	ACTIONS_LABEL,
	TableColumn,
	TABLE_ROWS_OPTIONS,
} from 'common/constants';
import React from 'react';
import DownloadExcel from '../DownloadExcel/DownloadExcel';
import TablePaginationActions from './TablePaginationActions/TablePaginationActions';

interface PaginatedTableProps {
	tableClassname?: string;
	size?: 'small' | 'medium' | undefined;
	page: number;
	rowsPerPage: number;
	count: number;
	columns: TableColumn[];
	children: JSX.Element;
	onChangePage: any;
	onChangeRowsPerPage: any;
	name?: string;
	data?: any[];
	exportExcel?: boolean;
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	exportButtons: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: '5px',
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
	name,
	data,
	exportExcel,
}: PaginatedTableProps) => {
	const classes = useStyles();
	const excelColumns = columns.filter((col) => col.title !== ACTIONS_LABEL);

	return (
		<React.Fragment>
			{exportExcel && !!data && !!name && (
				<div className={classes.exportButtons}>
					<DownloadExcel name={name} columns={excelColumns} data={data} />
				</div>
			)}
			<TableContainer className={tableClassname} component={Paper}>
				<Table
					className={classes.table}
					size={size}
					aria-label='tabla paginada'
				>
					<TableHead>
						<TableRow>
							{columns.map((col: TableColumn, i: number) => (
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
		</React.Fragment>
	);
};

export default PaginatedTable;
