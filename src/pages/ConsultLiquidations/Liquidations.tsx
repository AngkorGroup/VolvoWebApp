import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
	DatePicker,
	PageActionBar,
	PageLoader,
	PageTitle,
	PaginatedTable,
	TableFilter,
} from 'common/components';
import {
	DEFAULT_NOW_DATE,
	DEFAULT_WEEK_START_DATE,
	LIQUIDATION_STATUSES,
	TABLE_ROWS_PER_PAGE,
	DEFAULT_MOMENT_FORMAT,
} from 'common/constants';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getQueryLiquidations } from 'common/services';
import { mapLiquidations, LiquidationColumn } from './interfaces';
import { filterRows, LiquidationStatus } from 'common/utils';
import { LIQUIDATIONS_COLUMNS } from './columns';
import LiquidationRow from './LiquidationRow/LiquidationRow';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const Liquidations: React.FC = () => {
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
		DEFAULT_WEEK_START_DATE,
	);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(
		DEFAULT_NOW_DATE,
	);
	const [liquidationStatus, setLiquidationStatus] = useState<string>(
		LiquidationStatus.Generado,
	);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<LiquidationColumn[]>([]);
	const { data, status } = useQuery(
		[
			'getQueryLiquidations',
			startDate?.format(DEFAULT_MOMENT_FORMAT),
			endDate?.format(DEFAULT_MOMENT_FORMAT),
			liquidationStatus,
		],
		getQueryLiquidations,
	);
	const liquidations = useMemo(() => {
		if (data?.ok) {
			const rows = mapLiquidations(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onStatusChange = (e: Event) =>
		setLiquidationStatus(e.target.value as string);
	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filteredRows = filterRows(newQuery, liquidations);
		setQuery(newQuery);
		setFiltered(filteredRows);
	};

	const handleChangePage = (_: any, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const rows = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, filtered],
	);

	return (
		<div>
			<div>
				<PageTitle title='Liquidaciones' />
				<PageActionBar>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<DatePicker
								label='Fecha Inicio'
								value={startDate}
								onChange={onStartDateChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<DatePicker
								minDate={startDate}
								label='Fecha Fin'
								value={endDate}
								onChange={onEndDateChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<FormControl variant='outlined' fullWidth size='small'>
								<InputLabel id='statusLabel'>Estado</InputLabel>
								<Select
									labelId='statusLabel'
									label='Estado'
									value={liquidationStatus}
									onChange={onStatusChange}
								>
									{LIQUIDATION_STATUSES.map((d) => (
										<MenuItem key={d.value} value={d.value}>
											{d.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</PageActionBar>
			</div>
			<div>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<React.Fragment>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
						</PageActionBar>
						<PaginatedTable
							columns={LIQUIDATIONS_COLUMNS}
							count={liquidations.length}
							page={page}
							rowsPerPage={rowsPerPage}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						>
							<React.Fragment>
								{rows.map((item, i: number) => (
									<LiquidationRow key={i} item={item} />
								))}
							</React.Fragment>
						</PaginatedTable>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default Liquidations;
