import React, { useContext, useEffect, useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import {
	AsyncTypeAhead,
	GenericTable,
	NoDealer,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import {
	buildAlertBody as at,
	Cashier,
	Dealer,
	Option,
	parseDealers,
} from 'common/utils';
import { mapCashier, mapCashiers, POS as POSType, POSForm } from './interfaces';
import FormModal from './FormModal.tsx/FormModal';
import { POS_COLUMNS } from './columns';
import {
	addCashier,
	deleteCashier,
	editCashier,
	getDealerCashiers,
	getDealersByFilter,
} from 'common/services';
import { useAlert } from 'react-alert';
import { resetUser } from 'common/services';
import AppContext from 'AppContext';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import POSActions from './POSActions/POSActions';

const POS: React.FC = () => {
	const { user } = useContext(AppContext);
	const [userHasDealer, setUserHasDealer] = useState(!!user?.dealerId);
	const [settingDealer, setSettingLoader] = useState(true);
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [dealer, setDealer] = useState<Dealer | null>(null);
	const [dealerValue, setDealerValue] = useState<Option | null>(null);
	const [dealers, setDealers] = useState<Dealer[]>([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [cashiers, setCashiers] = useState<POSType[]>([]);
	const alert = useAlert();

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	useEffect(() => {
		const fetchDealers = async () => {
			const response = await getDealersByFilter();
			if (response.ok) {
				const data = response.data || [];
				setDealers(data);
			}
		};

		fetchDealers();
	}, []);

	useEffect(() => {
		if (user) {
			if (!user.dealerId) {
				setUserHasDealer(false);
				return;
			}
			const curDealer = dealers.find((d) => d.id === user.dealerId);
			if (curDealer) {
				setDealer(curDealer);
				const parsedDealer = parseDealers([curDealer]);
				setDealerValue(parsedDealer[0]);
			}
		}
		setSettingLoader(false);
	}, [dealers, user]);

	useEffect(() => {
		const fetchCashiers = async () => {
			if (dealer) {
				setLoading(true);
				const dealerId = `${dealer.id}`;
				const response = await getDealerCashiers(dealerId, onlyActive);
				if (response.ok) {
					const rows = mapCashiers(response.data || []);
					setCashiers(rows);
				}
				setLoading(false);
			}
		};

		fetchCashiers();
	}, [onlyActive, dealer]);

	const onDealerChange = (_: any, newValue: string | Option) => {
		const dealerId = (newValue as Option).value;
		const selectedDealer = dealers.find((d) => `${d.id}` === dealerId) || null;
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
			const data = mapCashier(response.data || ({} as Cashier));
			setCashiers((old) => [data, ...old]);
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
			const data = mapCashier(response.data || ({} as Cashier));
			setCashiers((current) => {
				return current.map((c) => (c.id === data.id ? data : c));
			});
			alert.success(at('Cajero Editado', 'Se editó un cajero correctamente'));
		}
	};

	const onDeletePOS = async (id: string) => {
		const response = await deleteCashier(id);
		if (response.ok) {
			const archiveAt = moment().format('DD/MM/YYYY h:mm:ss');
			setCashiers((current) => {
				return current.map((c) => (c.id === id ? { ...c, archiveAt } : c));
			});
			alert.success(
				at('Cajero Eliminado', 'Se eliminó un cajero correctamente'),
			);
		}
	};

	const onReestablishPassword = async (id: string) => {
		setLoading(true);
		const response = await resetUser(id);
		setLoading(false);
		if (response.ok) {
			alert.success(
				at(
					'Contraseña restablecida',
					`Se restableció la contraseña del usuario con id: ${id}`,
				),
			);
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

	if (!userHasDealer) {
		return <NoDealer />;
	}

	return (
		<div>
			{settingDealer && <PageLoader />}
			{!settingDealer && (
				<>
					<div>
						<PageTitle title='POS' />
						<AsyncTypeAhead
							options={parseDealers(dealers)}
							placeholder='Dealer'
							loading={loadingOptions}
							onChange={onDealerChange}
							onType={onTypeDealer}
							disabled={!!user?.dealerId}
							value={dealerValue}
						/>
					</div>
					<PageBody>
						{loading && <PageLoader />}
						{!loading && (
							<GenericTable
								filename='Cajeros'
								columns={columns}
								data={cashiers}
								customFilters={
									<OnlyActiveFilter
										checked={onlyActive}
										onChange={onOnlyActiveChange}
									/>
								}
								rightButton={
									cashiers.length < (dealer?.maxCashiers || 0) && (
										<VolvoButton
											text='Agregar'
											icon={<AddIcon />}
											color='primary'
											onClick={setAddModalVisible(true)}
										/>
									)
								}
							/>
						)}
						{showAddModal && (
							<FormModal
								title='Agregar POS'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddPOS}
							/>
						)}
					</PageBody>
				</>
			)}
		</div>
	);
};

export default POS;
