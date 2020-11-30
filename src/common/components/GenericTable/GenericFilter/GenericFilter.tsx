import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

type Event = React.ChangeEvent<HTMLInputElement>;

interface GenericFilterProps {
	globalFilter: any;
	setGlobalFilter: any;
}

const GenericFilter: React.FC<GenericFilterProps> = ({
	globalFilter,
	setGlobalFilter,
}) => {
	const [value, setValue] = useState(globalFilter || '');
	const onChange = (e: Event) => {
		const val = e.target.value;
		setValue(val);
		setGlobalFilter(val || undefined);
	};
	return (
		<TextField
			value={value}
			size='small'
			variant='outlined'
			label='Filtro'
			onChange={onChange}
		/>
	);
};

export default GenericFilter;
