import MultiTypeAhead from 'common/components/MultiTypeAhead/MultiTypeAhead';
import { Option } from 'common/utils';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ReportMakerContext from '../ReportMakerContext';

interface FilterMultiSelectProps {
	label: string;
	param: string;
	getEndpoint: (k: string, active?: boolean) => Promise<any>;
	paramsEndpoint?: any[];
	parser: (v: any[], wa?: boolean) => Option[];
}

const FilterMultiSelect = ({
	label,
	param,
	getEndpoint,
	paramsEndpoint,
	parser,
}: FilterMultiSelectProps) => {
	const { updateState } = useContext(ReportMakerContext);
	const rest = paramsEndpoint || [];
	const { data, status } = useQuery([`get${param}`, ...rest], getEndpoint);
	const [values, setValues] = useState<Option[]>([]);
	const list = useMemo(() => {
		if (data?.ok) {
			return parser(data?.data || []);
		}
		return [];
	}, [data, parser]);

	const onChange = (_: any, options: Option[]) => {
		setValues(options);
	};

	useEffect(() => {
		if (values && values.length > 0) {
			setValues(values);
		}
	}, [values]);

	useEffect(() => {
		if (values && values.length > 0) {
			const ids = values.map((ct) => ct.value);
			updateState({ [param]: ids });
		}
	}, [values, updateState, param]);

	return (
		<MultiTypeAhead
			placeholder='Seleccione'
			label={label}
			onChange={onChange}
			loading={status === 'loading'}
			options={list}
			value={values}
		/>
	);
};

export default FilterMultiSelect;
