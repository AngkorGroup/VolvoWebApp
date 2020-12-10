import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { User, UserForm } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import CardsModal from '../CardsModal/CardsModal';
import { UserType } from 'common/utils';

interface UserActionsProps {
	item: User;
	onEdit: (data: UserForm) => void;
	onReestablishPassword: (id: string) => void;
	onSelectContact: (id: string, contactId: string) => void;
	onDelete: (id: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
	item,
	onEdit,
	onReestablishPassword,
	onSelectContact,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);
	const [showCardsModal, setShowCardsModal] = useState(false);
	const [showContactModal, setShowContactModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, innerId, clientId, type, archiveAt } = item;
	const isAdmin = type === UserType.WebAdmin;
	const isContact = type === UserType.Contacto;
	const isCashier = type === UserType.Cajero;

	const withCloseMenu = (func: () => void) => () => {
		func();
		setAnchorEl(null);
	};

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setPassModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPassModal(flag));
	const setCardsModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowCardsModal(flag));
	const setContactModal = (flag: boolean) =>
		withCloseMenu(() => setShowContactModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	const setDeleteModal = isContact ? setContactModal : setDelModalVisible;
	return (
		<>
			{!archiveAt && (
				<VolvoIconButton
					aria-controls='options'
					aria-haspopup='true'
					color='primary'
					onClick={(e: any) => setAnchorEl(e.currentTarget)}
				>
					<SettingsIcon />
				</VolvoIconButton>
			)}
			<Menu
				id='options'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				{isAdmin && (
					<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
				)}
				{(isAdmin || isCashier) && (
					<MenuItem onClick={setPassModalVisible(true)}>
						Restablecer contraseña
					</MenuItem>
				)}
				{isContact && (
					<MenuItem onClick={setCardsModalVisible(true)}>
						Consultar tarjetas
					</MenuItem>
				)}
				<MenuItem onClick={setDeleteModal(true)}>Dar de baja</MenuItem>
			</Menu>
			{!archiveAt && (
				<>
					{showEditModal && (
						<FormModal
							title='Editar Usuario'
							show={showEditModal}
							values={item}
							onClose={setEditModalVisible(false)}
							onConfirm={onEdit}
						/>
					)}
					<ConfirmationModal
						show={showPassModal}
						id={id}
						title='Restablecer Contraseña'
						body='¿Está seguro que desea restablecer la contraseña para el siguiente usuario?'
						onClose={setPassModalVisible(false)}
						onConfirm={onReestablishPassword}
					/>
					{showCardsModal && (
						<CardsModal
							show={showCardsModal}
							id={innerId}
							onClose={setCardsModalVisible(false)}
						/>
					)}
					{showContactModal && (
						<DeleteModal
							show={showContactModal}
							clientId={clientId}
							id={id}
							onClose={setContactModal(false)}
							onConfirm={onSelectContact}
						/>
					)}
					{showDeleteModal && (
						<ConfirmationModal
							show={showDeleteModal}
							id={id}
							title='Desactivar Usuario'
							body='¿Está seguro que desea desactivar el siguiente usuario?'
							onClose={setDelModalVisible(false)}
							onConfirm={onDelete}
						/>
					)}
				</>
			)}
		</>
	);
};

export default UserActions;
