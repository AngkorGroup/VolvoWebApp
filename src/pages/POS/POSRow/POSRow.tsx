import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import VolvoIconButton from '../../../common/components/VolvoIconButton/VolvoIconButton';
import { POS, POSForm } from '../interfaces';
import FormModal from '../FormModal.tsx/FormModal';
import ConfirmationModal from '../../../common/components/ConfirmationModal/ConfirmationModal';

interface POSRowProps {
	item: POS;
	onEdit: (data: POSForm) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		actionButtons: {
			display: 'flex',
			justifyContent: 'space-evenly',
		},
	}),
);

const POSRow = ({ item, onEdit, onDelete }: POSRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { dealer, id, code, phone } = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					{dealer.code} - {dealer.name}
				</TableCell>
				<TableCell>{code}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>
					<div className={classes.actionButtons}>
						<VolvoIconButton
							color='primary'
							onClick={setEditModalVisible(true)}
						>
							<CreateIcon />
						</VolvoIconButton>
						<VolvoIconButton color='error' onClick={setDelModalVisible(true)}>
							<DeleteIcon />
						</VolvoIconButton>
					</div>
				</TableCell>
			</TableRow>
			<FormModal
				title='Editar POS'
				show={showEditModal}
				values={item}
				onClose={setEditModalVisible(false)}
				onConfirm={onEdit}
			/>
			<ConfirmationModal
				show={showDeleteModal}
				id={id}
				title='Eliminar POS'
				body={`¿Está seguro que desea eliminar el POS ${phone}?`}
				onClose={setDelModalVisible(false)}
				onConfirm={onDelete}
			/>
		</React.Fragment>
	);
};

export default POSRow;
