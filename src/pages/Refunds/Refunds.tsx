import {
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
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
	VolvoButton,
} from 'common/components';
import {
	DEFAULT_NOW_DATE,
	DEFAULT_WEEK_START_DATE,
	REFUND_SCHEDULED,
	REFUND_PAID,
	REFUND_GENERATED,
	REFUND_STATUSES,
	TABLE_ROWS_PER_PAGE,
	DEFAULT_MOMENT_FORMAT,
} from 'common/constants';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import {
	annulateRefund,
	generateLiquidations,
	getQueryRefunds,
	payRefund,
	scheduleRefunds,
} from 'common/services';
import {
	isGenerated,
	isScheduled,
	mapRefunds,
	RefundColumn,
} from './interfaces';
import { buildAlertBody as at, filterRows, getFilename } from 'common/utils';
import { REFUNDS_COLUMNS } from './columns';
import RefundRow from './RefundRow/RefundRow';
import { useAlert } from 'react-alert';
import ScheduleModal from './ScheduleModal/ScheduleModal';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const useStyles = makeStyles({
	actionButton: {
		marginLeft: '10px',
	},
});

const Refunds: React.FC = () => {
	const classes = useStyles();
	const alert = useAlert();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
		DEFAULT_WEEK_START_DATE,
	);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(
		DEFAULT_NOW_DATE,
	);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [refundStatus, setRefundStatus] = useState(REFUND_GENERATED);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<RefundColumn[]>([]);
	const { data, status, refetch } = useQuery(
		[
			'getQueryRefunds',
			startDate?.format(DEFAULT_MOMENT_FORMAT),
			endDate?.format(DEFAULT_MOMENT_FORMAT),
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
	const onStatusChange = (e: Event) =>
		setRefundStatus(e.target.value as string);
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

	const onAnnulate = async (id: string) => {
		const response = await annulateRefund(id);
		if (response.ok) {
			setFiltered((old) => old.filter((r) => r.id !== id));
			alert.success(
				at('Reembolso Anulado', 'Se anuló un reembolso correctamente'),
			);
			refetch();
		}
	};

	const onPay = async (id: string, date: string, voucher: string) => {
		const response = await payRefund(id, date, voucher);
		if (response.ok) {
			setRefundStatus(REFUND_PAID);
			alert.success(
				at('Liquidación Pagada', 'Se registró el pago correctamente'),
			);
		}
	};

	const onSchedule = async (bankId: string, bankAccountId: string) => {
		const { data, ok, headers } = await scheduleRefunds(
			bankId,
			bankAccountId,
			selectedIds.map((id) => +id),
		);
		if (ok) {
			setRefundStatus(REFUND_SCHEDULED);
			setSelectedIds([]);
			alert.success(
				at(
					'Liquidaciones Programadas',
					'Se programaron las liquidaciones correctamente, en breve se descargará el archivo de texto para el banco',
				),
			);
			if (headers) {
				const filename = getFilename(
					bankId,
					'txt',
					headers['content-disposition'],
				);
				const url = window.URL.createObjectURL(new Blob([data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	};

	const openScheduleModal = () => setShowScheduleModal(true);
	const closeScheduleModal = () => setShowScheduleModal(false);

	const onGenerate = async () => {
		await generateLiquidations();
		alert.success(
			at(
				'Generación Exitosa',
				'Se han generado las liquidaciones de manera exitosa',
			),
		);
		refetch();
	};

	const onSelectId = (id: string) => {
		setSelectedIds((ids) => [...ids, id]);
	};
	const onRemoveId = (id: string) => {
		setSelectedIds((ids) => ids.filter((selected) => selected !== id));
	};

	const rows = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, filtered],
	);

	const columns =
		isGenerated(refundStatus) || isScheduled(refundStatus)
			? [{ title: '' }, ...REFUNDS_COLUMNS]
			: REFUNDS_COLUMNS;

	return (
		<div>
			<div>
				<PageTitle title='Generación y Pago de Reembolsos' />
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
							{isGenerated(refundStatus) && (
								<VolvoButton
									className={classes.actionButton}
									onClick={onGenerate}
									color='success'
									text='Generar Liquidaciones'
								/>
							)}
						</PageActionBar>
						<PaginatedTable
							columns={columns}
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
										onAnnulate={onAnnulate}
										onPay={onPay}
										onSelectId={onSelectId}
										onRemoveId={onRemoveId}
									/>
								))}
							</React.Fragment>
						</PaginatedTable>
						<PageActionBar justifyContent='flex-end'>
							{(isGenerated(refundStatus) || isScheduled(refundStatus)) && (
								<VolvoButton
									className={classes.actionButton}
									disabled={selectedIds.length === 0}
									onClick={openScheduleModal}
									color='success'
									text={`${
										isScheduled(refundStatus) ? 'Reprogramar' : 'Programar'
									} pago`}
								/>
							)}
						</PageActionBar>
						{showScheduleModal && (
							<ScheduleModal
								show={showScheduleModal}
								onClose={closeScheduleModal}
								onSchedule={onSchedule}
							/>
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default Refunds;
