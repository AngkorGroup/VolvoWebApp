import React, { useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, makeStyles } from '@material-ui/core';
import {
	BasicTable,
	ConfirmationModal,
	PageActionBar,
	PageBody,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import { buildAlertBody as at, filterRows } from 'common/utils';
import { mapPreLoads, TableLoad } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import { LOAD_COLUMNS } from './columns';
import { massiveUpload, preMassiveUpload } from 'common/services';
import { useAlert } from 'react-alert';

const useStyles = makeStyles(() =>
	createStyles({
		actionBar: {
			textAlign: 'right',
			margin: '10px 0',
		},
		input: {
			display: 'none',
		},
		actionButtons: {
			margin: '0 5px',
		},
	}),
);

const Loads: React.FC = () => {
	const classes = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const [showButtonConfirm, setShowButtonConfirm] = useState(false);
	const [allErrors, setAllErrors] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [previewList, setPreviewList] = useState<TableLoad[]>([]);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<TableLoad[]>([]);
	const alert = useAlert();

	const onCloseConfirm = () => setShowConfirm(false);
	const onOpenConfirm = () => setShowConfirm(true);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, previewList);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onUpload = () => inputRef.current?.click();

	const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files || [];
		if (files.length > 0) {
			setFile(files[0]);
			const response = await preMassiveUpload(files[0]);
			if (response.ok) {
				const rows = mapPreLoads(response?.data || []);
				setAllErrors(rows.every((r) => !!r.errorMessage));
				setShowButtonConfirm(true);
				setPreviewList(rows);
				setFiltered(rows);
			}
		}
		(inputRef?.current || { value: '' }).value = '';
	};

	const onMassiveUpload = async () => {
		if (file) {
			const response = await massiveUpload(file);
			if (response.ok) {
				const loadErrors = response.data;
				setFile(null);
				const alertTitle = 'Carga Masiva Exitosa';
				const alertBody = loadErrors?.length
					? 'Se realizó la carga masiva de recargas de los registros sin errores'
					: 'Se realizó la carga masiva de recargas correctamente';
				alert.success(at(alertTitle, alertBody));
			} else {
				alert.error(
					at(
						'Carga Masiva Fallida',
						'Hubo un error en la carga masiva, intente nuevamente',
					),
				);
			}
			setShowButtonConfirm(false);
		}
	};

	return (
		<div>
			<div>
				<PageTitle title='Carga Masiva' />
			</div>
			<PageBody>
				<PageActionBar justifyContent='space-between'>
					<input
						ref={inputRef}
						className={classes.input}
						type='file'
						onChange={onSelectFile}
					/>
					<div>
						{previewList.length > 0 && (
							<TableFilter value={query} onChange={onFilterChange} />
						)}
						<VolvoButton
							className={classes.actionButtons}
							text='Carga Masiva'
							icon={<PublishIcon />}
							color='primary'
							onClick={onUpload}
						/>
						{showButtonConfirm && previewList.length > 0 && !allErrors && (
							<VolvoButton
								className={classes.actionButtons}
								text='Confirmar'
								icon={<CheckIcon />}
								color='primary'
								onClick={onOpenConfirm}
							/>
						)}
					</div>
				</PageActionBar>
				{showConfirm && (
					<ConfirmationModal
						show={showConfirm}
						id={''}
						title='Confirmar Carga Masiva'
						body={`¿Está seguro que desea confirmar la carga masiva?`}
						onClose={onCloseConfirm}
						onConfirm={onMassiveUpload}
					/>
				)}
				<div>
					<BasicTable columns={LOAD_COLUMNS}>
						<React.Fragment>
							{filtered.map((item, i: number) => (
								<LoadRow key={i} item={item} />
							))}
						</React.Fragment>
					</BasicTable>
				</div>
			</PageBody>
		</div>
	);
};

export default Loads;
