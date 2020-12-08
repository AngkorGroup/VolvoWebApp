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
import { VolvoButton } from 'common/components';
import { DealerForm } from '../interfaces';
import { Option } from 'common/utils';
import { DealerSchema } from 'common/validations';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: DealerForm;
	onClose: () => void;
	onConfirm: (data: DealerForm) => void;
}

const initialValues: DealerForm = {
	code: '',
	name: '',
	ruc: '',
	address: '',
	status: 'Activo',
	type: '',
	phone: '',
	zone: '',
	maxCashiers: 0,
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

const DEALER_TYPES: Option[] = [
	{ value: 'Internal', label: 'Private' },
	{ value: 'External', label: 'Own Dealer' },
];

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const handleSubmit = (data: DealerForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={DealerSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field
										name='code'
										label='Código'
										error={touched.code && !!errors.code}
										helperText={touched.code && errors.code}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={8}>
									<Field
										name='name'
										label='Nombre'
										error={touched.name && !!errors.name}
										helperText={touched.name && errors.name}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='ruc'
										label='RUC'
										error={touched.ruc && !!errors.ruc}
										helperText={touched.ruc && errors.ruc}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='dealerTypeLabel'>Tipo</InputLabel>
										<Field
											labelId='dealerTypeLabel'
											label='Tipo'
											name='type'
											as={Select}
											error={touched.type && !!errors.type}
										>
											{DEALER_TYPES.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='phone'
										label='Teléfono'
										error={touched.phone && !!errors.phone}
										helperText={touched.phone && errors.phone}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='zone'
										label='Zona'
										error={touched.zone && !!errors.zone}
										helperText={touched.zone && errors.zone}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={8}>
									<Field
										name='address'
										label='Dirección'
										error={touched.address && !!errors.address}
										helperText={touched.address && errors.address}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='maxCashiers'
										label='Max. POS'
										error={touched.maxCashiers && !!errors.maxCashiers}
										helperText={touched.maxCashiers && errors.maxCashiers}
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
