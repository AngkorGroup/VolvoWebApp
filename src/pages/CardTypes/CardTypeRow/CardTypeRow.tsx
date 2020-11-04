import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	ConfirmationModal,
	VolvoCard,
	VolvoIconButton,
} from 'common/components';
import { TableCardType, CardTypeForm } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface CardTypeRowProps {
	item: TableCardType;
	onEdit: (data: CardTypeForm) => void;
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

const CardTypeRow = ({ item, onEdit, onDelete }: CardTypeRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const {
		id,
		type,
		description,
		currency,
		term,
		color,
		createdAt,
		status,
		archiveAt,
	} = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{type}</TableCell>
				<TableCell>{description}</TableCell>
				<TableCell align='center'>{currency}</TableCell>
				<TableCell align='center'>{term}</TableCell>
				<TableCell align='center'>
					<VolvoCard isThumbnail title='' color={color} />
				</TableCell>
				<TableCell>{createdAt}</TableCell>
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
			{!archiveAt && (
				<FormModal
					title='Editar Tipo de Tarjeta'
					show={showEditModal}
					values={item as CardTypeForm}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{!archiveAt && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Eliminar Tipo de Tarjeta'
					body={`¿Está seguro que desea eliminar el tipo de tarjeta ${type}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</React.Fragment>
	);
};

export default CardTypeRow;
