import { makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { ACTIONS_STYLE, TableAccount } from 'common/constants';
import { AccountForm } from 'common/validations';
import React, { useState } from 'react';
import AccountFormModal from '../AccountFormModal/AccountFormModal';

interface AccountActionsProps {
	item: TableAccount;
	onEdit: (data: AccountForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles({
	actionButtons: ACTIONS_STYLE,
});

const AccountActions: React.FC<AccountActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const classes = useStyles();
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const { id, archiveAt } = item;
	return (
		<>
			{!archiveAt && (
				<div className={classes.actionButtons}>
					<VolvoIconButton color='primary' onClick={() => setShowEdit(true)}>
						<CreateIcon />
					</VolvoIconButton>
					<VolvoIconButton color='error' onClick={() => setShowDelete(true)}>
						<DeleteIcon />
					</VolvoIconButton>
					{showEdit && (
						<AccountFormModal
							title='Editar Cuenta Bancaria'
							show={showEdit}
							values={item as AccountForm}
							onClose={() => setShowEdit(false)}
							onConfirm={onEdit}
						/>
					)}
					{showDelete && (
						<ConfirmationModal
							show={showDelete}
							id={id}
							title='Eliminar Cuenta Bancaria'
							body={`¿Está seguro que desea eliminar la siguiente cuenta bancaria?`}
							onClose={() => setShowDelete(false)}
							onConfirm={onDelete}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default AccountActions;
