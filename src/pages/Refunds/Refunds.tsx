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
	VolvoButton,
} from 'common/components';
import {
	REFUND_GENERATED,
	REFUND_STATUSES,
	TABLE_ROWS_PER_PAGE,
} from 'common/constants';
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
import {
	annulateRefund,
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

const Refunds: React.FC = () => {
	const alert = useAlert();
	const [date, setDate] = useState<MaterialUiPickersDate>(moment());
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [refundStatus, setRefundStatus] = useState(REFUND_GENERATED);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<RefundColumn[]>([]);
	const { data, status } = useQuery(
		['getQueryRefunds', date?.format('DD/MM/yyyy'), refundStatus],
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

	const onDateChange = (date: MaterialUiPickersDate) => setDate(date);
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
		}
	};

	const onPay = async (id: string, date: string, voucher: string) => {
		const response = await payRefund(id, date, voucher);
		if (response.ok) {
			setFiltered((old) => old.filter((r) => r.id !== id));
			alert.success(
				at(
					'Reembolso Pagado',
					'En breve se descargará el archivo del reembolso pagado',
				),
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
			setFiltered((old) =>
				old.filter((r) => selectedIds.some((sId) => sId !== r.id)),
			);
			alert.success(
				at(
					'Reembolsos Programados',
					'Se programaron los reembolsos correctamente',
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
							<DatePicker label='Fecha' value={date} onChange={onDateChange} />
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
						<PageActionBar>
							<TableFilter value={query} onChange={onFilterChange} />
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
						{(isGenerated(refundStatus) || isScheduled(refundStatus)) && (
							<PageActionBar justifyContent='flex-end'>
								<VolvoButton
									disabled={selectedIds.length === 0}
									onClick={openScheduleModal}
									color='success'
									text='Programar'
								/>
							</PageActionBar>
						)}
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
