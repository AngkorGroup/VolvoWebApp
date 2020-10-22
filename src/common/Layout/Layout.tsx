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
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

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
	}),
);

const Layout: React.FC<LayoutProps> = (props) => {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
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
