import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		margin: '0 auto',
		minWidth: 275,
		maxWidth: 350,
	},
	title: {
		fontSize: 100,
	},
	text: {
		fontSize: 30,
	},
});

const Unauthorized = () => {
	const classes = useStyles();
	return (
		<Card className={classes.root} variant='outlined'>
			<CardContent>
				<Typography className={classes.title} variant='h4' component='h1'>
					403
				</Typography>
				<Typography className={classes.text} variant='h4' component='h1'>
					No está autorizado para acceder a esta opción
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Unauthorized;
