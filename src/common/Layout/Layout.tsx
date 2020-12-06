import {
	AppBar,
	createStyles,
	CssBaseline,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AppContext from 'AppContext';
import { removeAuthToken, buildAlertBody as at } from 'common/utils';
import { logout } from 'common/services';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

interface LayoutProps {
	menu?: JSX.Element;
	title?: string;
}

export const SIDEBAR_WIDTH = 250;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
				marginLeft: SIDEBAR_WIDTH,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		profile: {
			position: 'absolute',
			right: '50px',
			color: '#fff',
		},
		logout: {
			position: 'absolute',
			right: '10px',
			color: '#fff',
		},
	}),
);

const Layout: React.FC<LayoutProps> = (props) => {
	const alert = useAlert();
	const classes = useStyles();
	const { push } = useHistory();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { setAppUser } = useContext(AppContext);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onLogout = async () => {
		const response = await logout();
		if (response.ok) {
			setAppUser(null);
			removeAuthToken();
		} else {
			alert.error(
				at(
					'Error al salir',
					'Ocurrió un error al intentar salir, por favor intente nuevamente.',
				),
			);
		}
	};

	return (
		<div className='App'>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap>
							Volvo Web App
						</Typography>
						<IconButton
							className={classes.profile}
							onClick={() => push('/security/profile')}
							color='default'
							title='Ver Perfil'
						>
							<AccountCircleIcon />
						</IconButton>
						<IconButton
							className={classes.logout}
							onClick={onLogout}
							color='default'
							title='Cerrar sesión'
						>
							<ExitToAppIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Sidebar
					mobileOpen={mobileOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{props.children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
