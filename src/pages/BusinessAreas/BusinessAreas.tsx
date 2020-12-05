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
	addBusinessArea,
	deleteBusinessArea,
	editBusinessArea,
	getQueryBusinessAreas,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapBusinessAreas, BusinessAreaColumn } from './interfaces';
import { BUSINESS_AREAS_COLUMNS } from './columns';
import { filterRows, buildAlertBody as at } from 'common/utils';
import BusinessAreaRow from './BusinessAreaRow/BusinessAreaRow';
import { useAlert } from 'react-alert';
import { BusinessAreaForm } from 'common/validations';
import FormModal from './FormModal/FormModal';

const BusinessAreas: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [filtered, setFiltered] = useState<BusinessAreaColumn[]>([]);
	const { data, status, refetch } = useQuery(
		['getQueryBusinessAreas', onlyActive],
		getQueryBusinessAreas,
	);
	const businessAreas = useMemo(() => {
		if (data?.ok) {
			const rows = mapBusinessAreas(data?.data || []);
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
		const filtered = filterRows(newQuery, businessAreas);
		setQuery(newQuery);
		setFiltered(filtered);
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

	return (
		<div>
			<div>
				<PageTitle title='Areas de negocio' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{businessAreas.length > 0 && (
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
									title='Agregar Área de negocio'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAdd}
								/>
							)}
						</PageActionBar>
						{businessAreas.length > 0 && (
							<BasicTable columns={BUSINESS_AREAS_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<BusinessAreaRow
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

export default BusinessAreas;
