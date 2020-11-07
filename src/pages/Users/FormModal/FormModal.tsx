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
import { VolvoButton } from 'common/components';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { UserForm } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: UserForm;
	onClose: () => void;
	onConfirm: (data: UserForm) => void;
}

const initialValues: UserForm = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	password: '',
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
			'& .MuiFormControl-root': {
				marginTop: '8px',
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
	const handleSubmit = (data: UserForm) => {
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
								<Grid item xs={6}>
									<Field name='firstName' label='Nombre' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='lastName' label='Apellido' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='email' label='Email' {...fieldProps} />
								</Grid>
								{!values && (
									<Grid item xs={6}>
										<Field
											name='password'
											label='Contraseña'
											type='password'
											{...fieldProps}
										/>
									</Grid>
								)}
								<Grid item xs={6}>
									<Field name='phone' label='Teléfono' {...fieldProps} />
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
