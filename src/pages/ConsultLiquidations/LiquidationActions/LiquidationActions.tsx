import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { VolvoIconButton } from 'common/components';
import { LiquidationColumn } from '../interfaces';
import DetailModal from '../DetailModal/DetailModal';

interface LiquidationActionsProps {
	item: LiquidationColumn;
}

const LiquidationActions: React.FC<LiquidationActionsProps> = ({ item }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const { id } = item;
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
			</Menu>
			{showDetailModal && (
				<DetailModal
					show={showDetailModal}
					id={id}
					onClose={setDetailModalVisible(false)}
				/>
			)}
		</>
	);
};

export default LiquidationActions;
