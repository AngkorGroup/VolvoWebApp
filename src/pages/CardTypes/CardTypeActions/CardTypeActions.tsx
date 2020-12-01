import { makeStyles } from '@material-ui/core';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardTypeForm, TableCardType } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface CardTypeActionsProps {
	item: TableCardType;
	onEdit: (data: CardTypeForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
});

const CardTypeActions: React.FC<CardTypeActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const classes = useStyles();
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const { id, type } = item;
	return (
		<div className={classes.actionButtons}>
			<VolvoIconButton color='primary' onClick={() => setShowEdit(true)}>
				<CreateIcon />
			</VolvoIconButton>
			<VolvoIconButton color='error' onClick={() => setShowDelete(true)}>
				<DeleteIcon />
			</VolvoIconButton>
			{showEdit && (
				<FormModal
					title='Editar Tipo de Tarjeta'
					show={showEdit}
					values={item as CardTypeForm}
					onClose={() => setShowEdit(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDelete && (
				<ConfirmationModal
					show={showDelete}
					id={id}
					title='Eliminar Tipo de Tarjeta'
					body={`¿Está seguro que desea eliminar el tipo de tarjeta ${type}?`}
					onClose={() => setShowDelete(false)}
					onConfirm={onDelete}
				/>
			)}
		</div>
	);
};

export default CardTypeActions;
