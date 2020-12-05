import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as BrowserLink, useHistory } from 'react-router-dom';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { forgotPassword } from 'common/services';
import { ForgotPasswordForm, ForgotPasswordSchema } from 'common/validations';
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

const initialValues: ForgotPasswordForm = {
	email: '',
};

const ForgotPassword = () => {
	const classes = useStyles();
	const alert = useAlert();
	const { push } = useHistory();

	const handleSubmit = async ({ email }: ForgotPasswordForm) => {
		const response = await forgotPassword(email);
		if (response.ok) {
			alert.success(
				at(
					'Olvidé mi contraseña',
					'Se ha enviado un correo con la nueva contraseña generada.',
				),
			);
			push('/');
		} else {
			alert.error(
				at(
					'Ha ocurrido un error',
					'Hubo un error en la solicitud de olvidé contraseña, intente nuevamente.',
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
					Olvidé mi contraseña
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={ForgotPasswordSchema}
				>
					{({ touched, errors }) => (
						<Form className={classes.form}>
							<Field
								name='email'
								label='Correo'
								error={touched.email && !!errors.email}
								helperText={touched.email && errors.email}
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
								Enviar
							</Button>
							<Grid container>
								<Grid item xs={12}>
									<BrowserLink className={classes.link} to='/'>
										Login
									</BrowserLink>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
};

export default ForgotPassword;
