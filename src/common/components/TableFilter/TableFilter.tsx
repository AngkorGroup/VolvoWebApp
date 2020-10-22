import { TextField } from '@material-ui/core';
import React from 'react';

type Event = React.ChangeEvent<HTMLInputElement>;

interface TableFilterProps {
	value: string;
	label?: string;
	onChange: (e: Event) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
	value,
	label,
	onChange,
}) => {
	return (
		<TextField
			value={value}
			size='small'
			variant='outlined'
			label={label || 'Filtro'}
			onChange={onChange}
		/>
	);
};

export default TableFilter;
