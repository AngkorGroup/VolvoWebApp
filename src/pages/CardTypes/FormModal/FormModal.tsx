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
import { FilePicker, VolvoButton } from 'common/components';
import { Option } from 'common/utils';
import React from 'react';
import { CardTypeForm } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: CardTypeForm;
	onClose: () => void;
	onConfirm: (data: CardTypeForm) => void;
}

const CURRENCIES: Option[] = [
	{ value: 'US$', label: 'US$' },
	{ value: 'S/.', label: 'S/.' },
];

const initialValues: CardTypeForm = {
	type: '',
	description: '',
	currency: '',
	term: '',
	logo: null,
	createdAt: '16/10/2020',
	status: 'Activo',
	deletedAt: '',
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
		input: {
			display: 'none',
		},
		fileContainer: {
			marginTop: '10px',
			display: 'flex',
		},
		filename: {
			marginLeft: '5px',
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
		},
	}),
);

type SetValueFunction = (
	field: string,
	value: any,
	shouldValidate?: boolean | undefined,
) => void;

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: CardTypeForm) => {
		onConfirm(data);
		onClose();
	};
	const onSelectFile = (setFieldValue: SetValueFunction) => (file: File) => {
		setFieldValue('logo', file);
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik initialValues={values || initialValues} onSubmit={handleSubmit}>
				{({ setFieldValue }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<Field name='type' label='Tipo de Tarjeta' {...fieldProps} />
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='currencyLabel'>Moneda</InputLabel>
										<Field
											labelId='currencyLabel'
											label='Moneda'
											name='currency'
											as={Select}
										>
											{CURRENCIES.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='description'
										label='Descripción'
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field name='term' label='Plazo (meses)' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<FilePicker
										name='logo'
										label='Logo'
										onChange={onSelectFile(setFieldValue)}
									/>
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
