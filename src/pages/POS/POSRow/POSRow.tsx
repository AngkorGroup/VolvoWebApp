import {
	createStyles,
	makeStyles,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { POS, POSForm } from '../interfaces';
import FormModal from '../FormModal.tsx/FormModal';

interface POSRowProps {
	item: POS;
	onEdit: (data: POSForm) => void;
	onDelete: (id: string) => void;
	onResetPassword: (id: string) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		actionButtons: {
			display: 'flex',
			justifyContent: 'space-evenly',
		},
	}),
);

const POSRow = ({ item, onEdit, onDelete, onResetPassword }: POSRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const {
		id,
		userId,
		tpCode,
		phone,
		email,
		imei,
		firstName,
		lastName,
		archiveAt,
	} = item;
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
		<React.Fragment>
			<TableRow>
				<TableCell>{imei}</TableCell>
				<TableCell>{tpCode}</TableCell>
				<TableCell>
					{firstName} {lastName}
				</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{email}</TableCell>
				<TableCell>{archiveAt}</TableCell>
				<TableCell align='center'>
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
				</TableCell>
			</TableRow>
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
		</React.Fragment>
	);
};

export default POSRow;
