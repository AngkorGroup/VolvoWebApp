import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import { VolvoButton } from 'common/components';
import ReportMaker from 'common/components/ReportMaker/ReportMaker';
import { REPORT_ENDPOINTS } from 'common/services';
import { Filter } from 'common/utils';
import React from 'react';

interface ReportModalProps {
	id: string;
	show: boolean;
	title: string;
	filters: Filter;
	onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
	id,
	show,
	title,
	filters,
	onClose,
}: ReportModalProps) => {
	return (
		<Dialog
			fullWidth
			maxWidth='sm'
			open={show}
			onClose={onClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<Typography variant='subtitle1' align='left'>
					Filtros
				</Typography>
				<ReportMaker {...filters} endpoint={REPORT_ENDPOINTS[id]} />
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cancelar' />
			</DialogActions>
		</Dialog>
	);
};

export default ReportModal;
