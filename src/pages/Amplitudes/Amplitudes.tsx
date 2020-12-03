import React, { useMemo, useState } from 'react';
import {
	DatePicker,
	GenericTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
} from 'common/components';
import { mapLoads } from './interfaces';
import { extendExpiredDate, getQueryLoads } from 'common/services';
import { buildAlertBody as at } from 'common/utils';
import {
	DEFAULT_NOW_DATE as END_DATE,
	DEFAULT_WEEK_START_DATE as START_DATE,
	DEFAULT_MOMENT_FORMAT as FORMAT,
	ACTIONS_COLUMN_V2,
} from 'common/constants';
import { useQuery } from 'react-query';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Grid } from '@material-ui/core';
import { LOAD_COLUMNS } from './columns';
import AmplitudeActions from './AmplitudeActions/AmplitudeActions';
import { useAlert } from 'react-alert';

const Amplitudes: React.FC = () => {
	const alert = useAlert();
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(END_DATE);
	const { data, status, refetch } = useQuery(
		['loads', startDate?.format(FORMAT), endDate?.format(FORMAT)],
		getQueryLoads,
	);
	const loads = useMemo(() => {
		if (data?.ok) {
			return mapLoads(data?.data || []);
		}
		return [];
	}, [data]);

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
					</Grid>
				</PageActionBar>
			</div>
			{status === 'loading' && <PageLoader />}
			{status === 'success' && (
				<PageBody>
					<GenericTable filename='Recargas' columns={columns} data={loads} />
				</PageBody>
			)}
		</div>
	);
};

export default Amplitudes;
