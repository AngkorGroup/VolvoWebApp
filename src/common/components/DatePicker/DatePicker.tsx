import { KeyboardDatePicker } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React from 'react';
import { DEFAULT_DATE_FORMAT } from '../../constants/constants';

interface DatePickerProps {
	label: string;
	minDate?: ParsableDate;
	value: ParsableDate;
	onChange: (
		date: MaterialUiPickersDate,
		value?: string | null | undefined,
	) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
	label,
	minDate,
	value,
	onChange,
}: DatePickerProps) => {
	return (
		<KeyboardDatePicker
			autoOk
			disableToolbar
			inputVariant='outlined'
			size='small'
			variant='inline'
			format={DEFAULT_DATE_FORMAT}
			label={label}
			minDate={minDate}
			value={value}
			onChange={onChange}
		/>
	);
};

export default DatePicker;
