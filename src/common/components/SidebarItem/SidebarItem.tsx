import {
	createStyles,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
	className?: string;
	id: string;
	title: string;
	path: string;
	icon?: JSX.Element;
}

const useStyles = makeStyles(({ palette }: Theme) =>
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
	}),
);

const SidebarItem: React.FC<SidebarItemProps> = ({
	className,
	icon,
	title,
	path,
}) => {
	const classes = useStyles();
	return (
		<NavLink
			className={classes.navItem}
			to={path}
			activeClassName={classes.selected}
		>
			<ListItem className={className} button key={title}>
				{icon && <ListItemIcon>{icon} </ListItemIcon>}
				<ListItemText primary={title} />
			</ListItem>
		</NavLink>
	);
};

export default SidebarItem;
