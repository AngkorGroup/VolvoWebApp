import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import FormModal from './FormModal/FormModal';
import { mapDealers, DealerForm } from './interfaces';
import { DEALER_COLUMNS } from './columns';
import { buildAlertBody as at, Dealer } from 'common/utils';
import { useQuery } from 'react-query';
import {
	addDealer,
	deleteDealer,
	editDealer,
	getDealers,
} from 'common/services';
import { useAlert } from 'react-alert';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import DealerActions from './DealerActions/DealerActions';

const Dealers: React.FC = () => {
	const alert = useAlert();
	const [onlyActive, setOnlyActive] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const { data, status, refetch } = useQuery([onlyActive], getDealers);
	const dealers = useMemo(() => {
		if (data?.ok) {
			return mapDealers(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
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
			refetch();
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
			refetch();
			alert.success(at('Dealer Editado', 'Se editó un dealer correctamente'));
		}
	};

	const onDeleteDealer = async (id: string) => {
		const response = await deleteDealer(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Dealer Eliminado', 'Se eliminó un dealer correctamente'),
			);
		}
	};

	const columns = useMemo(
		() => [
			...DEALER_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<DealerActions
						item={cell?.row?.original}
						onEdit={onEditDealer}
						onDelete={onDeleteDealer}
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
				<PageTitle title='Dealers' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable
						filename='Dealers'
						columns={columns}
						data={dealers}
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
				)}
			</PageBody>
			{showAddModal && (
				<FormModal
					title='Agregar Dealer'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddDealer}
				/>
			)}
		</div>
	);
};

export default Dealers;
