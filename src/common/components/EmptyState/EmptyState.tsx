import { createStyles, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import SearchIcon from '@material-ui/icons/Search';

interface EmptyStateProps {
	text: string;
}

const useStyles = makeStyles(() =>
	createStyles({
		box: {
			width: '150px',
			height: '150px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			fontSize: '1.4rem',
		},
		container: {
			display: 'flex',
			justifyContent: 'center',
			height: '40vh',
			alignItems: 'center',
		},
	}),
);

const EmptyState: React.FC<EmptyStateProps> = ({ text }: EmptyStateProps) => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Paper className={classes.box} elevation={3}>
				<div>
					<SearchIcon fontSize='large' />
				</div>
				<div>{text}</div>
			</Paper>
		</div>
	);
};

export default EmptyState;
