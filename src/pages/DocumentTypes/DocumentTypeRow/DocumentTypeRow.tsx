import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { DocumentTypeColumn } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface DocumentTypeRowProps {
	item: DocumentTypeColumn;
	onEdit: (data: any) => void;
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

const DocumentTypeRow = ({ item, onEdit, onDelete }: DocumentTypeRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, tpCode, abbreviation, sunatCode, status, archiveAt } = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{id}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>{tpCode}</TableCell>
				<TableCell>{abbreviation}</TableCell>
				<TableCell>{sunatCode}</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell>{archiveAt}</TableCell>
				<TableCell>
					{!archiveAt && (
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
					)}
				</TableCell>
			</TableRow>
			{showEditModal && (
				<FormModal
					title='Editar Tipo de Documento'
					show={showEditModal}
					values={item as DocumentTypeColumn}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Tipo de Documento'
					body={`¿Está seguro que desea eliminar el tipo de documento?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</React.Fragment>
	);
};

export default DocumentTypeRow;
