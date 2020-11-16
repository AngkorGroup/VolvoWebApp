import MultiTypeAhead from 'common/components/MultiTypeAhead/MultiTypeAhead';
import { getQueryBusinessAreas } from 'common/services';
import { Option, parseCommonValue } from 'common/utils';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ReportMakerContext from '../ReportMakerContext';

const FilterBusinessArea = () => {
	const { updateState } = useContext(ReportMakerContext);
	const { data, status } = useQuery(
		['getQueryBusinessAreas', true],
		getQueryBusinessAreas,
	);
	const [businessAreas, setBusinessAreas] = useState<Option[]>([]);
	const businessAreaList = useMemo(() => {
		if (data?.ok) {
			return parseCommonValue(data?.data || []);
		}
		return [];
	}, [data]);

	const onChange = (_: any, values: Option[]) => {
		setBusinessAreas(values);
	};

	useEffect(() => {
		if (businessAreas && businessAreas.length > 0) {
			setBusinessAreas(businessAreas);
		}
	}, [businessAreas]);

	useEffect(() => {
		if (businessAreas && businessAreas.length > 0) {
			const ids = businessAreas.map((ct) => ct.value);
			updateState({ businessAreas: ids });
		}
	}, [businessAreas, updateState]);

	return (
		<MultiTypeAhead
			placeholder='Seleccione'
			label='Area de Negocio'
			onChange={onChange}
			loading={status === 'loading'}
			options={businessAreaList}
			value={businessAreas}
		/>
	);
};

export default FilterBusinessArea;
