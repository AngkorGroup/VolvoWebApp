import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
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
import DealerRow from './DealerRow/DealerRow';
import FormModal from './FormModal/FormModal';
import { TableDealer, mapDealers, DealerForm, mapDealer } from './interfaces';
import { DEALER_COLUMNS } from './columns';
import { buildAlertBody as at, Dealer, filterRows } from 'common/utils';
import { useQuery } from 'react-query';
import {
	addDealer,
	deleteDealer,
	editDealer,
	getDealers,
} from 'common/services';
import { useAlert } from 'react-alert';

const Dealers: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [onlyActive, setOnlyActive] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const [filtered, setFiltered] = useState<TableDealer[]>([]);
	const { data, status } = useQuery([onlyActive], getDealers);
	const dealers = useMemo(() => {
		if (data?.ok) {
			const rows = mapDealers(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

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
			const newData = mapDealer(response.data || ({} as Dealer));
			setFiltered((old) => [...old, newData]);
			alert.success(
				at('Dealer Agregado', 'Se agregó un nuevo dealer correctamente'),
			);
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
			const newData = mapDealer(response.data || ({} as Dealer));
			const newDealers = filtered.map((c) =>
				c.id === newData.id ? newData : c,
			);
			setFiltered(newDealers);
			alert.success(at('Dealer Editado', 'Se editó un dealer correctamente'));
		}
	};

	const onDeleteDealer = async (id: string) => {
		const response = await deleteDealer(id);
		if (response.ok) {
			const archiveAt = moment().format('DD/MM/YYYY h:mm:ss');
			const newRows = filtered.map((c) =>
				c.id === id ? { ...c, archiveAt } : c,
			);
			setFiltered(newRows);
			alert.success(
				at('Dealer Eliminado', 'Se eliminó un dealer correctamente'),
			);
		}
	};
	return (
		<div>
			<div>
				<PageTitle title='Dealers' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{dealers.length > 0 && (
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
