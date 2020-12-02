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
import AddIcon from '@material-ui/icons/Add';
import {
	addRechargeType,
	deleteRechargeType,
	editRechargeType,
	getQueryRechargeTypes,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapRechargeTypes, RechargeTypeColumn } from './interfaces';
import { RECHARGE_TYPES_COLUMNS } from './columns';
import { filterRows, buildAlertBody as at } from 'common/utils';
import RechargeTypeRow from './RechargeTypeRow/RechargeTypeRow';
import { useAlert } from 'react-alert';
import { RechargeTypeForm } from 'common/validations/RechargeType';
import FormModal from './FormModal/FormModal';

const RechargeTypes: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [filtered, setFiltered] = useState<RechargeTypeColumn[]>([]);
	const { data, status, refetch } = useQuery(
		['getQueryRechargeTypes', onlyActive],
		getQueryRechargeTypes,
	);
	const rechargeTypes = useMemo(() => {
		if (data?.ok) {
			const rows = mapRechargeTypes(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, rechargeTypes);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onAdd = async (form: RechargeTypeForm) => {
		const body = {
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await addRechargeType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Recarga Agregado',
					'Se agregó un tipo de recarga correctamente',
				),
			);
		}
	};

	const onEdit = async (form: RechargeTypeForm) => {
		const body = {
			id: form.id,
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await editRechargeType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Recarga Editado',
					'Se editó un tipo de recarga correctamente',
				),
			);
		}
	};

	const onDelete = async (id: string) => {
		const response = await deleteRechargeType(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Recarga Eliminado',
					'Se eliminó un tipo de recarga correctamente',
				),
			);
		}
	};

	return (
		<div>
			<div>
				<PageTitle title='Tipos de Recarga' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{rechargeTypes.length > 0 && (
								<div>
									<TableFilter value={query} onChange={onFilterChange} />
									<OnlyActiveFilter
										checked={onlyActive}
										onChange={onOnlyActiveChange}
									/>
								</div>
							)}
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							{showAddModal && (
								<FormModal
									title='Agregar Tipo de Documento'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAdd}
								/>
							)}
						</PageActionBar>
						{rechargeTypes.length > 0 && (
							<BasicTable columns={RECHARGE_TYPES_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<RechargeTypeRow
											key={i}
											item={item}
											onEdit={onEdit}
											onDelete={onDelete}
										/>
									))}
								</React.Fragment>
							</BasicTable>
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default RechargeTypes;
