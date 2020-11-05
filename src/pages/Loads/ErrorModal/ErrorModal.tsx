import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TableCell,
	TableRow,
} from '@material-ui/core';
import { BasicTable, VolvoButton } from 'common/components';
import { LoadError } from 'common/utils';
import React from 'react';
import { ERROR_COLUMNS } from '../columns';

interface ErrorModalProps {
	show: boolean;
	errors: LoadError[];
	onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
	show,
	errors,
	onClose,
}: ErrorModalProps) => {
	return (
		<Dialog
			fullWidth
			maxWidth='md'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Errores</DialogTitle>
			<DialogContent>
				<BasicTable columns={ERROR_COLUMNS}>
					<React.Fragment>
						{errors.map((item, i: number) => (
							<TableRow key={i}>
								<TableCell align='center'>{item.rowIndex}</TableCell>
								<TableCell>{item.errorMessage}</TableCell>
							</TableRow>
						))}
					</React.Fragment>
				</BasicTable>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default ErrorModal;
