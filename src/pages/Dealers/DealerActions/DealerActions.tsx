import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { DealerForm, TableDealer } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import AccountsModal from '../AccountsModal/AccountsModal';

interface DealerActionsProps {
	item: TableDealer;
	onEdit: (data: DealerForm) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const DealerActions: React.FC<DealerActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAccountsModal, setShowAccounts] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, archiveAt } = item;

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};
	const onOpenMenu = (e: Event) => setAnchorEl(e.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setAccountsVisible = (flag: boolean) =>
		withCloseMenu(() => setShowAccounts(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));
	return (
		<>
			{!archiveAt && (
				<>
					<VolvoIconButton
						aria-controls='options'
						aria-haspopup='true'
						color='primary'
						onClick={onOpenMenu}
					>
						<SettingsIcon />
					</VolvoIconButton>
					<Menu
						id='options'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={onCloseMenu}
					>
						<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
						<MenuItem onClick={setAccountsVisible(true)}>
							Cuentas Bancarias
						</MenuItem>
						<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
					</Menu>
				</>
			)}
			{showEditModal && (
				<FormModal
					title='Editar Dealer'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showAccountsModal && (
				<AccountsModal
					show={showAccountsModal}
					id={id}
					onClose={setAccountsVisible(false)}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Dealer'
					body={`¿Está seguro que desea eliminar el dealer ${name}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default DealerActions;
