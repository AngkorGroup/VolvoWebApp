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
import { VolvoButton } from 'common/components';
import React from 'react';
import { ChangePasswordForm, ChangePasswordSchema } from 'common/validations';

interface PasswordFormModalProps {
	show: boolean;
	title: string;
	onClose: () => void;
	onConfirm: (data: ChangePasswordForm) => void;
}

const initialValues: ChangePasswordForm = {
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
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

const PasswordFormModal: React.FC<PasswordFormModalProps> = ({
	show,
	title,
	onClose,
	onConfirm,
}: PasswordFormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: ChangePasswordForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog fullWidth maxWidth='xs' open={show} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={ChangePasswordSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Field
										name='oldPassword'
										label='Contraseña Actual'
										error={touched.oldPassword && !!errors.oldPassword}
										helperText={touched.oldPassword && errors.oldPassword}
										type='password'
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='newPassword'
										label='Nueva Contraseña'
										error={touched.newPassword && !!errors.newPassword}
										helperText={touched.newPassword && errors.newPassword}
										type='password'
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='confirmPassword'
										label='Confirmar Contraseña'
										error={touched.confirmPassword && !!errors.confirmPassword}
										helperText={
											touched.confirmPassword && errors.confirmPassword
										}
										type='password'
										{...fieldProps}
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
							<VolvoButton type='submit' color='success' text='Cambiar' />
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default PasswordFormModal;
