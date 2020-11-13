import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import React from 'react';

interface OnlyActiveFilterProps {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
	container: {
		marginLeft: '10px',
	},
});

const OnlyActiveFilter: React.FC<OnlyActiveFilterProps> = ({
	checked,
	onChange,
}: OnlyActiveFilterProps) => {
	const classes = useStyles();
	return (
		<FormControlLabel
			className={classes.container}
			control={
				<Checkbox checked={checked} onChange={onChange} color='primary' />
			}
			label='Solo Activos'
		/>
	);
};

export default OnlyActiveFilter;
