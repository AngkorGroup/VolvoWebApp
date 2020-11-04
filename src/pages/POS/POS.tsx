import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	AsyncTypeAhead,
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import { filterRows, Option, parseDealers } from 'common/utils';
import { mapCashiers, POS as POSType, POSForm } from './interfaces';
import POSRow from './POSRow/POSRow';
import FormModal from './FormModal.tsx/FormModal';
import AppContext from '../../AppContext';
import { POS_COLUMNS } from './columns';
import {
	deleteCashier,
	getCashiers,
	getDealersByFilter,
} from 'common/services';

const POS: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [options, setOptions] = useState<Option[]>([]);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [posList, setPOSList] = useState<POSType[]>([]);
	const [filtered, setFiltered] = useState<POSType[]>([]);
	const { addPageMessage } = useContext(AppContext);
	const maxCashiers = 5;

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, posList);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onDealerChange = async (_: any, newValue: string | Option) => {
		setLoading(true);
		const dealerId = (newValue as Option).value;
		const response = await getCashiers(dealerId);
		if (response.ok) {
			const data = mapCashiers(response.data || []);
			setPOSList(data);
			setFiltered(data);
		}
		setLoading(false);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddPOS = (pos: POSForm) => {
		const newPOS = {
			id: '4',
			dealer: {
				code: '8000',
				name: 'AUTOMOTORES MOQUEGUA',
			},
		};
		const newPOSList = [...posList, { ...newPOS, ...pos } as POSType];
		setPOSList(newPOSList);
		setFiltered(newPOSList);
		// Perform API call
		addPageMessage!({
			title: 'POS Agregado',
			text: 'Se agregó un nuevo POS correctamente',
			status: 'success',
		});
	};

	const onEditPOS = (pos: POSForm) => {
		const newPOSList = posList.map((d) =>
			d.id === pos.id ? { ...d, ...pos } : d,
		);
		setPOSList(newPOSList);
		setFiltered(newPOSList);
		// Perform API call
		addPageMessage!({
			title: 'POS Editado',
			text: 'Se editó un POS correctamente',
			status: 'success',
		});
	};

	const onDeletePOS = async (id: string) => {
		const response = await deleteCashier(id);
		if (response.ok) {
			addPageMessage!({
				title: 'Cajero Eliminado',
				text: 'Se eliminó un cajero correctamente',
				status: 'success',
			});
		}
	};

	const onTypeDealer = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingOptions(true);
		const response = await getDealersByFilter(e.target.value);
		if (response.ok) {
			const data = parseDealers(response.data || []);
			setOptions(data);
		}
		setLoadingOptions(false);
	};

	return (
		<div>
			<div>
				<PageTitle title='POS' />
				<AsyncTypeAhead
					options={options}
					placeholder='Dealer'
					loading={loadingOptions}
					onChange={onDealerChange}
					onType={onTypeDealer}
				/>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && posList.length > 0 && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
							{posList.length < maxCashiers && (
								<React.Fragment>
									<VolvoButton
										text='Agregar'
										icon={<AddIcon />}
										color='primary'
										onClick={setAddModalVisible(true)}
									/>
									<FormModal
										title='Agregar POS'
										show={showAddModal}
										onClose={setAddModalVisible(false)}
										onConfirm={onAddPOS}
									/>
								</React.Fragment>
							)}
						</PageActionBar>
						<BasicTable columns={POS_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<POSRow
										key={i}
										item={item}
										onEdit={onEditPOS}
										onDelete={onDeletePOS}
									/>
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default POS;
