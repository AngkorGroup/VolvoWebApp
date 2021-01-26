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
import { BankAccountTypeForm, mapBankAccountTypes } from './interfaces';
import { BANK_ACCOUNT_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
	addBankAccountTypes,
	deleteBankAccountType,
	editBankAccountType,
	getQueryBankAccountTypes,
} from 'common/services';
import { useAlert } from 'react-alert';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import BankAccountTypeActions from './BankAccountTypeActions/BankAccountTypeActions';

const Banks: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getBankAccountTypes', onlyActive],
		getQueryBankAccountTypes,
	);
	const bankAccountTypes = useMemo(() => {
		if (data?.ok) {
			return mapBankAccountTypes(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddBankAccountType = async (bankAccountType: BankAccountTypeForm) => {
		const body = {
			name: bankAccountType.name || '',
		};
		const response = await addBankAccountTypes(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Cuenta bancaria Agregada',
					'Se agregó un nuevo tipo de cuenta bancaria correctamente',
				),
			);
		}
	};

	const onEditBankAccountType = async (
		bankAccountType: BankAccountTypeForm,
	) => {
		const body = {
			id: parseInt(bankAccountType.id || '0', 10),
			name: bankAccountType.name || '',
		};
		const response = await editBankAccountType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Cuenta bancaria Editada',
					'Se editó un tipo de cuenta bancaria correctamente',
				),
			);
		}
	};

	const onDeleteBankAccountType = async (id: string) => {
		const response = await deleteBankAccountType(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Cuenta bancaria Eliminada',
					'Se eliminó un tipo de cuenta bancaria correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...BANK_ACCOUNT_TYPE_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<BankAccountTypeActions
						item={cell?.row?.original}
						onEdit={onEditBankAccountType}
						onDelete={onDeleteBankAccountType}
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
				<PageTitle title='Tipos de cuenta bancaria' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Tipo_de_cuenta_bancaria'
							columns={columns}
							data={bankAccountTypes}
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
					title='Agregar Tipo de Cuenta Bancaria'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddBankAccountType}
				/>
			)}
		</div>
	);
};

export default Banks;
