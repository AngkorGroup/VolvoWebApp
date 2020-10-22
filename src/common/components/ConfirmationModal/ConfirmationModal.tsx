import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';

interface ConfirmationModalProps {
	show: boolean;
	id: string;
	title: string;
	body: string;
	onClose: () => void;
	onConfirm: (id: string) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	show,
	id,
	title,
	body,
	onClose,
	onConfirm,
}: ConfirmationModalProps) => {
	const handleConfirm = () => {
		onConfirm(id);
		onClose();
	};
	return (
		<Dialog
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{body}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cancelar' />
				<VolvoButton onClick={handleConfirm} color='success' text='Confirmar' />
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationModal;
