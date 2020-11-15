import React, { useEffect, useMemo, useRef, useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { createStyles, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import {
	BasicTable,
	OnlyActiveFilter,
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
import { CLIENT_COLUMNS } from './columns';
import { getClientsByPagination } from 'common/services';

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
	const [query, setQuery] = useState('');
	const [onlyActive, setOnlyActive] = useState(true);
	const [filtered, setFiltered] = useState<TableClient[]>([]);
	const showUpload = false;
	const { data, status } = useQuery(
		['getClientsByPagination', '', onlyActive],
		getClientsByPagination,
	);
	const clients = useMemo(() => {
		if (data?.ok) {
			return mapClients(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, clients);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onUpload = () => inputRef.current?.click();

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
			{status === 'loading' && <PageLoader />}
			{status === 'success' && clients.length > 0 && (
				<PageBody>
					<PageActionBar justifyContent='space-between'>
						<div>
							<TableFilter value={query} onChange={onFilterChange} />
							<OnlyActiveFilter
								checked={onlyActive}
								onChange={onOnlyActiveChange}
							/>
						</div>
						<input
							ref={inputRef}
							className={classes.input}
							multiple
							type='file'
							onChange={() => {}}
						/>
						{showUpload && (
							<VolvoButton
								text='Carga Masiva'
								icon={<PublishIcon />}
								color='primary'
								onClick={onUpload}
							/>
						)}
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
