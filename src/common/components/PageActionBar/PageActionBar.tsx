import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

type JustifyContent = 'flex-start' | 'flex-end' | 'space-between';

interface PageActionBarProps {
	justifyContent?: JustifyContent;
	children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles(() =>
	createStyles({
		actionBar: (props: any) => ({
			display: 'flex',
			margin: '10px 0',
			justifyContent: props.justifyContent,
		}),
	}),
);

const PageActionBar: React.FC<PageActionBarProps> = ({
	justifyContent = 'flex-start',
	children,
}: PageActionBarProps) => {
	const classes = useStyles({ justifyContent });
	return <div className={classes.actionBar}>{children}</div>;
};

export default PageActionBar;
