import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import { User, UserPOSForm } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import POSModal from '../POSModal/POSModal';
import CardsModal from '../CardsModal/CardsModal';
import ConfirmationModal from '../../../common/components/ConfirmationModal/ConfirmationModal';

interface UserRowProps {
	item: User;
	onEdit: (data: User) => void;
	onReestablishPassword: (id: string) => void;
	onAssociatePOS: (data: UserPOSForm) => void;
	onDelete: (id: string) => void;
}

const UserRow = ({
	item,
	onEdit,
	onReestablishPassword,
	onAssociatePOS,
	onDelete,
}: UserRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);
	const [showCardsModal, setShowCardsModal] = useState(false);
	const [showPOSModal, setShowPOSModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, email, phone, createdAt, type, status, deletedAt } = item;
	const isCashier = type === 'App Cajero';

	const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const onCloseMenu = () => setAnchorEl(null);

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setPassModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPassModal(flag));
	const setCardsModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowCardsModal(flag));
	const setPOSModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPOSModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{id}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>{email}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{createdAt}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell>{deletedAt}</TableCell>
				<TableCell align='center'>
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
						{!deletedAt && (
							<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
						)}
						{!deletedAt && (
							<MenuItem onClick={setPassModalVisible(true)}>
								Restablecer contraseña
							</MenuItem>
						)}
						{!deletedAt && (
							<MenuItem onClick={setCardsModalVisible(true)}>
								Consultar tarjetas
							</MenuItem>
						)}
						{!deletedAt && isCashier && (
							<MenuItem onClick={setPOSModalVisible(true)}>
								Asociar POS
							</MenuItem>
						)}
						{!deletedAt && (
							<MenuItem onClick={setDelModalVisible(true)}>
								Dar de baja
							</MenuItem>
						)}
						{!!deletedAt && (
							<MenuItem onClick={onCloseMenu}>Dar de alta</MenuItem>
						)}
					</Menu>
				</TableCell>
			</TableRow>
			{!deletedAt && (
				<React.Fragment>
					<FormModal
						title='Editar Usuario'
						show={showEditModal}
						values={item}
						onClose={setEditModalVisible(false)}
						onConfirm={onEdit}
					/>
					<ConfirmationModal
						show={showPassModal}
						id={id}
						title='Restablecer Contraseña'
						body='¿Está seguro que desea restablecer la contraseña para el siguiente usuario?'
						onClose={setPassModalVisible(false)}
						onConfirm={onReestablishPassword}
					/>
					<CardsModal
						show={showCardsModal}
						id={id}
						onClose={setCardsModalVisible(false)}
					/>
					<POSModal
						show={showPOSModal}
						id={id}
						onClose={setPOSModalVisible(false)}
						onConfirm={onAssociatePOS}
					/>
					<ConfirmationModal
						show={showDeleteModal}
						id={id}
						title='Desactivar Usuario'
						body='¿Está seguro que desea desactivar el siguiente usuario?'
						onClose={setDelModalVisible(false)}
						onConfirm={onDelete}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default UserRow;
