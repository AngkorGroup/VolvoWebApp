import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
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
import { mapRechargeTypes } from './interfaces';
import { RECHARGE_TYPES_COLUMNS } from './columns';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { RechargeTypeForm } from 'common/validations';
import FormModal from './FormModal/FormModal';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import RechargeTypeActions from './RechargeTypeActions/RechargeTypeActions';

const RechargeTypes: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryRechargeTypes', onlyActive],
		getQueryRechargeTypes,
	);
	const rechargeTypes = useMemo(() => {
		if (data?.ok) {
			return mapRechargeTypes(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
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

	const columns = useMemo(
		() => [
			...RECHARGE_TYPES_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<RechargeTypeActions
						item={cell?.row?.original}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				),
			},
		],
		// eslint-disable-next-line
		[],
	);

	return (
		<div>
			<div>
				<PageTitle title='Tipos de Recarga' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Tipos_de_tarjeta'
							columns={columns}
							data={rechargeTypes}
							customFilters={
								<OnlyActiveFilter
									checked={onlyActive}
									onChange={onOnlyActiveChange}
								/>
							}
							rightButton={
								<VolvoButton
									text='Agregar'
									icon={<AddIcon />}
									color='primary'
									onClick={setAddModalVisible(true)}
								/>
							}
						/>
					</PageBody>
				)}
			</PageBody>
			{showAddModal && (
				<FormModal
					title='Agregar Tipo de Recarga'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAdd}
				/>
			)}
		</div>
	);
};

export default RechargeTypes;
