import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { isGenerated, LiquidationColumn } from '../interfaces';
import DetailModal from '../DetailModal/DetailModal';
import PayModal from '../PayModal/PayModal';

interface LiquidationActionsProps {
	item: LiquidationColumn;
	status: string;
	onAnnulate: (id: string) => void;
	onPay: (id: string, date: string, voucher: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const LiquidationActions: React.FC<LiquidationActionsProps> = ({
	item,
	status,
	onAnnulate,
	onPay,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = item;

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};
	const onOpenMenu = (e: Event) => setAnchorEl(e.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setDetailModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDetailModal(flag));
	const setPayModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPayModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));
	return (
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
				<MenuItem onClick={setDetailModalVisible(true)}>Ver Consumos</MenuItem>
				{isGenerated(status) && (
					<MenuItem onClick={setDelModalVisible(true)}>Anular</MenuItem>
				)}
			</Menu>
			{showDetailModal && (
				<DetailModal
					show={showDetailModal}
					id={id}
					onClose={setDetailModalVisible(false)}
				/>
			)}
			{showPayModal && (
				<PayModal
					show={showPayModal}
					id={id}
					onClose={setPayModalVisible(false)}
					onPay={onPay}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id}
					title='Anular Liquidación'
					body='¿Está seguro que desea anular la siguiente liquidación?'
					onClose={setDelModalVisible(false)}
					onConfirm={onAnnulate}
				/>
			)}
		</>
	);
};

export default LiquidationActions;
