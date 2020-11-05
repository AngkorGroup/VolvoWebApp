import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { VolvoIconButton } from 'common/components';
import { DealerForm, TableDealer } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import DeleteModal from '../DeleteModal/DeleteModal';

interface DealerRowProps {
	item: TableDealer;
	onEdit: (data: DealerForm) => void;
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
		id,
		code,
		name,
		ruc,
		address,
		status,
		type,
		phone,
		zone,
		maxCashiers,
		archiveAt,
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
				<TableCell align='center'>{maxCashiers}</TableCell>
				<TableCell>{zone}</TableCell>
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
					title='Editar Dealer'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<DeleteModal
					show={showDeleteModal}
					id={id}
					name={name}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</React.Fragment>
	);
};

export default DealerRow;
