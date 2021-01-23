import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { BankForm, TableBank } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import { ACTIONS_STYLE } from 'common/constants';

interface CardTypeActionsProps {
	item: TableBank;
	onEdit: (data: BankForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const BankActions: React.FC<CardTypeActionsProps> = ({
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
					title='Editar Banco'
					show={showEditModal}
					values={item as BankForm}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{!archiveAt && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Banco'
					body={`¿Está seguro que desea eliminar el banco ${name}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default BankActions;
