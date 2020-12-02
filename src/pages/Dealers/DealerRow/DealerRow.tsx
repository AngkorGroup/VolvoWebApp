import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { VolvoIconButton } from 'common/components';
import { DealerForm, TableDealer } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import AccountsModal from '../AccountsModal/AccountsModal';

interface DealerRowProps {
	item: TableDealer;
	onEdit: (data: DealerForm) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const DealerRow = ({ item, onEdit, onDelete }: DealerRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAccountsModal, setShowAccounts] = useState(false);
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

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};
	const onOpenMenu = (event: Event) => setAnchorEl(event.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setAccountsVisible = (flag: boolean) =>
		withCloseMenu(() => setShowAccounts(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{id}</TableCell>
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
				<TableCell align='center'>
					{!archiveAt && (
						<>
							<VolvoIconButton
								aria-controls='options'
								aria-haspopup='true'
								color='primary'
								onClick={onOpenMenu}
							>
								<SettingsIcon />
							</VolvoIconButton>
							<Menu
								id='options'
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={onCloseMenu}
							>
								<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
								<MenuItem onClick={setAccountsVisible(true)}>
									Cuentas Bancarias
								</MenuItem>
								<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
							</Menu>
						</>
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
			{showAccountsModal && (
				<AccountsModal
					show={showAccountsModal}
					id={id}
					onClose={setAccountsVisible(false)}
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
