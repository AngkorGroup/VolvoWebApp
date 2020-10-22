import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';

interface DeleteModalProps {
	show: boolean;
	id: string;
	name: string;
	onClose: () => void;
	onConfirm: (id: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	show,
	id,
	name,
	onClose,
	onConfirm,
}: DeleteModalProps) => {
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
			<DialogTitle id='alert-dialog-title'>Eliminar Dealer</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					¿Está seguro que desea eliminar el dealer {id}-{name}?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cancelar' />
				<VolvoButton onClick={handleConfirm} color='success' text='Confirmar' />
			</DialogActions>
		</Dialog>
	);
};

export default DeleteModal;
