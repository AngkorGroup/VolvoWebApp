import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	makeStyles,
	TextField,
	Theme,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { VolvoButton } from 'common/components';
import React from 'react';
import { BusinessAreaForm, BusinessAreaSchema } from 'common/validations';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: BusinessAreaForm;
	onClose: () => void;
	onConfirm: (data: BusinessAreaForm) => void;
}

const initialValues: BusinessAreaForm = {
	id: '',
	name: '',
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
	const handleSubmit = (data: BusinessAreaForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={BusinessAreaSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Field
										name='name'
										label='Nombre'
										error={touched.name && !!errors.name}
										helperText={touched.name && errors.name}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='tpCode'
										label='#TopPerú'
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
