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
import { SectorColumn } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface SectorRowProps {
	item: SectorColumn;
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

const SectorRow = ({ item, onEdit, onDelete }: SectorRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, name, tpCode,status, archiveAt } = item;

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
					title='Editar Sector de cliente'
					show={showEditModal}
					values={item as SectorColumn}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Sector de cliente'
					body={`¿Está seguro que desea eliminar el sector de cliente?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</React.Fragment>
	);
};

export default SectorRow;
