import {
	createStyles,
	makeStyles,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import { VolvoIconButton } from 'common/components';
import { ClientUser } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface ClientUserRowProps {
	item: ClientUser;
	onEdit: (data: ClientUser) => void;
}

const useStyles = makeStyles(() =>
	createStyles({
		actionButtons: {
			display: 'flex',
			justifyContent: 'space-evenly',
		},
	}),
);

const ClientUserRow = ({ item, onEdit }: ClientUserRowProps) => {
	const classes = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);
	const {
		documentType,
		documentNumber,
		type,
		phone,
		email,
		firstName,
		lastName,
		status,
	} = item;

	const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{documentType}</TableCell>
				<TableCell>{documentNumber}</TableCell>
				<TableCell>{type}</TableCell>
				<TableCell>{phone}</TableCell>
				<TableCell>{email}</TableCell>
				<TableCell>
					{firstName} {lastName}
				</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell>
					<div className={classes.actionButtons}>
						<VolvoIconButton
							color='primary'
							onClick={setEditModalVisible(true)}
						>
							<CreateIcon />
						</VolvoIconButton>
					</div>
				</TableCell>
			</TableRow>
			{showEditModal && (
				<FormModal
					title='Editar Contacto'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
		</React.Fragment>
	);
};

export default ClientUserRow;
