import {
	Checkbox,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Amount, ConfirmationModal, VolvoIconButton } from 'common/components';
import { isGenerated, LiquidationColumn } from '../interfaces';
import DetailModal from '../DetailModal/DetailModal';
import PayModal from '../PayModal/PayModal';

interface LiquidationRowProps {
	item: LiquidationColumn;
	status: string;
	onAnnulate: (id: string) => void;
	onPay: (id: string, date: string, voucher: string) => void;
	onSelectId: (id: string) => void;
	onRemoveId: (id: string) => void;
}

type CheckEvent = React.ChangeEvent<HTMLInputElement>;

const LiquidationRow = ({
	item,
	status,
	onAnnulate,
	onPay,
	onSelectId,
	onRemoveId,
}: LiquidationRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [checked, setChecked] = useState(false);
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
		refundId,
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

	const handleSelect = (e: CheckEvent) => {
		const isChecked = e.target.checked;
		setChecked(isChecked);
		if (isChecked) {
			onSelectId(id);
		} else {
			onRemoveId(id);
		}
	};

	const setDetailModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDetailModal(flag));
	const setPayModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPayModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));

	return (
		<React.Fragment>
			<TableRow>
				{isGenerated(status) && (
					<TableCell>
						<Checkbox
							checked={checked}
							onChange={handleSelect}
							color='primary'
						/>
					</TableCell>
				)}
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
				<TableCell>{refundId === '0' ? '' : refundId}</TableCell>
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
						{isGenerated(status) && (
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
		</React.Fragment>
	);
};

export default LiquidationRow;
