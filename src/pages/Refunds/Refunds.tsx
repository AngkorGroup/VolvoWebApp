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
	DEFAULT_NOW_DATE as END_DATE,
	DEFAULT_WEEK_START_DATE as START_DATE,
	REFUND_STATUSES,
	DEFAULT_MOMENT_FORMAT as FORMAT,
	TABLE_ROWS_PER_PAGE,
} from 'common/constants';
import { cancelRefund, getQueryRefunds, payRefund } from 'common/services';
import { filterRows, buildAlertBody as at, RefundStatus } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { REFUNDS_COLUMNS } from './columns';
import { mapRefunds, RefundColumn } from './interfaces';
import RefundRow from './RefundRow/RefundRow';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const Refunds = () => {
	const alert = useAlert();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(END_DATE);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [query, setQuery] = useState('');
	const [refundStatus, setRefundStatus] = useState<string>(
		RefundStatus.Programado,
	);
	const [filtered, setFiltered] = useState<RefundColumn[]>([]);
	const { data, status, refetch } = useQuery(
		[
			'getQueryRefunds',
			startDate?.format(FORMAT),
			endDate?.format(FORMAT),
			refundStatus,
		],
		getQueryRefunds,
	);
	const refunds = useMemo(() => {
		if (data?.ok) {
			const rows = mapRefunds(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onStatusChange = (e: Event) => setRefundStatus(`${e.target.value}`);
	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filteredRows = filterRows(newQuery, refunds);
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

	const onPay = async (id: string, date: string, voucher: string) => {
		const response = await payRefund(id, date, voucher);
		if (response.ok) {
			setRefundStatus(RefundStatus.Pagado);
			alert.success(
				at('Reembolso Pagado', 'Se registró el pago correctamente'),
			);
		}
	};

	const onCancel = async (id: string) => {
		const response = await cancelRefund(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Reembolso Anulado', 'Se anuló el reembolso correctamente'),
			);
		}
	};

	const rows = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, filtered],
	);
	return (
		<div>
			<div>
				<PageTitle title='Reembolsos' />
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
									value={refundStatus}
									onChange={onStatusChange}
								>
									{REFUND_STATUSES.map((d) => (
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
							columns={REFUNDS_COLUMNS}
							count={refunds.length}
							page={page}
							rowsPerPage={rowsPerPage}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						>
							<React.Fragment>
								{rows.map((item, i: number) => (
									<RefundRow
										key={i}
										item={item}
										status={refundStatus}
										onPay={onPay}
										onCancel={onCancel}
									/>
								))}
							</React.Fragment>
						</PaginatedTable>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default Refunds;
