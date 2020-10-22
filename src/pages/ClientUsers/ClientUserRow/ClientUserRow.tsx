import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import { ClientUser } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import ConfirmationModal from '../../../common/components/ConfirmationModal/ConfirmationModal';

interface ClientUserRowProps {
	item: ClientUser;
	onEdit: (data: ClientUser) => void;
	onTurnUser: (id: string) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		actionButtons: {
			display: 'flex',
			justifyContent: 'space-evenly',
		},
	}),
);

const ClientUserRow = ({ item, onEdit, onTurnUser }: ClientUserRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const { id, documentNumber, type, phone, email, name } = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setConfirmationVisible = (flag: boolean) => () =>
		setShowConfirmation(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{documentNumber}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{email}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>
					<div className={classes.actionButtons}>
						<VolvoIconButton
							color='primary'
							onClick={setEditModalVisible(true)}
						>
							<CreateIcon />
						</VolvoIconButton>
						<VolvoIconButton
							color='info'
							title='Dar de alta como usuario'
							onClick={setConfirmationVisible(true)}
						>
							<AccountCircleIcon />
						</VolvoIconButton>
					</div>
				</TableCell>
			</TableRow>
			<FormModal
				title='Editar Contacto'
				show={showEditModal}
				values={item}
				onClose={setEditModalVisible(false)}
				onConfirm={onEdit}
			/>
			<ConfirmationModal
				show={showConfirmation}
				id={id}
				title='Convertir a Usuario'
				body='¿Está seguro que desea convertir a usuario el siguiente contacto?'
				onClose={setConfirmationVisible(false)}
				onConfirm={onTurnUser}
			/>
		</React.Fragment>
	);
};

export default ClientUserRow;
