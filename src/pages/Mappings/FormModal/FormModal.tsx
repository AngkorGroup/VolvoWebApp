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
import React from 'react';
import { VolvoButton } from 'common/components';
import { MappingForm } from '../interfaces';
import { MappingSchema } from 'common/validations';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: MappingForm;
	onClose: () => void;
	onConfirm: (data: MappingForm) => void;
}

const initialValues: MappingForm = {
	mappingNumber: '',
	type: '',
	description: '',
	company: '',
	feeder: '',
	file: '',
	username: '',
	password: '',
	date: '',
	filler: '',
	version: '',
	receiverLogicalID: '',
	receiverComponentID: '',
	senderLogicalID: '',
	senderComponentID: '',
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
	const handleSubmit = (data: MappingForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={MappingSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field
										name='mappingNumber'
										label='N° Mapping'
										error={touched.mappingNumber && !!errors.mappingNumber}
										helperText={touched.mappingNumber && errors.mappingNumber}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='type'
										label='TipMap'
										error={touched.type && !!errors.type}
										helperText={touched.type && errors.type}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={8}>
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
										name='company'
										label='Company'
										error={touched.company && !!errors.company}
										helperText={touched.company && errors.company}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='feeder'
										label='Feeder'
										error={touched.feeder && !!errors.feeder}
										helperText={touched.feeder && errors.feeder}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='file'
										label='File'
										error={touched.file && !!errors.file}
										helperText={touched.file && errors.file}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='username'
										label='Username'
										error={touched.username && !!errors.username}
										helperText={touched.username && errors.username}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='password'
										label='Password'
										error={touched.password && !!errors.password}
										helperText={touched.password && errors.password}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='date'
										label='Date'
										error={touched.date && !!errors.date}
										helperText={touched.date && errors.date}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='filler'
										label='Filler'
										error={touched.filler && !!errors.filler}
										helperText={touched.filler && errors.filler}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='version'
										label='Version'
										error={touched.version && !!errors.version}
										helperText={touched.version && errors.version}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='receiverLogicalID'
										label='ReceiverLogicalID'
										error={
											touched.receiverLogicalID && !!errors.receiverLogicalID
										}
										helperText={
											touched.receiverLogicalID && errors.receiverLogicalID
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='receiverComponentID'
										label='ReceiverComponentID'
										error={
											touched.receiverComponentID &&
											!!errors.receiverComponentID
										}
										helperText={
											touched.receiverComponentID && errors.receiverComponentID
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='senderLogicalID'
										label='SenderLogicalID'
										error={touched.senderLogicalID && !!errors.senderLogicalID}
										helperText={
											touched.senderLogicalID && errors.senderLogicalID
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='senderComponentID'
										label='SenderComponentID'
										error={
											touched.senderComponentID && !!errors.senderComponentID
										}
										helperText={
											touched.senderComponentID && errors.senderComponentID
										}
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
