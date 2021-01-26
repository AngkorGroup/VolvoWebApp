import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { buildAlertBody as at } from 'common/utils';
import AccountFormModal from './AccountFormModal/AccountFormModal';
import { useQuery } from 'react-query';
import {
	addBankAccount,
	deleteBankAccount,
	editBankAccount,
	getQueryVolvoAccounts,
} from 'common/services';
import { useAlert } from 'react-alert';
import AccountActions from './AccountActions/AccountActions';
import { ACTIONS_COLUMN_V2, mapAccounts } from 'common/constants';
import { AccountForm } from 'common/validations';
import { BANK_ACCOUNT_COLUMNS } from './columns';

export const renderCardColor = (color: string) => (
	<VolvoCard isThumbnail color={color} customStyle={{ margin: 'auto' }} />
);

const BankAccounts: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryVolvoAccounts', onlyActive],
		getQueryVolvoAccounts,
	);
	const cardTypes = useMemo(() => {
		if (data?.ok) {
			return mapAccounts(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAdd = async (form: AccountForm) => {
		const body = {
			account: form.account,
			cci: form.cci,
			currencyId: +form.currencyId,
			isDefault: form.isDefault,
			bankAccountTypeId: +form.bankAccountTypeId,
			bankId: +form.bankId,
		};
		const response = await addBankAccount(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Cuenta bancaria Agregada',
					'Se agregó una nueva cuenta bancaria correctamente',
				),
			);
		}
	};

	const onEdit = async (form: AccountForm) => {
		const body = {
			id: +form.id,
			account: form.account,
			cci: form.cci,
			currencyId: +form.currencyId,
			isDefault: form.isDefault,
			bankAccountTypeId: +form.bankAccountTypeId,
			bankId: +form.bankId,
		};
		const response = await editBankAccount(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Cuenta bancaria Editada',
					'Se editó una cuenta bancaria correctamente',
				),
			);
		}
	};

	const onDelete = async (id: string) => {
		const response = await deleteBankAccount(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Cuenta Bancaria Desactivada',
					'Se desactivó una cuenta bancaria correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...BANK_ACCOUNT_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<AccountActions
						item={cell?.row?.original}
						onEdit={onEdit}
						onDelete={onDelete}
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
				<PageTitle title='Cuentas Bancarias' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Tipos_de_tarjeta'
							columns={columns}
							data={cardTypes}
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
				<AccountFormModal
					title='Agregar Cuenta Bancaria'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAdd}
				/>
			)}
		</div>
	);
};

export default BankAccounts;
