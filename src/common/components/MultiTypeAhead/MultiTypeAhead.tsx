import { TextField } from '@material-ui/core';
import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
} from '@material-ui/lab';
import { Option } from 'common/utils/types';
import React from 'react';

export type ChangeFunction = (
	event: React.ChangeEvent<{}>,
	value: Option[],
	reason: AutocompleteChangeReason,
	details?: AutocompleteChangeDetails<Option> | undefined,
) => void;

interface MultiTypeAheadProps {
	label: string;
	limitTags?: number;
	placeholder: string;
	value?: Option[];
	loading?: boolean;
	options: Option[];
	name?: string;
	onChange: ChangeFunction;
}

const MultiTypeAhead: React.FC<MultiTypeAheadProps> = ({
	label,
	limitTags,
	placeholder,
	value,
	loading,
	options,
	name,
	onChange,
}: MultiTypeAheadProps) => {
	return (
		<div>
			<Autocomplete
				multiple
				size='small'
				limitTags={limitTags || 2}
				options={options}
				noOptionsText='No hay más valores'
				getOptionLabel={(option) => option.label}
				getOptionSelected={(option, val) => option.value === val.value}
				defaultValue={options}
				filterSelectedOptions
				onChange={onChange}
				loading={loading}
				value={value}
				renderInput={(params) => (
					<TextField
						{...params}
						variant='outlined'
						label={label}
						placeholder={placeholder}
						name={name}
					/>
				)}
			/>
		</div>
	);
};

export default MultiTypeAhead;
