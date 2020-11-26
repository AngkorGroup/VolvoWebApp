import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { VolvoButton } from 'common/components';
import React, { useMemo, useState } from 'react';
import { Option, parseCommonValue } from 'common/utils';
import { useQuery } from 'react-query';
import { getBankAccounts, getQueryBanks } from 'common/services';
import { mapBankAccounts } from '../interfaces';

interface ScheduleModalProps {
	show: boolean;
	onClose: () => void;
	onSchedule: (bank: string, account: string) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
	show,
	onClose,
	onSchedule,
}: ScheduleModalProps) => {
	const [bank, setBank] = useState('');
	const [account, setAccount] = useState('');
	const { data } = useQuery('getQueryBanks', getQueryBanks);
	const bankOptions = useMemo(() => {
		if (data?.ok) {
			return parseCommonValue(data?.data || []);
		}
		return [];
	}, [data]);
	const [accountOptions, setAccountOptions] = useState<Option[]>([]);
	const onBackChange = async (e: any) => {
		const bankId = e.target.value;
		setBank(bankId);
		setAccount('');
		const response = await getBankAccounts(bankId);
		if (response.ok) {
			const accounts = mapBankAccounts(response?.data || []);
			setAccountOptions(accounts);
		}
	};
	const onAccountChange = (e: any) => setAccount(e.target.value);
	const onConfirm = () => {
		onSchedule(bank, account);
		onClose();
	};
	return (
		<Dialog fullWidth maxWidth='md' open={show} onClose={onClose}>
			<DialogTitle id='alert-dialog-title'>Programar Reembolsos</DialogTitle>
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth size='small'>
							<InputLabel id='bankLabel'>Banco</InputLabel>
							<Select
								labelId='bankLabel'
								label='Banco'
								value={bank}
								onChange={onBackChange}
							>
								{bankOptions.map((d) => (
									<MenuItem key={d.value} value={d.value}>
										{d.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth size='small'>
							<InputLabel id='accountLabel'>Cuenta</InputLabel>
							<Select
								labelId='accountLabel'
								label='Cuenta'
								value={account}
								onChange={onAccountChange}
							>
								{accountOptions.map((d) => (
									<MenuItem key={d.value} value={d.value}>
										{d.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
				<VolvoButton
					disabled={!bank || !account}
					onClick={onConfirm}
					color='success'
					text='Generar TXT'
				/>
			</DialogActions>
		</Dialog>
	);
};

export default ScheduleModal;
