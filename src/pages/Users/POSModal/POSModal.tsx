import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import { Option } from 'common/utils/types';
import React, { useState } from 'react';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';
import { UserPOSForm } from '../interfaces';

interface POSModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
	onConfirm: (data: UserPOSForm) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiSelect-root': {
				marginTop: theme.spacing(1),
			},
		},
	}),
);

const DEALERS: Option[] = [
	{ value: '1', label: 'AUTOMOTORES MOQUEGUA' },
	{ value: '2', label: 'AUTOMOTORES TACNA' },
];
const POS_LIST: Option[] = [
	{ value: '1', label: 'CAJA 1' },
	{ value: '2', label: 'CAJA 2' },
	{ value: '3', label: 'CAJA 3' },
	{ value: '4', label: 'CAJA 4' },
];

type SelectEvent = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const POSModal: React.FC<POSModalProps> = ({
	show,
	id,
	onClose,
	onConfirm,
}: POSModalProps) => {
	const classes = useStyles();
	const [selectedDealer, setSelectedDealer] = useState('');
	const [selectedPOS, setSelectedPOS] = useState('');
	const [posList, setPOSList] = useState<Option[]>([]);

	const onSave = () => {
		onConfirm({
			id,
			dealer: selectedDealer,
			pos: selectedPOS,
		});
		onClose();
	};

	const onDealerChange = (event: SelectEvent) => {
		// make API call
		setSelectedDealer(event?.target?.value as string);
		setPOSList(POS_LIST);
	};

	const onPOSChange = (event: SelectEvent) => {
		setSelectedPOS(event?.target?.value as string);
	};

	return (
		<Dialog
			fullWidth
			maxWidth='sm'
			open={show}
			onClose={onClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>Asociar POS</DialogTitle>
			<DialogContent className={classes.root}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel id='dealerLabel'>Dealer</InputLabel>
							<Select
								labelId='dealerLabel'
								label='Dealer'
								name='dealer'
								onChange={onDealerChange}
								value={selectedDealer}
							>
								{DEALERS.map((d) => (
									<MenuItem key={d.value} value={d.value}>
										{d.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel id='posLabel'>POS</InputLabel>
							<Select
								labelId='posLabel'
								label='POS'
								name='pos'
								onChange={onPOSChange}
								value={selectedPOS}
								disabled={!selectedDealer}
							>
								{posList.map((d) => (
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
				<VolvoButton onClick={onSave} color='success' text='Guardar' />
			</DialogActions>
		</Dialog>
	);
};

export default POSModal;
