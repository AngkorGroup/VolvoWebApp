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
import { BankForm, mapBanks } from './interfaces';
import { BANK_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import { addBank, deleteBank, editBank, getQueryBank } from 'common/services';
import { useAlert } from 'react-alert';
import BankActions from './BankActions/BankActions';
import { ACTIONS_COLUMN_V2 } from 'common/constants';

const Banks: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryBank', onlyActive],
		getQueryBank,
	);
	const banks = useMemo(() => {
		if (data?.ok) {
			return mapBanks(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddBank = async (bank: BankForm) => {
		const body = {
			name: bank.name || '',
			abbreviation: bank.abbreviation || '',
			tpCode: bank.tpCode || '',
		};
		const response = await addBank(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Banco Agregado', 'Se agregó un nuevo banco correctamente'),
			);
		}
	};

	const onEditBank = async (bank: BankForm) => {
		const body = {
			id: parseInt(bank.id || '0', 10),
			name: bank.name || '',
			abbreviation: bank.abbreviation || '',
			tpCode: bank.tpCode || '',
		};
		const response = await editBank(body);
		if (response.ok) {
			refetch();
			alert.success(at('Banco Editado', 'Se editó un banco correctamente'));
		}
	};

	const onDeleteBank = async (id: string) => {
		const response = await deleteBank(id);
		if (response.ok) {
			refetch();
			alert.success(at('Banco Eliminado', 'Se eliminó un banco correctamente'));
		}
	};

	const columns = useMemo(
		() => [
			...BANK_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<BankActions
						item={cell?.row?.original}
						onEdit={onEditBank}
						onDelete={onDeleteBank}
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
				<PageTitle title='Bancos' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Bancos'
							columns={columns}
							data={banks}
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
					title='Agregar Bancos'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddBank}
				/>
			)}
		</div>
	);
};

export default Banks;
