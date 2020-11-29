import React, { useEffect, useMemo, useState } from 'react';
import {
	BasicTable,
	DatePicker,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
} from 'common/components';
import { filterRows } from 'common/utils';
import { mapLoads, TableLoad } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import { LOAD_COLUMNS } from './columns';
import { getQueryLoads } from 'common/services';
import {
	DEFAULT_NOW_DATE as END_DATE,
	DEFAULT_WEEK_START_DATE as START_DATE,
	DEFAULT_MOMENT_FORMAT as FORMAT,
} from 'common/constants';
import { useQuery } from 'react-query';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Grid } from '@material-ui/core';

const Loads: React.FC = () => {
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(START_DATE);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(END_DATE);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<TableLoad[]>([]);
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

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, loads);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	useEffect(() => {
		if (loads.length > 0) {
			setFiltered(loads);
		}
	}, [loads]);

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
					<PageActionBar justifyContent='space-between'>
						{loads.length > 0 && (
							<TableFilter value={query} onChange={onFilterChange} />
						)}
					</PageActionBar>
					<div>
						<BasicTable columns={LOAD_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<LoadRow key={i} item={item} isMain />
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				</PageBody>
			)}
		</div>
	);
};

export default Loads;
