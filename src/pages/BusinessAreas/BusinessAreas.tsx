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
	addBusinessArea,
	deleteBusinessArea,
	editBusinessArea,
	getQueryBusinessAreas,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapBusinessAreas } from './interfaces';
import { BUSINESS_AREAS_COLUMNS } from './columns';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { BusinessAreaForm } from 'common/validations';
import FormModal from './FormModal/FormModal';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import BusinessActions from './BusinessActions/BusinessActions';

const BusinessAreas: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryBusinessAreas', onlyActive],
		getQueryBusinessAreas,
	);
	const businessAreas = useMemo(() => {
		if (data?.ok) {
			return mapBusinessAreas(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onAdd = async (form: BusinessAreaForm) => {
		const body = {
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await addBusinessArea(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Área de negocio Agregado',
					'Se agregó un área de negocio correctamente',
				),
			);
		}
	};

	const onEdit = async (form: BusinessAreaForm) => {
		const body = {
			id: form.id,
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await editBusinessArea(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Área de negocio Editado',
					'Se editó un área de negocio correctamente',
				),
			);
		}
	};

	const onDelete = async (id: string) => {
		const response = await deleteBusinessArea(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Área de negocio Eliminado',
					'Se eliminó un área de negocio correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...BUSINESS_AREAS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<BusinessActions
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
				<PageTitle title='Areas de negocio' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Area_de_negocio'
							columns={columns}
							data={businessAreas}
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
					title='Agregar Área de Negocio'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAdd}
				/>
			)}
		</div>
	);
};

export default BusinessAreas;
