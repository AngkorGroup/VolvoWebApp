import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

interface PageTitleProps {
	title: string;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		title: {
			fontSize: '1.875rem',
			color: palette.text.secondary,
		},
	}),
);

const PageTitle: React.FC<PageTitleProps> = ({ title }: PageTitleProps) => {
	const classes = useStyles();
	return (
		<div>
			<Typography className={classes.title} align='left' variant='h5'>
				{title}
			</Typography>
		</div>
	);
};

export default PageTitle;
