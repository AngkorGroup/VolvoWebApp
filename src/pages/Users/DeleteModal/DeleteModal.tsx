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
	Typography,
} from '@material-ui/core';
import { PageLoader } from 'common/components';
import { getContactsByClient } from 'common/services';
import { parseContacts } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';

interface DeleteModalProps {
	show: boolean;
	clientId: string;
	id: string;
	onClose: () => void;
	onConfirm: (id: string, contactId: string) => void;
}

type SelectEvent = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const DeleteModal: React.FC<DeleteModalProps> = ({
	show,
	clientId,
	id,
	onClose,
	onConfirm,
}: DeleteModalProps) => {
	const [contactId, setContactId] = useState('');
	const { data, status } = useQuery(clientId, getContactsByClient);
	const contacts = useMemo(() => {
		if (data?.ok) {
			return parseContacts(data?.data || []).filter((d) => d.value !== id);
		}
		return [];
	}, [data, id]);

	const onSave = () => {
		onConfirm(id, contactId);
		onClose();
	};

	const onContactChange = (event: SelectEvent) => {
		setContactId(event?.target?.value as string);
	};

	return (
		<Dialog
			fullWidth
			maxWidth='sm'
			open={show}
			onClose={onClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>Pasar Fondos</DialogTitle>
			<DialogContent>
				<Typography variant='body1' gutterBottom>
					Para dar de baja al contacto debe transferir los fondos a otro
					contacto.
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						{status === 'loading' && <PageLoader />}
						{status === 'success' && (
							<FormControl variant='outlined' size='small' fullWidth>
								<InputLabel id='contactLabel'>Contacto</InputLabel>
								<Select
									labelId='contactLabel'
									label='Contacto'
									name='contactId'
									onChange={onContactChange}
									value={contactId}
								>
									{contacts.map((d) => (
										<MenuItem key={d.value} value={d.value}>
											{d.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
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

export default DeleteModal;
