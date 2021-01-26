import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { POS, POSForm } from '../interfaces';
import FormModal from '../FormModal.tsx/FormModal';

interface POSActionsProps {
	item: POS;
	onEdit: (data: POSForm) => void;
	onDelete: (id: string) => void;
	onResetPassword: (id: string) => void;
}

const POSActions: React.FC<POSActionsProps> = ({
	item,
	onEdit,
	onDelete,
	onResetPassword,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { id, userId, phone, archiveAt } = item;
	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setPassModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPassModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const onCloseMenu = () => setAnchorEl(null);
	return (
		<>
			{!archiveAt && (
				<VolvoIconButton
					aria-controls='options'
					aria-haspopup='true'
					color='primary'
					onClick={onOpenMenu}
				>
					<SettingsIcon />
				</VolvoIconButton>
			)}
			<Menu
				id='options'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={onCloseMenu}
			>
				<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
				<MenuItem onClick={setPassModalVisible(true)}>
					Restablecer contraseña
				</MenuItem>
				<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
			</Menu>
			{showEditModal && (
				<FormModal
					title='Editar POS'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showPassModal && (
				<ConfirmationModal
					show={showPassModal}
					id={userId}
					title='Restablecer Contraseña'
					body='¿Está seguro que desea restablecer la contraseña para el siguiente usuario?'
					onClose={setPassModalVisible(false)}
					onConfirm={onResetPassword}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar POS'
					body={`¿Está seguro que desea eliminar el POS ${phone}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default POSActions;
