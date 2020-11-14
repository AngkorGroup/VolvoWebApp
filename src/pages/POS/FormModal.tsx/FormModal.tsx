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
import { CashierSchema } from 'common/validations';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { POSForm } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: POSForm;
	onClose: () => void;
	onConfirm: (data: POSForm) => void;
}

const initialValues: POSForm = {
	imei: '',
	phone: '',
	email: '',
	firstName: '',
	lastName: '',
	tpCode: '',
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
	const handleSubmit = (data: POSForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={CashierSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field
										name='imei'
										label='IMEI'
										error={touched.imei && !!errors.imei}
										helperText={touched.imei && errors.imei}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={8}>
									<Field
										name='phone'
										label='Celular'
										error={touched.phone && !!errors.phone}
										helperText={touched.phone && errors.phone}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='email'
										label='Correo'
										error={touched.email && !!errors.email}
										helperText={touched.email && errors.email}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='firstName'
										label='Nombres'
										error={touched.firstName && !!errors.firstName}
										helperText={touched.firstName && errors.firstName}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='lastName'
										label='Apellidos'
										error={touched.lastName && !!errors.lastName}
										helperText={touched.lastName && errors.lastName}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='tpCode'
										label='Código TP'
										error={touched.tpCode && !!errors.tpCode}
										helperText={touched.tpCode && errors.tpCode}
										{...fieldProps}
									/>
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
