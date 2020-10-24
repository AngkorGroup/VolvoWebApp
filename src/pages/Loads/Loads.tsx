import React, { useContext, useEffect, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
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
import { filterRows } from 'common/utils';
import { Load } from './interfaces';
import LoadRow from './LoadRow/LoadRow';
import AppContext from '../../AppContext';
import { LOAD_COLUMNS } from './columns';

const loadsRows: Load[] = [
	{
		number: '0010020',
		ruc: '20506002975',
		name: 'Angkor Group',
		date: '01/01/2020',
		chassis: 'Chasis 1',
		invoice: 'F001-00003659',
		amount: '5,000.00',
		currency: 'US$',
		type: 'CONTRATO',
		reason: 'Creación de tarjeta',
		card: 'VREP',
		tpNumber: '22258',
	},
	{
		number: '0010021',
		ruc: '20506002975',
		name: 'Angkor Group',
		date: '01/06/2020',
		chassis: 'Chasis 1',
		invoice: 'F001-00004736',
		amount: '1,000.00',
		currency: 'US$',
		type: 'ADENDA',
		reason: 'Creación de tarjeta',
		card: 'VURE',
		tpNumber: '22259',
	},
];

const newLoadRows = [
	{
		number: '0010024',
		ruc: '20506002975',
		name: 'Angkor Group',
		date: '02/08/2020',
		chassis: 'Chasis 5',
		invoice: 'F001-00001447',
		amount: '4,800.00',
		currency: 'US$',
		type: 'CONTRATO',
		reason: 'Creación de tarjeta',
		card: 'VURE',
		tpNumber: '78845',
	},
];

const useStyles = makeStyles(() =>
	createStyles({
		actionBar: {
			textAlign: 'right',
			margin: '10px 0',
		},
		input: {
			display: 'none',
		},
	}),
);

const Loads: React.FC = () => {
	const classes = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [loads, setLoads] = useState<Load[]>([]);
	const [filtered, setFiltered] = useState<Load[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, loads);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onUpload = () => inputRef.current?.click();

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files || [];
		if (files.length > 0) {
			setLoading(true);
			// perform API call
			setTimeout(() => {
				setLoading(false);
				setLoads((old) => [...old, ...newLoadRows]);
				addPageMessage!({
					title: 'Carga Masiva Exitosa',
					text: 'Se realizó la carga masiva de datos correctamente',
					status: 'success',
				});
			}, 1000);
		}
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setLoads(loadsRows);
			setFiltered(loadsRows);
		}, 1000);
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
						<VolvoButton
							text='Carga Masiva'
							icon={<PublishIcon />}
							color='primary'
							onClick={onUpload}
						/>
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
