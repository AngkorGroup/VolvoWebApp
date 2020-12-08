import React, { useMemo, useState } from 'react';
import {
	AsyncTypeAhead,
	DatePicker,
	GenericTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
} from 'common/components';
import { mapLoads } from './interfaces';
import {
	extendExpiredDate,
	getQueryClients,
	getQueryLoadsExtend,
} from 'common/services';
import { buildAlertBody as at, Option, parseSimpleClients } from 'common/utils';
import {
	DEFAULT_WEEK_START_DATE as START_DATE,
	DEFAULT_MOMENT_FORMAT as FORMAT,
	ACTIONS_COLUMN_V2,
} from 'common/constants';
import { useQuery } from 'react-query';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Grid, makeStyles } from '@material-ui/core';
import { LOAD_COLUMNS } from './columns';
import AmplitudeActions from './AmplitudeActions/AmplitudeActions';
import { useAlert } from 'react-alert';

const useStyles = makeStyles({
	dateRange: {
		display: 'flex',
		'& > div': {
			marginRight: 5,
		},
	},
});

type Event = React.ChangeEvent<HTMLInputElement>;

const Amplitudes: React.FC = () => {
	const alert = useAlert();
	const classes = useStyles();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(null);
	const [client, setClient] = useState('all');
	const { data: dataLoads, status: statusLoads, refetch } = useQuery(
		[
			'getQueryLoadsExtend',
			startDate?.format(FORMAT),
			endDate?.format(FORMAT),
			client,
		],
		getQueryLoadsExtend,
	);
	const loads = useMemo(() => {
		if (dataLoads?.ok) {
			return mapLoads(dataLoads?.data || []);
		}
		return [];
	}, [dataLoads]);
	const [query, setQuery] = useState('');
	const { data: dataClients, isLoading } = useQuery(
		['getQueryClients', query, true],
		getQueryClients,
	);
	const clients = useMemo(() => {
		if (dataClients?.ok) {
			return parseSimpleClients(dataClients?.data || [], true);
		}
		return [];
	}, [dataClients]);

	const onTypeClient = (e: Event) => setQuery(e.target.value);
	const onClientChange = (_: any, newValue: string | Option) => {
		setClient((newValue as Option).value);
	};

	const onExtend = async (id: string, date: string) => {
		const response = await extendExpiredDate(id, date);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Vencimiento Ampliado',
					'Se hizo la ampliación del vencimiento correctamente.',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...LOAD_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<AmplitudeActions item={cell?.row?.original} onExtend={onExtend} />
				),
			},
		],
		// eslint-disable-next-line
		[],
	);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);

	return (
		<div>
			<div>
				<PageTitle title='Amplitud de Vencimientos' />
				<PageActionBar>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<AsyncTypeAhead
								options={clients}
								placeholder='Cliente'
								loading={isLoading}
								onChange={onClientChange}
								onType={onTypeClient}
							/>
						</Grid>
						<Grid className={classes.dateRange} item xs={3}>
							<DatePicker
								label='Fecha Venc. Ext. Inicio'
								value={startDate}
								onChange={onStartDateChange}
							/>
							<DatePicker
								minDate={startDate}
								label='Fecha Venc. Ext. Fin'
								value={endDate}
								onChange={onEndDateChange}
							/>
						</Grid>
					</Grid>
				</PageActionBar>
			</div>
			{statusLoads === 'loading' && <PageLoader />}
			{statusLoads === 'success' && (
				<PageBody>
					<GenericTable filename='Recargas' columns={columns} data={loads} />
				</PageBody>
			)}
		</div>
	);
};

export default Amplitudes;
