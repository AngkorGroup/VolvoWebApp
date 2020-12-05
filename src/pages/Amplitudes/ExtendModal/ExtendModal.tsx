import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { DatePicker, VolvoButton } from 'common/components';
import React, { useState } from 'react';
import { DEFAULT_MOMENT_FORMAT, DEFAULT_NOW_DATE } from 'common/constants';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface ExtendModalProps {
	show: boolean;
	title: string;
	id: string;
	onClose: () => void;
	onConfirm: (id: string, date: string) => void;
}

type Date = MaterialUiPickersDate;

const ExtendModal: React.FC<ExtendModalProps> = ({
	show,
	title,
	id,
	onClose,
	onConfirm,
}: ExtendModalProps) => {
	const [date, setDate] = useState<Date>(DEFAULT_NOW_DATE);
	const onDateChange = (date: Date) => setDate(date);
	const handleConfirm = () => {
		onConfirm(id, date?.format(DEFAULT_MOMENT_FORMAT) || '');
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DatePicker label='Nueva Fecha' value={date} onChange={onDateChange} />
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
				<VolvoButton
					disabled={!date}
					onClick={handleConfirm}
					color='success'
					text='Ampliar'
				/>
			</DialogActions>
		</Dialog>
	);
};

export default ExtendModal;
