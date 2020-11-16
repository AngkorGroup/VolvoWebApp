import AsyncTypeAhead from 'common/components/AsyncTypeAhead/AsyncTypeAhead';
import { getQueryClients } from 'common/services';
import { Option, parseClients } from 'common/utils';
import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ReportMakerContext from '../ReportMakerContext';

const FilterClients = () => {
	const { updateState } = useContext(ReportMakerContext);
	const [query, setQuery] = useState('');
	const { data, status } = useQuery(
		['getQueryClients', query],
		getQueryClients,
	);
	const clients = useMemo(() => {
		if (data?.ok) {
			return parseClients(data?.data || [], true);
		}
		return [];
	}, [data]);

	const onTypeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const onClientChange = (_: any, newValue: string | Option) => {
		const clientId = (newValue as Option).value;
		updateState({ clientId });
	};

	return (
		<AsyncTypeAhead
			options={clients}
			placeholder='Cliente'
			loading={status === 'loading'}
			onChange={onClientChange}
			onType={onTypeClient}
		/>
	);
};

export default FilterClients;
