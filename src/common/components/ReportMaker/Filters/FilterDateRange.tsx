import { makeStyles } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from 'common/components';
import React, { useContext, useEffect, useState } from 'react';
import ReportMakerContext from '../ReportMakerContext';

type Date = MaterialUiPickersDate;

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

const FilterDateRange = () => {
	const classes = useStyles();
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
		<div className={classes.container}>
			<DatePicker
				label='Fecha Inicio'
				value={startDate}
				onChange={onStartDateChange}
			/>
			<DatePicker
				label='Fecha Fin'
				minDate={startDate}
				value={endDate}
				onChange={onEndDateChange}
			/>
		</div>
	);
};

export default FilterDateRange;
