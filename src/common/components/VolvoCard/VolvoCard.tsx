import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface VolvoCardProps {
	title: string;
	balance: string;
	number?: string;
	url?: string;
	isThumbnail?: boolean;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		card: {
			backgroundColor: palette.primary.light,
			borderRadius: '20px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			color: palette.primary.contrastText,
			fontSize: '30px',
		},
		normal: {
			width: '250px',
			height: '140px',
		},
		thumbnail: {
			width: '100px',
			height: '56px',
		},
		title: {
			fontWeight: 700,
			marginTop: '5px',
		},
		balance: {
			marginBottom: '10px',
		},
		number: {
			fontSize: '15px',
			fontWeight: 400,
		},
	}),
);

const VolvoCard: React.FC<VolvoCardProps> = ({
	title,
	balance,
	number,
	isThumbnail,
}: VolvoCardProps) => {
	const classes = useStyles();
	const sizeClass = isThumbnail ? classes.thumbnail : classes.normal;
	return (
		<div className={`${classes.card} ${sizeClass}`}>
			<div className={classes.title}>
				<div>{title}</div>
				<div className={classes.number}>{number}</div>
			</div>
			<div className={classes.balance}>{balance}</div>
		</div>
	);
};

export default VolvoCard;
