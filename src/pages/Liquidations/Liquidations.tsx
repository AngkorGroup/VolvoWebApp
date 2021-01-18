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
	GenericTable,
	PageActionBar,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import {
	DEFAULT_NOW_DATE,
	DEFAULT_WEEK_START_DATE,
	LIQUIDATION_STATUSES,
	DEFAULT_MOMENT_FORMAT,
	ACTIONS_COLUMN_V2,
} from 'common/constants';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import {
	annulateLiquidation,
	generateLiquidations,
	getQueryLiquidations,
	payLiquidation,
	REPORT_ENDPOINTS,
	scheduleLiquidations,
} from 'common/services';
import { isGenerated, mapLiquidations } from './interfaces';
import {
	buildAlertBody as at,
	getFilename,
	LiquidationStatus,
} from 'common/utils';
import { LIQUIDATIONS_COLUMNS } from './columns';
import { useAlert } from 'react-alert';
import ScheduleModal from './ScheduleModal/ScheduleModal';
import LiquidationActions from './LiquidationActions/LiquidationActions';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const useStyles = makeStyles({
	actionButton: {
		marginLeft: '10px',
	},
});

const Liquidations: React.FC = () => {
	const classes = useStyles();
	const alert = useAlert();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
		DEFAULT_WEEK_START_DATE,
	);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(
		DEFAULT_NOW_DATE,
	);
	const [selectedIds, setSelectedIds] = useState<any[]>([]);
	const [liquidationStatus, setLiquidationStatus] = useState<string>(
		LiquidationStatus.Generado,
	);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const { data, status, refetch } = useQuery(
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
			return mapLiquidations(data?.data || []);
		}
		return [];
	}, [data]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onStatusChange = (e: Event) =>
		setLiquidationStatus(e.target.value as string);

	const onAnnulate = async (id: string) => {
		const response = await annulateLiquidation(id);
		if (response.ok) {
			alert.success(
				at('Reembolso Anulado', 'Se anuló un reembolso correctamente'),
			);
			refetch();
		}
	};

	const onPay = async (id: string, date: string, voucher: string) => {
		const response = await payLiquidation(id, date, voucher);
		if (response.ok) {
			setLiquidationStatus(LiquidationStatus.Pagado);
			alert.success(
				at('Liquidación Pagada', 'Se registró el pago correctamente'),
			);
		}
	};

	const onSchedule = async (bankId: string, bankAccountId: string) => {
		const { data, ok, headers } = await scheduleLiquidations(
			bankId,
			bankAccountId,
			selectedIds.map((id) => +id),
		);
		if (ok) {
			setLiquidationStatus(LiquidationStatus.Programado);
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

	const onGenerateReport = async () => {
		const endpoint = REPORT_ENDPOINTS.chasis_detail;
		const { data, headers } = await endpoint({
			ids: selectedIds.map((id) => +id),
		});
		const filename = getFilename(
			'chasis_detail',
			'pdf',
			headers['content-disposition'],
		);
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const onChangeIds = (rows: any[]) =>
		setSelectedIds(rows.map((r: any) => r.original.id));

	const columns = useMemo(
		() => [
			...LIQUIDATIONS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<LiquidationActions
						item={cell?.row?.original}
						status={liquidationStatus}
						onAnnulate={onAnnulate}
						onPay={onPay}
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
						<GenericTable
							isSelectable={isGenerated(liquidationStatus)}
							onUpdateIds={onChangeIds}
							filename='Liquidaciones'
							columns={columns}
							data={liquidations}
							rightButton={
								isGenerated(liquidationStatus) && (
									<VolvoButton
										className={classes.actionButton}
										onClick={onGenerate}
										color='success'
										text='Generar Liquidaciones'
									/>
								)
							}
						/>
						<PageActionBar justifyContent='flex-end'>
							{isGenerated(liquidationStatus) && (
								<VolvoButton
									className={classes.actionButton}
									disabled={selectedIds.length === 0}
									onClick={onGenerateReport}
									color='primary'
									text='Reporte Detallado por Chasis'
								/>
							)}
							{isGenerated(liquidationStatus) && (
								<VolvoButton
									className={classes.actionButton}
									disabled={selectedIds.length === 0}
									onClick={openScheduleModal}
									color='success'
									text='Programar Pago'
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

export default Liquidations;
