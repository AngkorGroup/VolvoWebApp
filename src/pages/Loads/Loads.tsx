import React, { useEffect, useMemo, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from 'react-query';
import {
	createStyles,
	List,
	ListItem,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
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
import { mapLoads, TableLoad } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import { LOAD_COLUMNS } from './columns';
import { getLoadErrors, getLoads, massiveUpload } from 'common/services';
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

const mapErrors = (errors: LoadError[]) => {
	return (
		<List dense>
			{errors.map((e) => (
				<ListItem key={e.rowIndex}>
					<ListItemText primary={`Línea ${e.rowIndex}: ${e.errorMessage}`} />
				</ListItem>
			))}
		</List>
	);
};

const Loads: React.FC = () => {
	const classes = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<TableLoad[]>([]);
	const alert = useAlert();

	const { data, status } = useQuery('loads', getLoads);
	const loads = useMemo(() => {
		if (data?.ok) {
			return mapLoads(data?.data || []);
		}
		return [];
	}, [data]);

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
			const errors = response.data;
			if (errors?.length) {
				const errorsText = mapErrors(errors);
				alert.error(at('Formato Correcto', 'errors'));
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
			setLoading(true);
			const response = await massiveUpload(files[0]);
			if (response.ok) {
				const errors = response.data;
				if (errors?.length) {
					const errorsText = mapErrors(errors);
					alert.error(at('Errores en el archivo', 'errors'));
				} else {
					alert.success(
						at(
							'Carga Masiva Exitosa',
							'Se realizó la carga masiva de datos correctamente',
						),
					);
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
			{status === 'success' && loads.length > 0 && (
				<PageBody>
					<PageActionBar justifyContent='space-between'>
						<TableFilter value={query} onChange={onFilterChange} />
						<input
							ref={inputRef}
							className={classes.input}
							multiple
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
			)}
		</div>
	);
};

export default Loads;
