import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	makeStyles,
	TextField,
	Theme,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';
import { Dealer } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: Dealer;
	onClose: () => void;
	onConfirm: (data: Dealer) => void;
}

const initialValues: Dealer = {
	code: '',
	name: '',
	ruc: '',
	address: '',
	status: 'Activo',
	type: '',
	phone: '',
	zone: '',
	maxCashiers: '',
};

const fieldProps = {
	size: 'small',
	variant: 'outlined',
	fullWidth: true,
	as: TextField,
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiTextField-root': {
				marginTop: theme.spacing(1),
			},
		},
	}),
);

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: Dealer) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik initialValues={values || initialValues} onSubmit={handleSubmit}>
				{() => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field name='code' label='Código' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<Field name='name' label='Nombre' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='ruc' label='RUC' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='type' label='Tipo' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='phone' label='Teléfono' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='zone' label='Zona' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<Field name='address' label='Dirección' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='maxCashiers' label='Max. POS' {...fieldProps} />
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
							<VolvoButton type='submit' color='success' text='Guardar' />
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default FormModal;
