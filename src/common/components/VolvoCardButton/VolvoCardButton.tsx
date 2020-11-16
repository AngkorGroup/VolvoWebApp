import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface VolvoCardButton {
	id: string;
	title: string;
	onClick: (event: ClickEvent) => void;
}

const useStyles = makeStyles({
	root: {
		minWidth: 150,
		minHeight: 200,
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

const VolvoCardButton: React.FC<VolvoCardButton> = ({
	title,
	onClick,
}: VolvoCardButton) => {
	const classes = useStyles();
	return (
		<Card className={classes.root} onClick={onClick}>
			<CardContent>
				<Typography variant='h5' component='h2'>
					{title}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default VolvoCardButton;
