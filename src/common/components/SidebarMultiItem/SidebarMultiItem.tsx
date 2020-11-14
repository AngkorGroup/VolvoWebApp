import {
	Collapse,
	createStyles,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Theme,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { MenuItem, REPORT_PATH_SOURCE } from 'common/constants';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from '../SidebarItem/SidebarItem';

interface SidebarMultiItemProps {
	id: string;
	title: string;
	menuList: MenuItem[];
	icon?: JSX.Element;
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
	createStyles({
		selected: {
			'& div, &:hover div': {
				backgroundColor: palette.primary.dark,
			},
		},
		navItem: {
			color: palette.action.disabled,
			textDecoration: 'none',
		},
		lists: {
			backgroundColor: palette.background.paper,
			marginTop: spacing(1),
		},
		nested: {
			paddingLeft: spacing(4),
		},
	}),
);
const SidebarMultiItem: React.FC<SidebarMultiItemProps> = ({
	icon,
	title,
	menuList,
}) => {
	const { pathname } = useLocation();
	const classes = useStyles();
	const [open, setOpen] = useState(pathname.includes(REPORT_PATH_SOURCE));
	const handleClick = () => setOpen((prevOpen) => !prevOpen);
	return (
		<React.Fragment>
			<li className={classes.navItem}>
				<ListItem button onClick={handleClick}>
					{icon && <ListItemIcon>{icon} </ListItemIcon>}
					<ListItemText primary={title} />
					{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
				</ListItem>
			</li>
			<Collapse component='li' in={open} timeout='auto' unmountOnExit>
				<List disablePadding>
					{menuList.map((item: MenuItem) =>
						item.path ? (
							<SidebarItem
								className={classes.nested}
								key={item.id}
								id={item.id}
								title={item.title}
								path={item.path}
								icon={item.icon && <item.icon />}
							/>
						) : null,
					)}
				</List>
			</Collapse>
		</React.Fragment>
	);
};

export default SidebarMultiItem;
