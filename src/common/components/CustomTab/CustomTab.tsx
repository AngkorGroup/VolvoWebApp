import { createStyles, Tab, Theme, withStyles } from '@material-ui/core';

const CustomTab = withStyles(({ palette }: Theme) =>
	createStyles({
		root: {
			textTransform: 'none',
			'&:hover': {
				backgroundColor: `${palette.action.disabled}2B`,
				opacity: 1,
			},
		},
	}),
)(Tab);

export default CustomTab;
