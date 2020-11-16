import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import ReportMakerContext from '../ReportMakerContext';

type Event = React.ChangeEvent<HTMLInputElement>;

const FilterEconomicGroup = () => {
	const { updateState } = useContext(ReportMakerContext);
	const [checked, setChecked] = useState(false);
	const onChange = (e: Event) => setChecked(e.target.checked);
	useEffect(() => {
		updateState({ economicGroup: checked });
	}, [checked, updateState]);
	return (
		<FormControlLabel
			control={
				<Checkbox checked={checked} onChange={onChange} color='primary' />
			}
			label='Grupo Económico'
		/>
	);
};

export default FilterEconomicGroup;
