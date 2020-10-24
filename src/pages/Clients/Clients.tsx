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
import ClientRow from './ClientRow/ClientRow';
import { Client } from './interface';
import AppContext from '../../AppContext';
import { CLIENT_COLUMNS } from './columns';

const clientRows: Client[] = [
	{
		ruc: '20506002975',
		name: 'Angkor Group S.A.C',
		createdAt: '01/01/2020',
		address: 'Calle Monte Rosa, Santiago de Surco 15038',
		phone: '01 461-4225',
		status: 'Activo',
	},
	{
		ruc: '20506002976',
		name: 'Zieme PLC',
		createdAt: '01/06/2020',
		address: 'Avenida Perú, 3331',
		phone: '01 361-4895',
		status: 'Activo',
	},
	{
		ruc: '20506002977',
		name: 'Bashirian-Legros',
		createdAt: '01/07/2020',
		address: 'Avenida Guillermo Dansey 1395, Cercado',
		phone: '01 271-7525',
		status: 'Activo',
	},
];

const newClientRows = [
	{
		ruc: '20506002978',
		name: 'Hickle Group',
		createdAt: '01/08/2020',
		address: 'Avenida El Ejército, 530 Miraflores',
		phone: '01 541-2427',
		status: 'Activo',
	},
	{
		ruc: '20506002979',
		name: "Runolfsdottir-O'Conner",
		createdAt: '02/08/2020',
		address: 'Jirón Mrscal Miller, 1922, Lince',
		phone: '01 221-1285',
		status: 'Activo',
	},
];

const useStyles = makeStyles(() =>
	createStyles({
		input: {
			display: 'none',
		},
	}),
);

const Clients: React.FC = () => {
	const classes = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [clients, setClients] = useState<Client[]>([]);
	const [filtered, setFiltered] = useState<Client[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, clients);
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
				const newClients = [...clients, ...newClientRows];
				setClients(newClients);
				setFiltered(newClients);
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
			setClients(clientRows);
			setFiltered(clientRows);
		}, 1000);
	}, []);

	return (
		<div>
			<div>
				<PageTitle title='Clientes' />
			</div>
			{loading && <PageLoader />}
			{!loading && clients.length > 0 && (
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
						<BasicTable columns={CLIENT_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<ClientRow key={i} item={item} />
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				</PageBody>
			)}
		</div>
	);
};

export default Clients;
