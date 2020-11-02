import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { ClientUser } from '../interfaces';
import FormModal from '../FormModal/FormModal';

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
	const {
		id,
		documentType,
		documentNumber,
		type,
		phone,
		email,
		firstName,
		lastName,
	} = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setConfirmationVisible = (flag: boolean) => () =>
		setShowConfirmation(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{documentType}</TableCell>
				<TableCell>{documentNumber}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{email}</TableCell>
				<TableCell>
					{firstName} {lastName}
				</TableCell>
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
				id={`${id}`}
				title='Convertir a Usuario'
				body='¿Está seguro que desea convertir a usuario el siguiente contacto?'
				onClose={setConfirmationVisible(false)}
				onConfirm={onTurnUser}
			/>
		</React.Fragment>
	);
};

export default ClientUserRow;
