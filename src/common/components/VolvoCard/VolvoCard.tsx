import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { colors } from 'theme';
import Amount from '../Amount/Amount';

interface VolvoCardProps {
	title: string;
	balance?: number | string;
	currency?: string;
	number?: string;
	color?: string;
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
			position: 'relative',
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
			zIndex: 2,
		},
		balance: {
			marginBottom: '10px',
			zIndex: 2,
		},
		number: {
			fontSize: '15px',
			fontWeight: 400,
		},
		image: {
			position: 'absolute',
			width: '100%',
			zIndex: 1,
		},
		cardGray: {
			backgroundColor: colors.slate,
		},
		cardOcean: {
			backgroundColor: palette.info.main,
		},
		cardName: {
			fontSize: '25px',
		},
	}),
);

const VolvoCard: React.FC<VolvoCardProps> = ({
	title,
	balance,
	currency,
	color,
	number,
	isThumbnail,
}: VolvoCardProps) => {
	const classes = useStyles();
	const colorStyle = color ? { backgroundColor: color } : {};
	const sizeClass = isThumbnail ? classes.thumbnail : classes.normal;
	return (
		<div className={`${classes.card} ${sizeClass}`} style={colorStyle}>
			<div className={classes.title}>
				<div className={classes.cardName}>{title}</div>
				<div className={classes.number}>{number}</div>
			</div>
			<div className={classes.balance}>
				{currency} {typeof balance === 'string' && balance}
				{typeof balance === 'number' && <Amount value={balance} />}
			</div>
		</div>
	);
};

export default VolvoCard;
