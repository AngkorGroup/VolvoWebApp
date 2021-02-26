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
import React, { memo, useEffect } from 'react';
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useRowSelect,
} from 'react-table';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import GenericFilter from './GenericFilter/GenericFilter';
import PageActionBar from '../PageActionBar/PageActionBar';
import DownloadExcel from '../DownloadExcel/DownloadExcel';
import { parseExportColumns } from 'common/utils';
import DownloadPdf from '../DownloadPdf/DownloadPdf';

interface GenericTableProps {
	isSelectable?: boolean;
	onUpdateIds?: (ids: any[]) => void;
	containerClass?: string;
	size?: 'small' | 'medium' | undefined;
	columns: any[];
	data: any[];
	customFilters?: React.ReactNode;
	rightButton?: React.ReactNode;
	filename?: string;
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const SELECTION_ID = 'selection';

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
		pdf: {
			marginRight: theme.spacing(2),
		},
	}),
);

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }: any, ref) => {
		const defaultRef = React.useRef() as any;
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input type='checkbox' ref={resolvedRef} {...rest} />
			</>
		);
	},
);

const GenericTable: React.FC<GenericTableProps> = ({
	isSelectable = false,
	onUpdateIds,
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
	const parameters = [useGlobalFilter, usePagination, useRowSelect];
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
		selectedFlatRows = [],
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		...parameters,
		(hooks: any) => {
			hooks.visibleColumns.push((columns: any) => [
				{
					id: SELECTION_ID,
					Header: ({ getToggleAllRowsSelectedProps }: any) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					Cell: ({ row }: any) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		},
	);

	useEffect(() => {
		const savedGlobalFilter = globalFilter;
		setGlobalFilter('');
		setGlobalFilter(savedGlobalFilter);
	}, [data]);

	const onChangePage = (e: any, p: number) => gotoPage(p);
	const onChangeRowsPerPage = (e: ChangeEvent) => setPageSize(e.target.value);
	const labelPageOf = () => `Página ${pageIndex + 1} de ${pageOptions.length}`;

	useEffect(() => {
		if (isSelectable && !!onUpdateIds && selectedFlatRows) {
			onUpdateIds(selectedFlatRows);
		}
		// eslint-disable-next-line
	}, [isSelectable, selectedFlatRows]);

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
				<div className={!!rightButton ? classes.right : ''}>
					{filename && (
						<DownloadPdf
							className={classes.pdf}
							name={filename}
							columns={excelColumns}
							data={data}
						/>
					)}
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
								{hg.headers
									.filter((h: any) => isSelectable || h.id !== SELECTION_ID)
									.map((column: any) => (
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
									{row.cells
										.filter(
											(c: any) =>
												isSelectable || c?.column?.id !== SELECTION_ID,
										)
										.map((cell: any) => {
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
