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
	addSector,
	deleteSector,
	editSector,
	getQuerySectors,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapSectors } from './interfaces';
import { SECTORS_COLUMNS } from './columns';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { SectorForm } from 'common/validations';
import FormModal from './FormModal/FormModal';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import SectorActions from './SectorActions/SectorActions';

const Sectors: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQuerySectors', onlyActive],
		getQuerySectors,
	);
	const sectors = useMemo(() => {
		if (data?.ok) {
			return mapSectors(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onAdd = async (form: SectorForm) => {
		const body = {
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await addSector(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Sector de cliente Agregado',
					'Se agregó un sector de cliente correctamente',
				),
			);
		}
	};

	const onEdit = async (form: SectorForm) => {
		const body = {
			id: form.id,
			name: form.name,
			tpCode: form.tpCode,
		};
		const response = await editSector(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Sector de cliente Editado',
					'Se editó un sector de cliente correctamente',
				),
			);
		}
	};

	const onDelete = async (id: string) => {
		const response = await deleteSector(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Sector de cliente Eliminado',
					'Se eliminó un sector de cliente correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...SECTORS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<SectorActions
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
				<PageTitle title='Sector de cliente' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Sectores'
							columns={columns}
							data={sectors}
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
					title='Agregar Sector'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAdd}
				/>
			)}
		</div>
	);
};

export default Sectors;
