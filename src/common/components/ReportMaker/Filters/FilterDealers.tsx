import AsyncTypeAhead from 'common/components/AsyncTypeAhead/AsyncTypeAhead';
import { getQueryDealers } from 'common/services';
import { Option, parseDealers } from 'common/utils';
import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ReportMakerContext from '../ReportMakerContext';

const FilterDealers = () => {
	const { updateState } = useContext(ReportMakerContext);
	const [query, setQuery] = useState('');
	const { data, status } = useQuery(
		['getQueryDealers', query, true],
		getQueryDealers,
	);
	const dealers = useMemo(() => {
		if (data?.ok) {
			return parseDealers(data?.data || [], true);
		}
		return [];
	}, [data]);

	const onTypeDealer = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const onDealerChange = (_: any, newValue: string | Option) => {
		const dealerId = (newValue as Option).value;
		if (dealerId) {
			updateState({ dealerId });
		}
	};

	return (
		<AsyncTypeAhead
			options={dealers}
			placeholder='Dealer'
			loading={status === 'loading'}
			onChange={onDealerChange}
			onType={onTypeDealer}
		/>
	);
};

export default FilterDealers;
