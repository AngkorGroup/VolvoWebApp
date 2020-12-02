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
import {
	DocumentTypeForm,
	DocumentTypeSchema,
} from 'common/validations/DocumentType';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: DocumentTypeForm;
	onClose: () => void;
	onConfirm: (data: DocumentTypeForm) => void;
}

const initialValues: DocumentTypeForm = {
	id: '',
	name: '',
	tpCode: '',
	abbreviation: '',
	sunatCode: '',
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
	const handleSubmit = (data: DocumentTypeForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={DocumentTypeSchema}
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
								<Grid item xs={12}>
									<Field
										name='abbreviation'
										label='Abreviación'
										error={touched.abbreviation && !!errors.abbreviation}
										helperText={touched.abbreviation && errors.abbreviation}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='sunatCode'
										label='Código SUNAT'
										error={touched.sunatCode && !!errors.sunatCode}
										helperText={touched.sunatCode && errors.sunatCode}
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
