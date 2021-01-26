import { makeStyles } from '@material-ui/core';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { mapMenus, RoleColumn } from '../interfaces';
import { RoleForm } from 'common/validations/Role';
import RoleFormModal from '../RoleForm/RoleForm';
import { ACTIONS_STYLE } from 'common/constants';

interface RoleActionsProps {
	item: RoleColumn;
	onEdit: (data: RoleForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const RoleActions: React.FC<RoleActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const classes = useStyles();
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const { id, name, roleMenus } = item;
	const parsedItem = {
		...item,
		roleMenus: mapMenus(roleMenus),
	};
	return (
		<div className={classes.actionButtons}>
			<VolvoIconButton color='primary' onClick={() => setShowEdit(true)}>
				<CreateIcon />
			</VolvoIconButton>
			<VolvoIconButton color='error' onClick={() => setShowDelete(true)}>
				<DeleteIcon />
			</VolvoIconButton>
			{showEdit && (
				<RoleFormModal
					title='Editar Rol'
					show={showEdit}
					values={parsedItem as RoleForm}
					onClose={() => setShowEdit(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDelete && (
				<ConfirmationModal
					show={showDelete}
					id={id}
					title='Eliminar Rol'
					body={`¿Está seguro que desea eliminar el rol: ${name}?`}
					onClose={() => setShowDelete(false)}
					onConfirm={onDelete}
				/>
			)}
		</div>
	);
};

export default RoleActions;
