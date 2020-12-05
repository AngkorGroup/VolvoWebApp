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
	addSector,
	deleteSector,
	editSector,
	getQuerySectors,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapSectors, SectorColumn } from './interfaces';
import { SECTORS_COLUMNS } from './columns';
import { filterRows, buildAlertBody as at } from 'common/utils';
import SectorRow from './SectorRow/SectorRow';
import { useAlert } from 'react-alert';
import { SectorForm } from 'common/validations/Sector';
import FormModal from './FormModal/FormModal';

const Sectors: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [filtered, setFiltered] = useState<SectorColumn[]>([]);
	const { data, status, refetch } = useQuery(
		['getQuerySectors', onlyActive],
		getQuerySectors,
	);
	const sectors = useMemo(() => {
		if (data?.ok) {
			const rows = mapSectors(data?.data || []);
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
		const filtered = filterRows(newQuery, sectors);
		setQuery(newQuery);
		setFiltered(filtered);
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

	return (
		<div>
			<div>
				<PageTitle title='Sector de cliente' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{sectors.length > 0 && (
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
									title='Agregar Sector de cliente'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAdd}
								/>
							)}
						</PageActionBar>
						{sectors.length > 0 && (
							<BasicTable columns={SECTORS_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<SectorRow
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

export default Sectors;
