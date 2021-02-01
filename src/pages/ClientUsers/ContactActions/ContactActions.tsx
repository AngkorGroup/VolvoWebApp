import { makeStyles } from '@material-ui/core';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ContactColumn } from '../interfaces';
import ContactFormModal from '../ContactFormModal/ContactFormModal';
import { ACTIONS_STYLE } from 'common/constants';
import { ClientUserForm } from 'common/validations';
import { ContactTypeKey } from 'common/utils';

interface ContactActionsProps {
	item: ContactColumn;
	onEdit: (data: ClientUserForm) => void;
	onTurnUser: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const ContactActions: React.FC<ContactActionsProps> = ({
	item,
	onEdit,
	onTurnUser,
}) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const { id, type, archiveAt } = item;
	return (
		<>
			{!archiveAt && (
				<div className={classes.actionButtons}>
					<VolvoIconButton
						color='primary'
						onClick={() => setShowEditModal(true)}
					>
						<CreateIcon />
					</VolvoIconButton>
					{type !== ContactTypeKey.Primary && (
						<VolvoIconButton
							color='info'
							title='Establecer como usuario principal'
							onClick={() => setShowConfirmation(true)}
						>
							<AccountCircleIcon />
						</VolvoIconButton>
					)}
					{showEditModal && (
						<ContactFormModal
							title='Editar Contacto'
							show={showEditModal}
							values={item as ClientUserForm}
							onClose={() => setShowEditModal(false)}
							onConfirm={onEdit}
						/>
					)}
					{showConfirmation && (
						<ConfirmationModal
							show={showConfirmation}
							id={`${id || ''}`}
							title='Convertir a Usuario'
							body='¿Está seguro que desea convertir a usuario el siguiente contacto?'
							onClose={() => setShowConfirmation(false)}
							onConfirm={onTurnUser}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default ContactActions;
