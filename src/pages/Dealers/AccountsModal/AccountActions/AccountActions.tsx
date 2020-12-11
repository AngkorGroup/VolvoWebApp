import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import FormModal from '../FormModal/FormModal';
import { TableAccount } from 'common/constants';

interface AccountActionsProps {
	item: TableAccount;
	onEdit: (data: any) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const AccountActions: React.FC<AccountActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, archiveAt } = item;

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};

	const onOpenMenu = (event: Event) => setAnchorEl(event.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
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
						<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
					</Menu>
				</>
			)}
			{showEditModal && (
				<FormModal
					title='Editar Cuenta Bancaria'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Cuenta Bancaria'
					body='¿Está seguro que desea eliminar esta cuenta bancaria del dealer?'
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default AccountActions;
