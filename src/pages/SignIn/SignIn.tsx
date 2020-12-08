import React, { useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Link as BrowserLink } from 'react-router-dom';
import AppContext from 'AppContext';
import { setAuthToken, buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { login } from 'common/services';
import { LoginForm, LoginSchema } from 'common/validations';
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

const initialValues: LoginForm = {
	email: '',
	password: '',
};

const REDIRECT_ON_LOGIN = '/security/profile';

const SignIn = () => {
	const classes = useStyles();
	const alert = useAlert();
	const { push } = useHistory();
	const { user, setAppUser } = useContext(AppContext);

	const handleSubmit = async ({ email, password }: LoginForm) => {
		const response = await login(email, password);
		if (response.ok) {
			const { admin, authToken } = response.data || {};
			if (admin && authToken && setAppUser) {
				setAppUser(admin, authToken);
				setAuthToken(authToken);
				push(REDIRECT_ON_LOGIN);
			}
		} else {
			alert.error(
				at(
					'Credenciales Incorrectas',
					'Las credenciales ingresadas no son correctas.',
				),
			);
		}
	};

	useEffect(() => {
		if (user) {
			push(REDIRECT_ON_LOGIN);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={LoginSchema}
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
							<Field
								name='password'
								label='Contraseña'
								error={touched.password && !!errors.password}
								helperText={touched.password && errors.password}
								variant='outlined'
								margin='normal'
								fullWidth
								type='password'
								as={TextField}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Ingresar
							</Button>
							<Grid container>
								<Grid item xs={6}>
									<BrowserLink className={classes.link} to='/forgot_password'>
										¿Olvidó su contraseña?
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

export default SignIn;
