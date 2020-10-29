import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Option } from 'common/utils/types';
import React, { useState } from 'react';

interface AsyncTypeAheadProps {
	placeholder: string;
	options: Option[];
	loading: boolean;
	onChange: (event: any, newValue: string | Option) => void;
	onType: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AsyncTypeAhead: React.FC<AsyncTypeAheadProps> = ({
	placeholder,
	options,
	loading,
	onChange,
	onType,
}: AsyncTypeAheadProps) => {
	const [open, setOpen] = useState(false);
	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	return (
		<div>
			<Autocomplete
				disableClearable
				open={open}
				onOpen={onOpen}
				onClose={onClose}
				getOptionSelected={(option, value) => option.value === value.value}
				getOptionLabel={(option: Option) => option.label}
				options={options}
				onChange={onChange}
				loading={loading}
				loadingText='Cargando...'
				noOptionsText='No hay resultados.'
				renderInput={(params) => (
					<TextField
						{...params}
						size='small'
						label={placeholder}
						margin='normal'
						variant='outlined'
						InputProps={{
							...params.InputProps,
							type: 'search',
							onChange: onType,
						}}
					/>
				)}
			/>
		</div>
	);
};

export default AsyncTypeAhead;
