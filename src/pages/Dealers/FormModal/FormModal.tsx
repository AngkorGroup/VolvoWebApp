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
	{ value: 'Internal', label: 'Internal' },
	{ value: 'External', label: 'External' },
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
			<Formik initialValues={values || initialValues} onSubmit={handleSubmit}>
				{() => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field name='code' label='Código' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<Field name='name' label='Nombre' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='ruc' label='RUC' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='dealerTypeLabel'>Tipo</InputLabel>
										<Field
											labelId='dealerTypeLabel'
											label='Tipo'
											name='type'
											as={Select}
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
									<Field name='phone' label='Teléfono' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='zone' label='Zona' {...fieldProps} />
								</Grid>
								<Grid item xs={8}>
									<Field name='address' label='Dirección' {...fieldProps} />
								</Grid>
								<Grid item xs={4}>
									<Field name='maxCashiers' label='Max. POS' {...fieldProps} />
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
