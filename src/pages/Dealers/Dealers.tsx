import React, { useContext, useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import DealerRow from './DealerRow/DealerRow';
import FormModal from './FormModal/FormModal';
import { TableDealer, mapDealers, DealerForm } from './interfaces';
import AppContext from '../../AppContext';
import { DEALER_COLUMNS } from './columns';
import { Dealer, filterRows } from 'common/utils';
import { useQuery } from 'react-query';
import {
	addDealer,
	deleteDealer,
	editDealer,
	getDealers,
} from 'common/services';

const Dealers: React.FC = () => {
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [filtered, setFiltered] = useState<TableDealer[]>([]);
	const { addPageMessage } = useContext(AppContext);
	const { data, status } = useQuery('dealers', getDealers);
	const dealers = useMemo(() => {
		if (data?.ok) {
			const rows = mapDealers(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, dealers);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddDealer = async (dealer: DealerForm) => {
		const body: Partial<Dealer> = {
			name: dealer.name,
			ruc: dealer.ruc,
			contactName: dealer.ruc,
			address: dealer.address,
			phone: dealer.phone,
			tpCode: dealer.code,
			type: dealer.type,
			zone: dealer.zone,
			maxCashiers: dealer.maxCashiers,
		};
		const response = await addDealer(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Dealer Agregado',
				text: 'Se agregó un nuevo dealer correctamente',
				status: 'success',
			});
		}
	};

	const onEditDealer = async (dealer: DealerForm) => {
		const body: Partial<Dealer> = {
			id: parseInt(dealer.id || '0', 10),
			name: dealer.name,
			ruc: dealer.ruc,
			address: dealer.address,
			phone: dealer.phone,
			tpCode: dealer.code,
			type: dealer.type,
			zone: dealer.zone,
			maxCashiers: dealer.maxCashiers,
		};
		const response = await editDealer(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Dealer Editado',
				text: 'Se editó un dealer correctamente',
				status: 'success',
			});
		}
	};

	const onDeleteDealer = async (id: string) => {
		const response = await deleteDealer(id);
		if (response.ok) {
			addPageMessage!({
				title: 'Dealer Eliminado',
				text: 'Se eliminó un dealer correctamente',
				status: 'success',
			});
		}
	};
	return (
		<div>
			<div>
				<PageTitle title='Dealers' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && dealers.length > 0 && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							<FormModal
								title='Agregar Dealer'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddDealer}
							/>
						</PageActionBar>
						<BasicTable columns={DEALER_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<DealerRow
										key={i}
										item={item}
										onEdit={onEditDealer}
										onDelete={onDeleteDealer}
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

export default Dealers;
