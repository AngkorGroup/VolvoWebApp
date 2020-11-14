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
import { VolvoButton } from 'common/components';
import { Option } from 'common/utils';
import React from 'react';
import { CardTypeForm } from '../interfaces';
import { CardTypeSchema } from 'common/validations';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: CardTypeForm;
	onClose: () => void;
	onConfirm: (data: CardTypeForm) => void;
}

const CURRENCIES: Option[] = [
	{ value: 'USD', label: 'US$' },
	{ value: 'PEN', label: 'S/.' },
];

const initialValues: CardTypeForm = {
	type: '',
	description: '',
	currency: '',
	term: '',
	color: '',
	tpCode: '',
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
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={CardTypeSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<Field
										name='type'
										label='Tipo de Tarjeta'
										error={touched.type && !!errors.type}
										helperText={touched.type && errors.type}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='currencyLabel'>Moneda</InputLabel>
										<Field
											labelId='currencyLabel'
											label='Moneda'
											name='currency'
											error={touched.currency && !!errors.currency}
											helperText={touched.currency && errors.currency}
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
										error={touched.description && !!errors.description}
										helperText={touched.description && errors.description}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='term'
										label='Plazo (meses)'
										error={touched.term && !!errors.term}
										helperText={touched.term && errors.term}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='color'
										label='Color'
										error={touched.color && !!errors.color}
										helperText={touched.color && errors.color}
										{...fieldProps}
										placeholder='#000000'
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='tpCode'
										label='Código TP'
										error={touched.tpCode && !!errors.tpCode}
										helperText={touched.tpCode && errors.tpCode}
										{...fieldProps}
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
