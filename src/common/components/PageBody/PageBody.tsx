import { createStyles, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface PageBodyProps {
	children: ReactNode;
}

const useStyles = makeStyles(() =>
	createStyles({
		body: {
			marginTop: '25px',
		},
	}),
);

const PageBody: React.FC<PageBodyProps> = ({ children }: PageBodyProps) => {
	const classes = useStyles();
	return <div className={classes.body}>{children}</div>;
};

export default PageBody;
