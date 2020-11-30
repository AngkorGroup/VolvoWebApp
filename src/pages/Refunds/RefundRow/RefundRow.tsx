import { Menu, MenuItem, TableCell, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Amount, ConfirmationModal, VolvoIconButton } from 'common/components';
import { isCanceled, isPaid, isScheduled, RefundColumn } from '../interfaces';
import LiquidationsModal from '../LiquidationsModal/LiquidationsModal';
import PayModal from '../PayModal/PayModal';

interface RefundRowProps {
	item: RefundColumn;
	status: string;
	onPay: (id: string, date: string, voucher: string) => void;
	onCancel: (id: string) => void;
}

const RefundRow = ({ item, status, onPay, onCancel }: RefundRowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showLiquidationsModal, setShowLiquidationsModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const {
		id,
		bank,
		account,
		currency,
		total,
		date,
		refundStatus,
		liquidationsCount,
		paymentDate,
		voucher,
	} = item;

	const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const onCloseMenu = () => setAnchorEl(null);

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};

	const setLiquidationsModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowLiquidationsModal(flag));
	const setPayModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowPayModal(flag));
	const setCancelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowCancelModal(flag));

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{id}</TableCell>
				<TableCell>{bank}</TableCell>
				<TableCell>{account}</TableCell>
				<TableCell align='center'>{currency}</TableCell>
				<TableCell align='right'>
					<Amount value={total} />
				</TableCell>
				<TableCell>{date}</TableCell>
				<TableCell align='center'>{refundStatus}</TableCell>
				<TableCell>{liquidationsCount}</TableCell>
				<TableCell>{paymentDate}</TableCell>
				<TableCell>{voucher}</TableCell>
				<TableCell align='center'>
					{!isCanceled(status) && (
						<React.Fragment>
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
								{isScheduled(status) && (
									<MenuItem onClick={setPayModalVisible(true)}>Pagar</MenuItem>
								)}
								{(isPaid(status) || isScheduled(status)) && (
									<MenuItem onClick={setLiquidationsModalVisible(true)}>
										Ver Liquidaciones
									</MenuItem>
								)}
								{isScheduled(status) && (
									<MenuItem onClick={setCancelModalVisible(true)}>
										Anular
									</MenuItem>
								)}
							</Menu>
						</React.Fragment>
					)}
				</TableCell>
			</TableRow>
			{showLiquidationsModal && (
				<LiquidationsModal
					show={showLiquidationsModal}
					id={id}
					onClose={setLiquidationsModalVisible(false)}
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
			{showCancelModal && (
				<ConfirmationModal
					show={showCancelModal}
					id={id}
					title='Anular Reembolso'
					body={`¿Está seguro que desea anular el siguiente reembolso?`}
					onClose={setCancelModalVisible(false)}
					onConfirm={onCancel}
				/>
			)}
		</React.Fragment>
	);
};

export default RefundRow;
