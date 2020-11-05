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
import { Dealer, filterRows, Option, parseDealers } from 'common/utils';
import { mapCashiers, POS as POSType, POSForm } from './interfaces';
import POSRow from './POSRow/POSRow';
import FormModal from './FormModal.tsx/FormModal';
import AppContext from '../../AppContext';
import { POS_COLUMNS } from './columns';
import {
	addCashier,
	deleteCashier,
	editCashier,
	getCashiers,
	getDealersByFilter,
} from 'common/services';

const POS: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [dealer, setDealer] = useState<Dealer | null>(null);
	const [dealers, setDealers] = useState<Dealer[]>([]);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [posList, setPOSList] = useState<POSType[]>([]);
	const [filtered, setFiltered] = useState<POSType[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, posList);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onDealerChange = async (_: any, newValue: string | Option) => {
		setLoading(true);
		const dealerId = (newValue as Option).value;
		const selectedDealer = dealers.find((d) => `${d.id}` === dealerId) || null;
		setDealer(selectedDealer);
		const response = await getCashiers(dealerId);
		if (response.ok) {
			const rows = mapCashiers(response.data || []);
			setPOSList(rows);
			setFiltered(rows);
		}
		setLoading(false);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddPOS = async (pos: POSForm) => {
		const body = {
			dealerId: dealer?.id,
			firstName: pos.firstName,
			lastName: pos.lastName,
			email: pos.email,
			imei: pos.imei,
			phone: pos.phone,
			tpCode: pos.code,
		};
		const response = await addCashier(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Cajero Agregado',
				text:
					'Se ha creado un nuevo usuario cajero correctamente y las credenciales han llegado al correo indicado',
				status: 'success',
			});
		}
	};

	const onEditPOS = async (pos: POSForm) => {
		const body = {
			id: parseInt(pos.id || '0', 10),
			firstName: pos.firstName,
			lastName: pos.lastName,
			email: pos.email,
			imei: pos.imei,
			phone: pos.phone,
			tpCode: pos.code,
		};
		const response = await editCashier(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Cajero Editado',
				text: 'Se editó un POS correctamente',
				status: 'success',
			});
		}
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
			const data = response.data || [];
			setDealers(data);
		}
		setLoadingOptions(false);
	};

	return (
		<div>
			<div>
				<PageTitle title='POS' />
				<AsyncTypeAhead
					options={parseDealers(dealers)}
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
							{posList.length < (dealer?.maxCashiers || 0) && (
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
