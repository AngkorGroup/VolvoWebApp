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
import { getQueryLoads } from 'common/services';
import {
	DEFAULT_NOW_DATE as END_DATE,
	DEFAULT_WEEK_START_DATE as START_DATE,
	DEFAULT_MOMENT_FORMAT as FORMAT,
} from 'common/constants';
import { useQuery } from 'react-query';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Grid } from '@material-ui/core';
import { LOAD_COLUMNS } from './columns';

const Loads: React.FC = () => {
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(END_DATE);
	const { data, status } = useQuery(
		['loads', startDate?.format(FORMAT), endDate?.format(FORMAT)],
		getQueryLoads,
	);
	const loads = useMemo(() => {
		if (data?.ok) {
			return mapLoads(data?.data || []);
		}
		return [];
	}, [data]);

	const columns = useMemo(() => LOAD_COLUMNS, []);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);

	return (
		<div>
			<div>
				<PageTitle title='Consulta de Cargas y Recargas' />
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
					<GenericTable
						filename='Consulta_Cargas_Recargas'
						columns={columns}
						data={loads}
					/>
				</PageBody>
			)}
		</div>
	);
};

export default Loads;
