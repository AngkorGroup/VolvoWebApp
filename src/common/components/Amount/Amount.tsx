import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';

interface AmountProps {
	value: number;
}

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		negative: {
			color: palette.error.main,
		},
	}),
);

const Amount: React.FC<AmountProps> = ({ value }: AmountProps) => {
	const classes = useStyles();
	const amountColor = value < 0 ? classes.negative : '';
	return (
		<NumberFormat
			className={amountColor}
			value={value}
			thousandSeparator
			displayType='text'
			decimalScale={2}
			fixedDecimalScale
		/>
	);
};

export default Amount;
