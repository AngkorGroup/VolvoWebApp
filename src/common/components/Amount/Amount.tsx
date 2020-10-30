import React from 'react';
import NumberFormat from 'react-number-format';

interface AmountProps {
	value: number;
}

const Amount: React.FC<AmountProps> = ({ value }: AmountProps) => {
	return (
		<NumberFormat
			value={value}
			thousandSeparator
			displayType='text'
			decimalScale={2}
			fixedDecimalScale
		/>
	);
};

export default Amount;
