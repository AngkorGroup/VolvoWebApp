import {
	createStyles,
	IconButton,
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
	Theme,
	useTheme,
} from '@material-ui/core';
import { TABLE_ROWS_OPTIONS } from 'common/constants';
import React, { memo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import GenericFilter from './GenericFilter/GenericFilter';
import PageActionBar from '../PageActionBar/PageActionBar';
import DownloadExcel from '../DownloadExcel/DownloadExcel';
import { parseExportColumns } from 'common/utils';

interface GenericTableProps {
	containerClass?: string;
	size?: 'small' | 'medium' | undefined;
	columns: any[];
	data: any[];
	customFilters?: React.ReactNode;
	rightButton?: React.ReactNode;
	filename: string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			minWidth: 650,
		},
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
		right: {
			'& > span': {
				marginRight: theme.spacing(2),
			},
		},
	}),
);

const GenericTable: React.FC<GenericTableProps> = ({
	containerClass,
	size,
	columns,
	data,
	customFilters,
	rightButton,
	filename,
}: GenericTableProps) => {
	const classes = useStyles();
	const theme = useTheme();
	const excelColumns = parseExportColumns(columns);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useGlobalFilter,
		usePagination,
	);

	const onChangePage = (e: any, p: number) => gotoPage(p);
	const onChangeRowsPerPage = (e: ChangeEvent) => setPageSize(e.target.value);
	const labelPageOf = () => `Página ${pageIndex + 1} de ${pageOptions.length}`;

	const paginationActions = memo(() => (
		<div className={classes.root}>
			<IconButton
				onClick={() => gotoPage(0)}
				disabled={!canPreviousPage}
				aria-label='primera página'
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={() => previousPage()}
				disabled={!canPreviousPage}
				aria-label='página anterior'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={() => nextPage()}
				disabled={!canNextPage}
				aria-label='página siguiente'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={() => gotoPage(pageCount - 1)}
				disabled={!canNextPage}
				aria-label='última página'
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	));

	return (
		<>
			<PageActionBar justifyContent='space-between'>
				<div>
					<GenericFilter
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
					{customFilters}
				</div>
				<div className={classes.right}>
					{filename && (
						<DownloadExcel name={filename} columns={excelColumns} data={data} />
					)}
					{rightButton}
				</div>
			</PageActionBar>
			<TableContainer className={containerClass} component={Paper}>
				<Table className={classes.table} size={size} {...getTableProps()}>
					<TableHead>
						{headerGroups.map((hg: any) => (
							<TableRow {...hg.getHeaderGroupProps()}>
								{hg.headers.map((column: any) => (
									<TableCell
										{...column.getHeaderProps()}
										{...column.headerProps}
									>
										{column.render('Header')}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{page.map((row: any) => {
							prepareRow(row);
							return (
								<TableRow {...row.getRowProps()}>
									{row.cells.map((cell: any) => {
										return (
											<TableCell
												{...cell.getCellProps()}
												{...cell.column.props}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={TABLE_ROWS_OPTIONS}
								count={pageCount}
								rowsPerPage={pageSize}
								page={pageIndex}
								SelectProps={{
									inputProps: { 'aria-label': 'filas por página' },
									native: true,
								}}
								labelDisplayedRows={labelPageOf}
								labelRowsPerPage='Filas por página'
								onChangePage={onChangePage}
								onChangeRowsPerPage={onChangeRowsPerPage}
								ActionsComponent={paginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
};

export default GenericTable;
