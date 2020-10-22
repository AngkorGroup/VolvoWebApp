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
import { CardType, CardTypeForm } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import ConfirmationModal from '../../../common/components/ConfirmationModal/ConfirmationModal';
import VolvoCard from '../../../common/components/VolvoCard/VolvoCard';

interface CardTypeRowProps {
	item: CardType;
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
		imgURL,
		createdAt,
		status,
		deletedAt,
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
					{imgURL && <VolvoCard isThumbnail title='' balance='' url={imgURL} />}
					{!imgURL && <VolvoCard isThumbnail title='' balance='' />}
				</TableCell>
				<TableCell>{createdAt}</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell>{deletedAt}</TableCell>
				<TableCell>
					{!deletedAt && (
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
			{!deletedAt && (
				<FormModal
					title='Editar Tipo de Tarjeta'
					show={showEditModal}
					values={item as CardTypeForm}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{!deletedAt && (
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
