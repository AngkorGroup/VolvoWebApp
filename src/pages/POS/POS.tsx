import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	AsyncTypeAhead,
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import {
	buildAlertBody as at,
	Dealer,
	Option,
	parseDealers,
} from 'common/utils';
import { mapCashiers, POSForm } from './interfaces';
import FormModal from './FormModal/FormModal';
import POSActions from './POSActions/POSActions';
import { POS_COLUMNS } from './columns';
import {
	addCashier,
	deleteCashier,
	editCashier,
	getQueryDealerCashiers,
	getQueryDealers,
} from 'common/services';
import { useAlert } from 'react-alert';
import { resetUser } from 'common/services';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import { useQuery } from 'react-query';

const initialData: any = { data: [] };

const POS: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [dealer, setDealer] = useState<Dealer | null>(null);
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data: dataDealers, isLoading: loadingOptions } = useQuery(
		['getQueryDealers', query, onlyActive],
		getQueryDealers,
	);
	const dealers = useMemo(() => {
		if (dataDealers?.ok) {
			return dataDealers?.data;
		}
		return [];
	}, [dataDealers]);
	const { data: dataCashiers, isLoading: loading, refetch } = useQuery(
		['getQueryDealerCashiers', `${dealer?.id}`, onlyActive],
		getQueryDealerCashiers,
		{ initialData: dealer?.id ? undefined : initialData },
	);
	const posList = useMemo(() => {
		if (dataCashiers?.ok) {
			return mapCashiers(dataCashiers?.data || []);
		}
		return [];
	}, [dataCashiers]);

	const onDealerChange = (_: any, newValue: string | Option) => {
		const dealerId = (newValue as Option).value;
		const selectedDealer = dealers?.find((d) => `${d.id}` === dealerId) || null;
		setDealer(selectedDealer);
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
			tpCode: pos.tpCode,
		};
		const response = await addCashier(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Cajero Agregado',
					'Se ha creado un nuevo usuario cajero correctamente y las credenciales han llegado al correo indicado',
				),
			);
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
			tpCode: pos.tpCode,
		};
		const response = await editCashier(body);
		if (response.ok) {
			refetch();
			alert.success(at('Cajero Editado', 'Se editó un cajero correctamente'));
		}
	};

	const onDeletePOS = async (id: string) => {
		const response = await deleteCashier(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cajero Eliminado', 'Se eliminó un cajero correctamente'),
			);
		}
	};

	const onReestablishPassword = async (id: string) => {
		const response = await resetUser(id);
		if (response.ok) {
			alert.success(
				at(
					'Contraseña restablecida',
					`Se restableció la contraseña del usuario con id: ${id}`,
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...POS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<POSActions
						item={cell?.row?.original}
						onEdit={onEditPOS}
						onDelete={onDeletePOS}
						onResetPassword={onReestablishPassword}
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
				<PageTitle title='POS' />
				<AsyncTypeAhead
					options={parseDealers(dealers || [])}
					placeholder='Dealer'
					loading={loadingOptions}
					onChange={onDealerChange}
					onType={(e: any) => setQuery(e.target.value)}
				/>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && (
					<GenericTable
						filename={`POS ${dealer?.id}`}
						columns={columns}
						data={posList}
						customFilters={
							<OnlyActiveFilter
								checked={onlyActive}
								onChange={(e: any) => setOnlyActive(e.target.checked)}
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
					title='Agregar POS'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddPOS}
				/>
			)}
		</div>
	);
};

export default POS;
