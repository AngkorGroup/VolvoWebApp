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
	TextField,
	Theme,
} from '@material-ui/core';
import { VolvoButton } from 'common/components';
import { MOCKED_USER_TYPES } from 'common/utils';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { User } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: User;
	onClose: () => void;
	onConfirm: (data: User) => void;
}

const initialValues: User = {
	id: '00200',
	name: '',
	email: '',
	phone: '',
	createdAt: '14/10/2020',
	type: '',
	status: 'Activo',
};

const fieldProps = {
	size: 'small',
	variant: 'outlined',
	fullWidth: true,
	as: TextField,
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiTextField-root': {
				marginTop: theme.spacing(1),
			},
		},
	}),
);

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: User) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik initialValues={values || initialValues} onSubmit={handleSubmit}>
				{() => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Field name='name' label='Nombre' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='email' label='Email' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='phone' label='Teléfono' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='typeLabel'>Tipo de Usuario</InputLabel>
										<Field
											labelId='typeLabel'
											label='Tipo de Usuario'
											name='type'
											as={Select}
										>
											{MOCKED_USER_TYPES.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
							<VolvoButton type='submit' color='success' text='Guardar' />
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default FormModal;
