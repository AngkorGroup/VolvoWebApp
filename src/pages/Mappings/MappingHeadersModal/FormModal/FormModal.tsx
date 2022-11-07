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
import { MappingHeaderSchema } from 'common/validations';
import { MappingHeaderForm } from 'pages/Mappings/interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: MappingHeaderForm;
	onClose: () => void;
	onConfirm: (data: MappingHeaderForm) => void;
}

const initialValues: MappingHeaderForm = {
	type: '',
	recordType: '',
	company: '',
	documentNumber: '',
	reference: '',
	control: '',
	documentType: '',
	documentDate: '',
	postDate: '',
	currency: '',
	exchangeRate: '',
	documentHeader: '',
	translationDate: '',
	intercompanyNumber: '',
	tradingPartner: '',
	exchangeRateType: '',
	postingPeriod: '',
	exchangeRateToFactor: '',
	exchangeRateFromFactor: '',
	reversalReason: '',
	reversalDate: '',
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
	const handleSubmit = (data: MappingHeaderForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={MappingHeaderSchema}
			>
				{({ touched, errors }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<Field
										name='type'
										label='Tipo Mapping'
										error={touched.type && !!errors.type}
										helperText={touched.type && errors.type}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={8}>
									<Field
										name='recordType'
										label='Record Type'
										error={touched.recordType && !!errors.recordType}
										helperText={touched.recordType && errors.recordType}
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
										name='documentNumber'
										label='Document Number'
										error={touched.documentNumber && !!errors.documentNumber}
										helperText={touched.documentNumber && errors.documentNumber}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='reference'
										label='Reference'
										error={touched.reference && !!errors.reference}
										helperText={touched.reference && errors.reference}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='control'
										label='Control'
										error={touched.control && !!errors.control}
										helperText={touched.control && errors.control}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='documentType'
										label='Document Type'
										error={touched.documentType && !!errors.documentType}
										helperText={touched.documentType && errors.documentType}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='documentDate'
										label='Document Date'
										error={touched.documentDate && !!errors.documentDate}
										helperText={touched.documentDate && errors.documentDate}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='postDate'
										label='Post Date'
										error={touched.postDate && !!errors.postDate}
										helperText={touched.postDate && errors.postDate}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='currency'
										label='Currency'
										error={touched.currency && !!errors.currency}
										helperText={touched.currency && errors.currency}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='exchangeRate'
										label='Exchange Rate'
										error={touched.exchangeRate && !!errors.exchangeRate}
										helperText={touched.exchangeRate && errors.exchangeRate}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='documentHeader'
										label='Document Header'
										error={touched.documentHeader && !!errors.documentHeader}
										helperText={touched.documentHeader && errors.documentHeader}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='translationDate'
										label='Translation Date'
										error={touched.translationDate && !!errors.translationDate}
										helperText={
											touched.translationDate && errors.translationDate
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='intercompanyNumber'
										label='Intercompany Number'
										error={
											touched.intercompanyNumber && !!errors.intercompanyNumber
										}
										helperText={
											touched.intercompanyNumber && errors.intercompanyNumber
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='tradingPartner'
										label='Trading Partner'
										error={touched.tradingPartner && !!errors.tradingPartner}
										helperText={touched.tradingPartner && errors.tradingPartner}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='exchangeRateType'
										label='Exchange Rate Type'
										error={
											touched.exchangeRateType && !!errors.exchangeRateType
										}
										helperText={
											touched.exchangeRateType && errors.exchangeRateType
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='postingPeriod'
										label='Posting Period'
										error={touched.postingPeriod && !!errors.postingPeriod}
										helperText={touched.postingPeriod && errors.postingPeriod}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='exchangeRateToFactor'
										label='Exchange Rate To Factor'
										error={
											touched.exchangeRateToFactor &&
											!!errors.exchangeRateToFactor
										}
										helperText={
											touched.exchangeRateToFactor &&
											errors.exchangeRateToFactor
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='exchangeRateFromFactor'
										label='Exchange Rate From Factor'
										error={
											touched.exchangeRateFromFactor &&
											!!errors.exchangeRateFromFactor
										}
										helperText={
											touched.exchangeRateFromFactor &&
											errors.exchangeRateFromFactor
										}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='reversalReason'
										label='Reversal Reason'
										error={touched.reversalReason && !!errors.reversalReason}
										helperText={touched.reversalReason && errors.reversalReason}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='reversalDate'
										label='Reversal Date'
										error={touched.reversalDate && !!errors.reversalDate}
										helperText={touched.reversalDate && errors.reversalDate}
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
