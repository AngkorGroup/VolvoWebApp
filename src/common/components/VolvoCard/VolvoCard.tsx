import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import cardOcean from '../../assets/images/cardOcean.png';
import cardGray from '../../assets/images/cardGray.png';

interface VolvoCardProps {
	title: string;
	// This prop will be deleted when real data comes in
	type: string;
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
	}),
);

const VolvoCard: React.FC<VolvoCardProps> = ({
	title,
	type,
	balance,
	number,
	isThumbnail,
}: VolvoCardProps) => {
	const classes = useStyles();
	const cardIMG = type === 'VURE' ? cardGray : cardOcean;
	const sizeClass = isThumbnail ? classes.thumbnail : classes.normal;
	return (
		<div className={`${classes.card} ${sizeClass}`}>
			<img className={classes.image} src={cardIMG} alt='Imagen de la tarjeta' />
			<div className={classes.title}>
				<div>{title}</div>
				<div className={classes.number}>{number}</div>
			</div>
			<div className={classes.balance}>{balance}</div>
		</div>
	);
};

export default VolvoCard;
