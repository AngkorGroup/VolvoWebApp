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
	options: Option[];
	onChange: ChangeFunction;
}

const MultiTypeAhead: React.FC<MultiTypeAheadProps> = ({
	label,
	limitTags,
	placeholder,
	options,
	onChange,
}: MultiTypeAheadProps) => {
	return (
		<div>
			<Autocomplete
				multiple
				size='small'
				limitTags={limitTags || 2}
				options={options}
				getOptionLabel={(option) => option.label}
				defaultValue={options}
				filterSelectedOptions
				onChange={onChange}
				renderInput={(params) => (
					<TextField
						{...params}
						variant='outlined'
						label={label}
						placeholder={placeholder}
					/>
				)}
			/>
		</div>
	);
};

export default MultiTypeAhead;
