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
import { buildAlertBody as at } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { CurrencyForm, mapCurrencies } from './interfaces';
import { CURRENCY_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
	addCurrency,
	deleteCurrency,
	editCurrency,
	getNewQueryCurrencies,
} from 'common/services';
import { useAlert } from 'react-alert';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import CurrencyActions from './CurrencyActions/CurrencyActions';

const Currencies: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getCurrencies', onlyActive],
		getNewQueryCurrencies,
	);
	const currencies = useMemo(() => {
		if (data?.ok) {
			return mapCurrencies(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddCurrency = async (currency: CurrencyForm) => {
		const body = {
			name: currency.name || '',
			tpCode: currency.tpCode || '',
			abbreviation: currency.abbreviation || '',
			symbol: currency.symbol || '',
		};
		const response = await addCurrency(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Moneda Agregada', 'Se agregó una nueva moneda correctamente'),
			);
		}
	};

	const onEditCurrency = async (currency: CurrencyForm) => {
		const body = {
			id: parseInt(currency.id || '0', 10),
			name: currency.name || '',
			tpCode: currency.tpCode || '',
			abbreviation: currency.abbreviation || '',
			symbol: currency.symbol || '',
		};
		const response = await editCurrency(body);
		if (response.ok) {
			refetch();
			alert.success(at('Moneda Editada', 'Se editó una moneda correctamente'));
		}
	};

	const onDeleteCurrency = async (id: string) => {
		const response = await deleteCurrency(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Moneda Eliminada', 'Se eliminó una moneda correctamente'),
			);
		}
	};

	const columns = useMemo(
		() => [
			...CURRENCY_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<CurrencyActions
						item={cell?.row?.original}
						onEdit={onEditCurrency}
						onDelete={onDeleteCurrency}
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
				<PageTitle title='Monedas' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Monedas'
							columns={columns}
							data={currencies}
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
					title='Agregar Moneda'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddCurrency}
				/>
			)}
		</div>
	);
};

export default Currencies;
