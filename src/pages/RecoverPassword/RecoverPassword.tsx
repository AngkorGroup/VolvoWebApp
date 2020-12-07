import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, useParams } from 'react-router-dom';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { recoverPassword } from 'common/services';
import { RecoverPasswordForm, RecoverPasswordSchema } from 'common/validations';
import { Field, Form, Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
	},
}));

interface PathParams {
	token: string;
}

const initialValues: RecoverPasswordForm = {
	token: '',
	newPassword: '',
	confirmPassword: '',
};

const RecoverPassword = () => {
	const classes = useStyles();
	const alert = useAlert();
	const { push } = useHistory();
	const { token } = useParams<PathParams>();

	const handleSubmit = async (data: RecoverPasswordForm) => {
		const response = await recoverPassword({ ...data, token });
		if (response.ok) {
			alert.success(
				at('Contraseña Recuperada', 'Se cambió la contraseña con éxito.'),
			);
			push('/');
		} else {
			alert.error(
				at(
					'Ha ocurrido un error',
					'Hubo un error en la solicitud de cambiar contraseña, intente nuevamente.',
				),
			);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VpnKeyIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Recuperar Contraseña
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={RecoverPasswordSchema}
				>
					{({ touched, errors }) => (
						<Form className={classes.form}>
							<Field
								name='newPassword'
								label='Nueva Contraseña'
								error={touched.newPassword && !!errors.newPassword}
								helperText={touched.newPassword && errors.newPassword}
								variant='outlined'
								margin='normal'
								fullWidth
								autoFocus
								as={TextField}
							/>
							<Field
								name='confirmPassword'
								label='Confirmar Contraseña'
								error={touched.confirmPassword && !!errors.confirmPassword}
								helperText={touched.confirmPassword && errors.confirmPassword}
								variant='outlined'
								margin='normal'
								fullWidth
								autoFocus
								as={TextField}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Cambiar
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
};

export default RecoverPassword;
