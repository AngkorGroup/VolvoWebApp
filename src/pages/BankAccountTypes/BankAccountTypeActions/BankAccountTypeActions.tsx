import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { BankAccountTypeForm, TableBankAccountType } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import { ACTIONS_STYLE } from 'common/constants';

interface CardTypeActionsProps {
	item: TableBankAccountType;
	onEdit: (data: BankAccountTypeForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const BankAccountTypeActions: React.FC<CardTypeActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, archiveAt } = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<>
			{!archiveAt && (
				<div className={classes.actionButtons}>
					<VolvoIconButton color='primary' onClick={setEditModalVisible(true)}>
						<CreateIcon />
					</VolvoIconButton>
					<VolvoIconButton color='error' onClick={setDelModalVisible(true)}>
						<DeleteIcon />
					</VolvoIconButton>
				</div>
			)}
			{!archiveAt && (
				<FormModal
					title='Editar Tipo de cuenta bancaria'
					show={showEditModal}
					values={item as BankAccountTypeForm}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{!archiveAt && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Tipo de cuenta bancaria'
					body={`¿Está seguro que desea eliminar el tipo de cuenta bancaria ${name}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default BankAccountTypeActions;
