import { Grid } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from 'common/components';
import React, { useContext, useEffect, useState } from 'react';
import ReportMakerContext from '../ReportMakerContext';

type Date = MaterialUiPickersDate;

const FilterDateRange = () => {
	const { updateState } = useContext(ReportMakerContext);
	const [startDate, setStartDate] = useState<Date>(null);
	const [endDate, setEndDate] = useState<Date>(null);
	const onStartDateChange = (date: Date) => setStartDate(date);
	const onEndDateChange = (date: Date) => setEndDate(date);
	useEffect(() => {
		if (startDate) {
			updateState({ startDate: startDate.format('DD/mm/yyyy') });
		}
		if (endDate) {
			updateState({ endDate: endDate.format('DD/mm/yyyy') });
		}
	}, [startDate, endDate, updateState]);
	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
				<DatePicker
					label='Fecha Inicio'
					value={startDate}
					onChange={onStartDateChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<DatePicker
					label='Fecha Fin'
					minDate={startDate}
					value={endDate}
					onChange={onEndDateChange}
				/>
			</Grid>
		</Grid>
	);
};

export default FilterDateRange;
