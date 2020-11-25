import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Amount, ConfirmationModal, VolvoIconButton } from 'common/components';
import { RefundColumn } from '../interfaces';
import { REFUND_GENERATED } from 'common/constants/constants';
import DetailModal from '../DetailModal/DetailModal';

interface RefundRowProps {
	item: RefundColumn;
	onAnnulate: (id: string) => void;
}

const RefundRow = ({ item, onAnnulate }: RefundRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, settlement, dealer, currency, amount, date, status } = item;

	const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const onCloseMenu = () => setAnchorEl(null);

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};

	const setDetailModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDetailModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{settlement}</TableCell>
				<TableCell>{dealer}</TableCell>
				<TableCell>{currency}</TableCell>
				<TableCell>
					<Amount value={amount} />
				</TableCell>
				<TableCell>{date}</TableCell>
				<TableCell>{status}</TableCell>
				<TableCell align='center'>
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
						<MenuItem onClick={setDetailModalVisible(true)}>
							Ver Detalle
						</MenuItem>
						{status === REFUND_GENERATED && (
							<MenuItem onClick={setDelModalVisible(true)}>Anular</MenuItem>
						)}
					</Menu>
				</TableCell>
			</TableRow>
			{showDetailModal && (
				<DetailModal
					show={showDetailModal}
					id={id}
					onClose={setDetailModalVisible(false)}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Anular Reembolso'
					body='¿Está seguro que desea anular el siguiente reembolso?'
					onClose={setDelModalVisible(false)}
					onConfirm={onAnnulate}
				/>
			)}
		</React.Fragment>
	);
};

export default RefundRow;
