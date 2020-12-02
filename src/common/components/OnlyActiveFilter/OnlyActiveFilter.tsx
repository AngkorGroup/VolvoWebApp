import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';

interface Props {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
	container: {
		marginLeft: '10px',
	},
});

const OnlyActiveFilter: React.FC<Props> = memo(
	({ checked, onChange }: Props) => {
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
	},
	(prev: Props, next: Props) => prev.checked === next.checked,
);

export default OnlyActiveFilter;
