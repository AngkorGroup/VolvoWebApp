import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { BusinessAreaColumn } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import { ACTIONS_STYLE } from 'common/constants';

interface CardTypeActionsProps {
	item: BusinessAreaColumn;
	onEdit: (data: any) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const BusinessActions: React.FC<CardTypeActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, archiveAt } = item;

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
			{showEditModal && (
				<FormModal
					title='Editar Area de negocio'
					show={showEditModal}
					values={item as BusinessAreaColumn}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Area de negocio'
					body={`¿Está seguro que desea eliminar el tipo de documento?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default BusinessActions;
