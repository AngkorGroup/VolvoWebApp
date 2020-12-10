import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import {
	GenericTable,
	OnlyActiveFilter,
	PageLoader,
	PageTitle,
} from 'common/components';
import { mapClients } from './interface';
import { CLIENT_COLUMNS } from './columns';
import { getClientsByPagination } from 'common/services';

const Clients: React.FC = () => {
	const [onlyActive, setOnlyActive] = useState(true);
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

	return (
		<div>
			<div>
				<PageTitle title='Clientes' />
			</div>
			{status === 'loading' && <PageLoader />}
			{status === 'success' && clients.length > 0 && (
				<GenericTable
					filename='Clientes'
					columns={CLIENT_COLUMNS}
					data={clients}
					customFilters={
						<OnlyActiveFilter
							checked={onlyActive}
							onChange={(e: any) => setOnlyActive(e.target.checked)}
						/>
					}
				/>
			)}
		</div>
	);
};

export default Clients;
