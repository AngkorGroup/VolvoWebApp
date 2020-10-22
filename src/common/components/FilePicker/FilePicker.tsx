import { createStyles, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import VolvoButton from '../VolvoButton/VolvoButton';

interface FilePickerProps {
	name: string;
	label: string;
	onChange: ((file: File) => void) | undefined;
}

const useStyles = makeStyles(() =>
	createStyles({
		input: {
			display: 'none',
		},
		fileContainer: {
			marginTop: '10px',
			display: 'flex',
		},
		filename: {
			marginLeft: '5px',
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	}),
);

type Event = React.ChangeEvent<HTMLInputElement>;

const FilePicker: React.FC<FilePickerProps> = ({
	label,
	onChange,
}: FilePickerProps) => {
	const classes = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const [filename, setFilename] = useState('Seleccione un archivo');

	const onUpload = () => inputRef.current?.click();
	const onSelectFile = (e: Event) => {
		const files = e.target.files || [];
		if (files.length > 0 && !!onChange) {
			const file = files[0];
			setFilename(file?.name);
			onChange(file);
		}
	};
	return (
		<div className={classes.fileContainer}>
			<input
				ref={inputRef}
				className={classes.input}
				multiple
				type='file'
				onChange={onSelectFile}
			/>
			<VolvoButton
				text={label}
				icon={<PublishIcon />}
				color='primary'
				onClick={onUpload}
			/>
			<span className={classes.filename}>{filename}</span>
		</div>
	);
};

export default FilePicker;
