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
import { Dealer } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import DeleteModal from '../DeleteModal/DeleteModal';

interface DealerRowProps {
	item: Dealer;
	onEdit: (data: Dealer) => void;
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

const DealerRow = ({ item, onEdit, onDelete }: DealerRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const {
		code,
		name,
		ruc,
		address,
		status,
		type,
		phone,
		zone,
		maxCashiers,
	} = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
	const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{code}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>{ruc}</TableCell>
				<TableCell>{address}</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{zone}</TableCell>
				<TableCell>{maxCashiers}</TableCell>
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
				title='Editar Dealer'
				show={showEditModal}
				values={item}
				onClose={setEditModalVisible(false)}
				onConfirm={onEdit}
			/>
			<DeleteModal
				show={showDeleteModal}
				id={code}
				name={name}
				onClose={setDelModalVisible(false)}
				onConfirm={onDelete}
			/>
		</React.Fragment>
	);
};

export default DealerRow;
