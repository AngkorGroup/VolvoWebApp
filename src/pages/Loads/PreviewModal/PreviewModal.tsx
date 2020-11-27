import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { BasicTable, VolvoButton } from 'common/components';
import React from 'react';
import { LOAD_COLUMNS } from '../columns';
import { TableLoad } from '../interfaces';
import LoadRow from '../LoadRow/LoadRow';

interface PreviewModalProps {
	show: boolean;
	previewItems: TableLoad[];
	onClose: () => void;
	onMassiveUpload: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
	show,
	previewItems,
	onClose,
	onMassiveUpload,
}: PreviewModalProps) => {
	const onConfirm = () => {
		onMassiveUpload();
		onClose();
	};
	const isError = previewItems.every((item) => !!item.errorMessage);
	return (
		<Dialog fullWidth maxWidth='xl' open={show} onClose={onClose}>
			<DialogTitle id='alert-dialog-title'>Pre Carga</DialogTitle>
			<DialogContent>
				<BasicTable columns={[{ title: 'Línea' }, ...LOAD_COLUMNS]}>
					<React.Fragment>
						{previewItems.map((item, i: number) => (
							<LoadRow key={i} item={item} />
						))}
					</React.Fragment>
				</BasicTable>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
				<VolvoButton
					disabled={isError}
					onClick={onConfirm}
					color='success'
					text='Confirmar'
				/>
			</DialogActions>
		</Dialog>
	);
};

export default PreviewModal;
