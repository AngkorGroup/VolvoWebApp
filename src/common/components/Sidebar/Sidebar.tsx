import {
	createStyles,
	Divider,
	Drawer,
	Hidden,
	List,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core';
import React, { useContext } from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import { SIDEBAR_WIDTH } from '../../Layout/Layout';
import SidebarMultiItem from '../SidebarMultiItem/SidebarMultiItem';
import AppContext from 'AppContext';
import { getAllMenuIds, getAllowMenus } from 'common/utils';

const useStyles = makeStyles(({ palette, breakpoints, mixins }: Theme) =>
	createStyles({
		drawer: {
			[breakpoints.up('sm')]: {
				width: SIDEBAR_WIDTH,
				flexShrink: 0,
			},
		},
		toolbar: mixins.toolbar,
		drawerPaper: {
			width: SIDEBAR_WIDTH,
			backgroundColor: palette.primary.light,
		},
	}),
);

interface SidebarProps {
	mobileOpen: boolean;
	handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	mobileOpen,
	handleDrawerToggle,
}) => {
	const { user } = useContext(AppContext);
	const classes = useStyles();
	const theme = useTheme();
	const accesses = user?.menuOptions || getAllMenuIds();
	const allowedMenus = getAllowMenus(accesses);

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{allowedMenus.map((item) => {
					if (item.path) {
						return (
							<SidebarItem
								key={item.id}
								id={item.id}
								title={item.title}
								path={item.path}
								icon={item.icon && <item.icon />}
							/>
						);
					}
					return (
						<SidebarMultiItem
							key={item.id}
							id={item.id}
							title={item.title}
							menuList={item.menuList || []}
							icon={item.icon && <item.icon />}
						/>
					);
				})}
			</List>
		</div>
	);
	const container =
		window !== undefined ? () => window.document.body : undefined;
	return (
		<nav className={classes.drawer} aria-label='mailbox folders'>
			<Hidden smUp implementation='css'>
				<Drawer
					container={container}
					variant='temporary'
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true,
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation='css'>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant='permanent'
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};

export default Sidebar;
