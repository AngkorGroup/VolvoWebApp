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
	GenericTable,
	PageActionBar,
	PageLoader,
	PageTitle,
} from 'common/components';
import {
	DEFAULT_NOW_DATE as END_DATE,
	DEFAULT_WEEK_START_DATE as START_DATE,
	REFUND_STATUSES,
	DEFAULT_MOMENT_FORMAT as FORMAT,
	ACTIONS_COLUMN_V2,
} from 'common/constants';
import { cancelRefund, getQueryRefunds, payRefund } from 'common/services';
import { buildAlertBody as at, RefundStatus } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { REFUNDS_COLUMNS } from './columns';
import { mapRefunds } from './interfaces';
import RefundActions from './RefundActions/RefundActions';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const Refunds = () => {
	const alert = useAlert();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(END_DATE);
	const [refundStatus, setRefundStatus] = useState<string>(
		RefundStatus.Programado,
	);
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
			return mapRefunds(data?.data || []);
		}
		return [];
	}, [data]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onStatusChange = (e: Event) => setRefundStatus(`${e.target.value}`);

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

	const columns = useMemo(
		() => [
			...REFUNDS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<RefundActions
						item={cell?.row?.original}
						status={refundStatus}
						onPay={onPay}
						onCancel={onCancel}
					/>
				),
			},
		],
		// eslint-disable-next-line
		[],
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
					<GenericTable columns={columns} data={refunds} />
				)}
			</div>
		</div>
	);
};

export default Refunds;
