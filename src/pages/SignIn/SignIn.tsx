import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import AppContext from 'AppContext';

type FormEvent = React.FormEvent<HTMLFormElement>;

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
}));

const TEST_USER = {
	user: 'test',
	password: 'test',
};

const SignIn = () => {
	const classes = useStyles();
	const { push } = useHistory();
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const { addPageMessage } = useContext(AppContext);

	const onUserChange = (e: any) => setUser(e.target.value);
	const onPassChange = (e: any) => setPassword(e.target.value);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (user === TEST_USER.user && password === TEST_USER.password) {
			push('/client_balance');
		} else {
			addPageMessage!({
				title: 'Credenciales Incorrectas',
				text: 'Las credenciales ingresadas no son correctas.',
				status: 'error',
			});
		}
	};

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
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Usuario'
						name='user'
						autoFocus
						value={user}
						onChange={onUserChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Contraseña'
						type='password'
						autoComplete='current-password'
						value={password}
						onChange={onPassChange}
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Recordarme'
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
							<Link href='#' variant='body2'>
								¿Olvidó su contraseña?
							</Link>
						</Grid>
						<Grid item xs={6}>
							<Link href='#' variant='body2'>
								Registrarse
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignIn;
