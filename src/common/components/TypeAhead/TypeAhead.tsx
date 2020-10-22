import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

interface TypeAheadProps {
	placeholder: string;
	options: Option[];
	onChange: (event: any, newValue: string | Option) => void;
}

export interface Option {
	value: string;
	label: string;
}

const TypeAhead: React.FC<TypeAheadProps> = ({
	placeholder,
	options,
	onChange,
}: TypeAheadProps) => {
	return (
		<div>
			<Autocomplete
				freeSolo
				disableClearable
				getOptionLabel={(option: Option) => option.label}
				options={options as Option[]}
				onChange={onChange}
				renderInput={(params) => (
					<TextField
						{...params}
						size='small'
						label={placeholder}
						margin='normal'
						variant='outlined'
						InputProps={{ ...params.InputProps, type: 'search' }}
					/>
				)}
			/>
		</div>
	);
};

export default TypeAhead;
