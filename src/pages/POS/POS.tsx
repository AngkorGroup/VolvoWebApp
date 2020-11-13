import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import {
	AsyncTypeAhead,
	BasicTable,
	OnlyActiveFilter,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import {
	buildAlertBody as at,
	Cashier,
	Dealer,
	filterRows,
	Option,
	parseDealers,
} from 'common/utils';
import { mapCashier, mapCashiers, POS as POSType, POSForm } from './interfaces';
import POSRow from './POSRow/POSRow';
import FormModal from './FormModal.tsx/FormModal';
import { POS_COLUMNS } from './columns';
import {
	addCashier,
	deleteCashier,
	editCashier,
	getCashiers,
	getDealersByFilter,
} from 'common/services';
import { useAlert } from 'react-alert';
import { resetUser } from 'common/services/Admins';

const POS: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [dealer, setDealer] = useState<Dealer | null>(null);
	const [dealers, setDealers] = useState<Dealer[]>([]);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(false);
	const [posList, setPOSList] = useState<POSType[]>([]);
	const [filtered, setFiltered] = useState<POSType[]>([]);
	const alert = useAlert();

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	useEffect(() => {
		const fetchDealers = async () => {
			setLoadingOptions(true);
			const response = await getDealersByFilter();
			if (response.ok) {
				const data = response.data || [];
				setDealers(data);
			}
			setLoadingOptions(false);
		};

		fetchDealers();
	}, []);

	useEffect(() => {
		const fetchCashiers = async () => {
			if (dealer) {
				setLoading(true);
				const dealerId = `${dealer.id}`;
				const response = await getCashiers(dealerId, onlyActive);
				if (response.ok) {
					const rows = mapCashiers(response.data || []);
					setPOSList(rows);
					setFiltered(rows);
				}
				setLoading(false);
			}
		};

		fetchCashiers();
	}, [onlyActive, dealer]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, posList);
		setQuery(newQuery);
		setFiltered(filtered);
	};

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
			setPOSList((old) => [...old, data]);
			setFiltered((old) => [...old, data]);
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
			const newCashiers = posList.map((c) => (c.id === data.id ? data : c));
			setPOSList(newCashiers);
			setFiltered(newCashiers);
			alert.success(at('Cajero Editado', 'Se editó un cajero correctamente'));
		}
	};

	const onDeletePOS = async (id: string) => {
		const response = await deleteCashier(id);
		if (response.ok) {
			const archiveAt = moment().format('DD/MM/YYYY h:mm:ss');
			const newRows = posList.map((c) =>
				c.id === id ? { ...c, archiveAt } : c,
			);
			setFiltered(newRows);
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
				{!loading && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{posList.length > 0 && (
								<div>
									<TableFilter value={query} onChange={onFilterChange} />
									<OnlyActiveFilter
										checked={onlyActive}
										onChange={onOnlyActiveChange}
									/>
								</div>
							)}
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
										onResetPassword={onReestablishPassword}
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
