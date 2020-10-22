import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';

interface ImageModalProps {
	show: boolean;
	title: string;
	url: string;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
	show,
	title,
	url,
	onClose,
}: ImageModalProps) => {
	return (
		<Dialog
			fullWidth
			maxWidth='md'
			scroll='paper'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<img src={url} alt='Imagen del modal' />
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default ImageModal;
