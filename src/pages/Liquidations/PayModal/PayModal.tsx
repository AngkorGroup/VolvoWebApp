import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker, VolvoButton } from 'common/components';
import React, { useState } from 'react';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT } from 'common/constants';

interface PayModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
	onPay: (id: string, date: string, voucher: string) => void;
}

const PayModal: React.FC<PayModalProps> = ({
	show,
	id,
	onClose,
	onPay,
}: PayModalProps) => {
	const [date, setDate] = useState<MaterialUiPickersDate>(moment());
	const [voucher, setVoucher] = useState('');
	const onDateChange = (date: MaterialUiPickersDate) => setDate(date);
	const onVoucherChange = (e: any) => setVoucher(e.target.value);
	const onConfirm = () => {
		onPay(id, date?.format(DEFAULT_MOMENT_FORMAT) || '', voucher);
		onClose();
	};
	return (
		<Dialog fullWidth maxWidth='sm' open={show} onClose={onClose}>
			<DialogTitle id='alert-dialog-title'>Pagar Liquidación</DialogTitle>
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<DatePicker
							label='Fecha de pago'
							value={date}
							onChange={onDateChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label='Nro. Voucher'
							value={voucher}
							onChange={onVoucherChange}
							size='small'
							variant='outlined'
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
				<VolvoButton
					disabled={!date || !voucher}
					onClick={onConfirm}
					color='success'
					text='Pagar'
				/>
			</DialogActions>
		</Dialog>
	);
};

export default PayModal;
