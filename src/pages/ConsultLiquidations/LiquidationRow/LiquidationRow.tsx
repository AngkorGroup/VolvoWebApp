import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Amount, VolvoIconButton } from 'common/components';
import { LiquidationColumn } from '../interfaces';
import DetailModal from '../DetailModal/DetailModal';

interface LiquidationRowProps {
	item: LiquidationColumn;
}

const LiquidationRow = ({ item }: LiquidationRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const {
		id,
		settlement,
		dealer,
		currency,
		amount,
		date,
		liquidationStatus,
		paymentDate,
		source,
		target,
		voucher,
		chargesCount,
	} = item;

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
		<React.Fragment>
			<TableRow>
				<TableCell>{settlement}</TableCell>
				<TableCell>{dealer}</TableCell>
				<TableCell>{currency}</TableCell>
				<TableCell>
					<Amount value={amount} />
				</TableCell>
				<TableCell>{date}</TableCell>
				<TableCell align='center'>{chargesCount}</TableCell>
				<TableCell>{source}</TableCell>
				<TableCell>{target}</TableCell>
				<TableCell>{paymentDate}</TableCell>
				<TableCell>{voucher}</TableCell>
				<TableCell>{liquidationStatus}</TableCell>
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
							Ver Consumos
						</MenuItem>
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
		</React.Fragment>
	);
};

export default LiquidationRow;
