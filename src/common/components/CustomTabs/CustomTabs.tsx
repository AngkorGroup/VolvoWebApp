import { createStyles, Tabs, Theme, withStyles } from '@material-ui/core';

const CustomTabs = withStyles(({ palette }: Theme) =>
	createStyles({
		root: {
			borderBottom: `1px solid ${palette.action.disabled}`,
		},
		indicator: {
			backgroundColor: palette.primary.light,
		},
	}),
)(Tabs);

export default CustomTabs;
