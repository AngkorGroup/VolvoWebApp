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
import { PageLoader, VolvoButton } from 'common/components';
import { getDealers } from 'common/services';
import { parseDealers } from 'common/utils';
import { Field, Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { UserForm } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: UserForm;
	onClose: () => void;
	onConfirm: (data: UserForm) => void;
}

const initialValues: UserForm = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	password: '',
	dealerId: '',
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
			'& .MuiFormControl-root': {
				marginTop: '8px',
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
	const { data, status } = useQuery('dealers', getDealers);
	const dealers = useMemo(() => {
		if (data?.ok) {
			return parseDealers(data?.data || []);
		}
		return [];
	}, [data]);
	const handleSubmit = (data: UserForm) => {
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
								<Grid item xs={6}>
									<Field name='firstName' label='Nombre' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='lastName' label='Apellido' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<Field name='email' label='Email' {...fieldProps} />
								</Grid>
								{!values && (
									<Grid item xs={6}>
										<Field
											name='password'
											label='Contraseña'
											type='password'
											{...fieldProps}
										/>
									</Grid>
								)}
								<Grid item xs={6}>
									<Field name='phone' label='Teléfono' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									{status === 'loading' && <PageLoader />}
									{status === 'success' && (
										<FormControl variant='outlined' fullWidth size='small'>
											<InputLabel id='documentTypeLabel'>Dealer</InputLabel>
											<Field
												labelId='documentTypeLabel'
												label='Tipo de Documento'
												name='documentType'
												as={Select}
											>
												{dealers.map((d) => (
													<MenuItem key={d.value} value={d.value}>
														{d.label}
													</MenuItem>
												))}
											</Field>
										</FormControl>
									)}
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
