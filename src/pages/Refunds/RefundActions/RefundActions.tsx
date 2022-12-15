import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import {
	isCanceled,
	isPaid,
	isScheduled,
	isTabulated,
	RefundColumn,
} from '../interfaces';
import LiquidationsModal from '../LiquidationsModal/LiquidationsModal';
import PayModal from '../PayModal/PayModal';

interface RefundActionsProps {
	item: RefundColumn;
	status: string;
	onPay: (id: string, date: string, voucher: string) => void;
	onCancel: (id: string) => void;
	onSendMapping: (id: string, shouldResend?: boolean) => void;
}

const RefundActions: React.FC<RefundActionsProps> = ({
	item,
	status,
	onPay,
	onCancel,
	onSendMapping,
}: RefundActionsProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showLiquidationsModal, setShowLiquidationsModal] = useState(false);
	const [showPayModal, setShowPayModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showSendMappingModal, setShowSendMappingModal] = useState(false);
	const [showResendMappingModal, setShowResendMappingModal] = useState(false);
	const { id } = item;

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
	const setSendModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowSendMappingModal(flag));
	const setResendModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowResendMappingModal(flag));

	const onResendMapping = (id: string) => onSendMapping(id, true);

	return (
		<>
			{!isCanceled(status) && (
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
						{isScheduled(status) && (
							<MenuItem onClick={setPayModalVisible(true)}>Pagar</MenuItem>
						)}
						{isPaid(status) && (
							<MenuItem onClick={setSendModalVisible(true)}>
								Enviar Mapping
							</MenuItem>
						)}
						{(isPaid(status) || isScheduled(status)) && (
							<MenuItem onClick={setLiquidationsModalVisible(true)}>
								Ver Liquidaciones
							</MenuItem>
						)}
						{isScheduled(status) && (
							<MenuItem onClick={setCancelModalVisible(true)}>Anular</MenuItem>
						)}
						{isTabulated(status) && (
							<MenuItem onClick={setResendModalVisible(true)}>
								Reenviar Mapping
							</MenuItem>
						)}
					</Menu>
				</>
			)}
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
			{showSendMappingModal && (
				<ConfirmationModal
					show={showSendMappingModal}
					id={id}
					title='Enviar Mapping'
					body={`Se enviará el mapping del reembolso seleccionado`}
					onClose={setSendModalVisible(false)}
					onConfirm={onSendMapping}
				/>
			)}
			{showResendMappingModal && (
				<ConfirmationModal
					show={showResendMappingModal}
					id={id}
					title='Reenviar Mapping'
					body={`Se reenviará el mapping del reembolso seleccionado`}
					onClose={setResendModalVisible(false)}
					onConfirm={onResendMapping}
				/>
			)}
		</>
	);
};

export default RefundActions;
