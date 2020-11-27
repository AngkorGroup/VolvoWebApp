import React, { useEffect, useMemo, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ErrorIcon from '@material-ui/icons/Error';
import { createStyles, makeStyles } from '@material-ui/core';
import {
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import { buildAlertBody as at, filterRows, LoadError } from 'common/utils';
import { mapLoads, mapPreLoads, TableLoad } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import { LOAD_COLUMNS } from './columns';
import {
	getLoadErrors,
	getLoads,
	massiveUpload,
	preMassiveUpload,
} from 'common/services';
import { useAlert } from 'react-alert';
import ErrorModal from './ErrorModal/ErrorModal';
import PreviewModal from './PreviewModal/PreviewModal';
import { useQuery } from 'react-query';

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
	const [loading, setLoading] = useState(true);
	const [showErrors, setShowErrors] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [errors, setErrors] = useState<LoadError[]>([]);
	const [previewList, setPreviewList] = useState<TableLoad[]>([]);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<TableLoad[]>([]);
	const alert = useAlert();
	const { data, status, refetch } = useQuery('loads', getLoads);
	const loads = useMemo(() => {
		if (data?.ok) {
			return mapLoads(data?.data || []);
		}
		return [];
	}, [data]);

	const onCloseModal = () => setShowErrors(false);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, loads);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onUpload = () => inputRef.current?.click();

	const checkErrors = async () => {
		const response = await getLoadErrors();
		if (response.ok) {
			const loadErrors = response.data;
			if (loadErrors?.length) {
				alert.error(
					at(
						'Formato Incorrecto',
						'Se han presentado algunos errores en el archivo subido',
					),
				);
				setShowErrors(true);
				setErrors(loadErrors);
			} else {
				alert.success(
					at(
						'Formato Correcto',
						'No se ha detectado ningún error en ningún archivo',
					),
				);
			}
		}
	};

	const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files || [];
		if (files.length > 0) {
			setFile(files[0]);
			const response = await preMassiveUpload(files[0]);
			if (response.ok) {
				const rows = mapPreLoads(response?.data || []);
				setPreviewList(rows);
				setShowPreview(true);
			}
		}
		(inputRef?.current || { value: '' }).value = '';
	};

	const onMassiveUpload = async () => {
		if (file) {
			setLoading(true);
			const response = await massiveUpload(file);
			if (response.ok) {
				const loadErrors = response.data;
				setFile(null);
				if (loadErrors?.length) {
					alert.error(
						at(
							'Errores en el archivo',
							'Se han presentado algunos errores en el archivo subido',
						),
					);
					setShowErrors(true);
					setErrors(loadErrors);
				} else {
					alert.success(
						at(
							'Carga Masiva Exitosa',
							'Se realizó la carga masiva de datos correctamente',
						),
					);
					refetch();
				}
			} else {
				alert.error(
					at(
						'Carga Masiva Fallida',
						'Hubo un error en la carga masiva, intente nuevamente',
					),
				);
			}
		}
	};

	const onClosePreview = () => setShowPreview(false);

	useEffect(() => {
		if (loads.length > 0) {
			setFiltered(loads);
		}
	}, [loads]);

	return (
		<div>
			<div>
				<PageTitle title='Cargas y Recargas' />
			</div>
			{status === 'loading' && loading && <PageLoader />}
			{status === 'success' && (
				<PageBody>
					<PageActionBar justifyContent='space-between'>
						{loads.length > 0 && (
							<TableFilter value={query} onChange={onFilterChange} />
						)}
						<input
							ref={inputRef}
							className={classes.input}
							type='file'
							onChange={onSelectFile}
						/>
						<div>
							<VolvoButton
								className={classes.actionButtons}
								text='Carga Masiva'
								icon={<PublishIcon />}
								color='primary'
								onClick={onUpload}
							/>
							<VolvoButton
								className={classes.actionButtons}
								text='Ver Errores'
								icon={<ErrorIcon />}
								color='primary'
								onClick={checkErrors}
							/>
						</div>
					</PageActionBar>
					{showPreview && (
						<PreviewModal
							show={showPreview}
							previewItems={previewList}
							onClose={onClosePreview}
							onMassiveUpload={onMassiveUpload}
						/>
					)}
					{showErrors && (
						<ErrorModal
							show={showErrors}
							errors={errors}
							onClose={onCloseModal}
						/>
					)}
					<div>
						<BasicTable columns={LOAD_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<LoadRow key={i} item={item} isMain />
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				</PageBody>
			)}
		</div>
	);
};

export default Loads;
