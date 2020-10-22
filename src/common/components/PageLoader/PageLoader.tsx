import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

interface PageLoaderProps {
	color?: 'primary' | 'secondary' | 'inherit' | undefined;
}

const useStyles = makeStyles(() =>
	createStyles({
		loader: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	}),
);

const PageLoader: React.FC<PageLoaderProps> = ({
	color = 'primary',
}: PageLoaderProps) => {
	const classes = useStyles();
	return (
		<div className={classes.loader}>
			<CircularProgress color={color} />
		</div>
	);
};

export default PageLoader;
