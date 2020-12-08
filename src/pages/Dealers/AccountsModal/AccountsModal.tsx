import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
	BasicTable,
	OnlyActiveFilter,
	PageActionBar,
	PageLoader,
	VolvoButton,
} from 'common/components';
import { getQueryDealerAccounts } from 'common/services';
import React, { useMemo, useState } from 'react';
import { buildAlertBody as at } from 'common/utils';
import { useQuery } from 'react-query';
import { BankAccountForm, mapAccounts } from '../interfaces';
import { ACCOUNT_COLUMNS } from '../columns';
import AccountRow from './AccountRow/AccountRow';
import {
	addBankAccount,
	deleteBankAccount,
	editBankAccount,
} from 'common/services';
import FormModal from './FormModal/FormModal';
import { useAlert } from 'react-alert';

interface AccountsModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const AccountsModal: React.FC<AccountsModalProps> = ({ show, id, onClose }) => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryDealerAccounts', id, onlyActive],
		getQueryDealerAccounts,
	);
	const accounts = useMemo(() => {
		if (data?.ok) {
			return mapAccounts(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddAccount = async (form: BankAccountForm) => {
		const body = {
			account: form.account,
			cci: form.cci,
			currencyId: +form.currencyId,
			isDefault: form.isDefault,
			bankAccountTypeId: +form.bankAccountTypeId,
			bankId: +form.bankId,
			dealerId: +id,
		};
		const response = await addBankAccount(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cuenta Agregada', 'Se agregó una nueva cuenta correctamente'),
			);
		} else {
			alert.error(
				at(
					'Cuenta No Agregada',
					'Ocurrió un error al agregar, intente más tarde',
				),
			);
		}
	};

	const onEditAccount = async (form: BankAccountForm) => {
		const body = {
			id: +(form.id || '0'),
			account: form.account,
			cci: form.cci,
			currencyId: +form.currencyId,
			isDefault: form.isDefault,
			bankAccountTypeId: +form.bankAccountTypeId,
			bankId: +form.bankId,
			dealerId: +id,
		};
		const response = await editBankAccount(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cuenta Editada', 'Se editó la cuenta bancaria correctamente'),
			);
		} else {
			alert.error(
				at(
					'Cuenta No Editada',
					'Ocurrió un error al agregar, intente más tarde',
				),
			);
		}
	};

	const onDeleteAccount = async (id: string) => {
		const response = await deleteBankAccount(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cuenta Eliminada', 'Se eliminó una cuenta correctamente'),
			);
		}
	};
	return (
		<Dialog fullWidth maxWidth='xl' open={show} onClose={onClose}>
			<DialogTitle id='form-dialog-title'>Cuentas Bancarias</DialogTitle>
			<DialogContent>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<OnlyActiveFilter
								checked={onlyActive}
								onChange={onOnlyActiveChange}
							/>
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							{showAddModal && (
								<FormModal
									title='Agregar Cuenta Bancaria'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAddAccount}
								/>
							)}
						</PageActionBar>
						<BasicTable columns={ACCOUNT_COLUMNS}>
							<React.Fragment>
								{accounts.map((item, i: number) => (
									<AccountRow
										key={i}
										item={item}
										onEdit={onEditAccount}
										onDelete={onDeleteAccount}
									/>
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default AccountsModal;
