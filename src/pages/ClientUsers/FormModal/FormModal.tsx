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
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Option } from '../../../common/components/TypeAhead/TypeAhead';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';
import { ClientUser } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values: ClientUser;
	onClose: () => void;
	onConfirm: (data: ClientUser) => void;
}

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

const DOCUMENT_TYPES: Option[] = [
	{ value: 'DNI', label: 'DNI' },
	{ value: 'CARNET DE EXTRANJERÍA', label: 'CARNET DE EXTRANJERÍA' },
];

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: ClientUser) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik initialValues={values} onSubmit={handleSubmit}>
				{() => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='documentTypeLabel'>
											Tipo de Documento
										</InputLabel>
										<Field
											labelId='documentTypeLabel'
											label='Tipo de Documento'
											name='documentType'
											as={Select}
										>
											{DOCUMENT_TYPES.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='documentNumber'
										label='Número de Documento'
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field name='phone' label='Celular' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<Field
										name='email'
										label='Correo Electrónico'
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field name='name' label='Nombre Completo' {...fieldProps} />
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
