import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { createStyles, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
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
import { mapClients, TableClient } from './interface';
import AppContext from '../../AppContext';
import { CLIENT_COLUMNS } from './columns';
import { getClients } from 'common/services';

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
	const [filtered, setFiltered] = useState<TableClient[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const { data, status } = useQuery(null, getClients);
	const clients = useMemo(() => mapClients(data?.data || []), [data]);

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
				addPageMessage!({
					title: 'Carga Masiva Exitosa',
					text: 'Se realizó la carga masiva de datos correctamente',
					status: 'success',
				});
			}, 1000);
		}
	};

	useEffect(() => {
		if (clients.length > 0) {
			setFiltered(clients);
		}
	}, [clients]);

	return (
		<div>
			<div>
				<PageTitle title='Clientes' />
			</div>
			{(status === 'loading' || loading) && <PageLoader />}
			{status === 'success' && clients.length > 0 && (
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
