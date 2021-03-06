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
import { BusinessAreaColumn } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import { ACTIONS_STYLE } from 'common/constants';

interface BusinessAreaRowProps {
	item: BusinessAreaColumn;
	onEdit: (data: any) => void;
	onDelete: (id: string) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		actionButtons: ACTIONS_STYLE,
	}),
);

const BusinessAreaRow = ({ item, onEdit, onDelete }: BusinessAreaRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, tpCode, status, archiveAt } = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{id}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>{tpCode}</TableCell>
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
		</React.Fragment>
	);
};

export default BusinessAreaRow;
