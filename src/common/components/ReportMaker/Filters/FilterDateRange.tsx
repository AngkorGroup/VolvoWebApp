import { makeStyles } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from 'common/components';
import React, { useContext, useEffect, useState } from 'react';
import ReportMakerContext from '../ReportMakerContext';
import moment from 'moment';

type Date = MaterialUiPickersDate;

const MAX_MONTH_DATE_RAGE = 12.0;
const MAX_MONTH__ERROR = 'El rango máximo de fechas es de 12 meses';

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
	const [error, setError] = useState('');
	const onStartDateChange = (date: Date) => setStartDate(date);
	const onEndDateChange = (date: Date) => setEndDate(date);
	useEffect(() => {
		if (startDate) {
			updateState({ startDate: startDate.format('DD/MM/yyyy') });
		}
		if (endDate) {
			updateState({ endDate: endDate.format('DD/MM/yyyy') });
		}
		const months = moment(startDate).diff(endDate, 'months', true);
		if (Math.abs(months) > MAX_MONTH_DATE_RAGE) {
			setError(MAX_MONTH__ERROR);
		} else {
			setError('');
		}
	}, [startDate, endDate, updateState]);
	return (
		<div className={classes.container}>
			<DatePicker
				label='Fecha Inicio'
				value={startDate}
				onChange={onStartDateChange}
				error={!!error}
				errorMessage={error}
			/>
			<DatePicker
				label='Fecha Fin'
				minDate={startDate}
				value={endDate}
				onChange={onEndDateChange}
				error={!!error}
			/>
		</div>
	);
};

export default FilterDateRange;
