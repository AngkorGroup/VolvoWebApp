import React, { useContext, useEffect, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ErrorIcon from '@material-ui/icons/Error';
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
import { api, filterRows, Load, LoadError } from 'common/utils';
import { LOADS_URL } from 'common/constants/api';
import { mapLoads, TableLoad } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import AppContext from '../../AppContext';
import { LOAD_COLUMNS } from './columns';

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
	const [loads, setLoads] = useState<TableLoad[]>([]);
	const [filtered, setFiltered] = useState<TableLoad[]>([]);

	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, loads);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onUpload = () => inputRef.current?.click();

	const checkErrors = async () => {
		const response = await api.get<LoadError[]>(`${LOADS_URL}/errors`);
		if (response.ok) {
			const errors = response.data;
			if (errors?.length) {
				const errorsText = mapErrors(errors);
				addPageMessage!({
					title: 'Errores en el archivo',
					text: errorsText,
					status: 'warning',
				});
			} else {
				addPageMessage!({
					title: 'Formato Correcto',
					text: 'No se ha detectado ningún error en ningún archivo',
					status: 'success',
				});
			}
		}
	};

	const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files || [];
		if (files.length > 0) {
			setLoading(true);
			const formData = new FormData();
			formData.append('file', files[0]);
			const response = await api.post<LoadError[]>(LOADS_URL, formData);
			if (response.ok) {
				const errors = response.data;
				if (errors?.length) {
					const errorsText = mapErrors(errors);
					addPageMessage!({
						title: 'Errores en el archivo',
						text: errorsText,
						status: 'warning',
					});
				} else {
					addPageMessage!({
						title: 'Carga Masiva Exitosa',
						text: 'Se realizó la carga masiva de datos correctamente',
						status: 'success',
					});
				}
			} else {
				addPageMessage!({
					title: 'Carga Masiva Fallida',
					text: 'Hubo un error en la carga masiva, intente nuevamente',
					status: 'error',
				});
			}
		}
	};

	useEffect(() => {
		const getLoads = async () => {
			const response = await api.get<Load[]>(LOADS_URL);
			setLoading(false);
			if (response.ok) {
				const loadsData = mapLoads(response.data || []);
				setLoads(loadsData);
				setFiltered(loadsData);
			}
		};

		getLoads();
	}, []);

	return (
		<div>
			<div>
				<PageTitle title='Cargas y Recargas' />
			</div>
			{loading && <PageLoader />}
			{!loading && loads.length > 0 && (
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
