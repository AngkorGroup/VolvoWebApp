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
import { MappingDetailSchema } from 'common/validations';
import { MappingDetailForm } from 'pages/Mappings/interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: MappingDetailForm;
	onClose: () => void;
	onConfirm: (data: MappingDetailForm) => void;
}

const initialValues: MappingDetailForm = {
	type: '',
	documentType: '',
	line: '',
	recordType: '',
	company: '',
	reference: '',
	postKey: '',
	account: '',
	sign: '',
	taxCode: '',
	taxAmount: '',
	costCenter: '',
	profitCenter: '',
	tradePartner: '',
	docText: '',
	moreInfo: '',
	businessArea: '',
	market: '',
	customer: '',
	productModel: '',
	lineType: '',
	classification: '',
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
	const handleSubmit = (data: MappingDetailForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={MappingDetailSchema}
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
										name='documentType'
										label='Document Type'
										error={touched.documentType && !!errors.documentType}
										helperText={touched.documentType && errors.documentType}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='line'
										label='Line'
										error={touched.line && !!errors.line}
										helperText={touched.line && errors.line}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
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
										name='reference'
										label='Reference'
										error={touched.reference && !!errors.reference}
										helperText={touched.reference && errors.reference}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='postKey'
										label='Post Key'
										error={touched.postKey && !!errors.postKey}
										helperText={touched.postKey && errors.postKey}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='account'
										label='Account'
										error={touched.account && !!errors.account}
										helperText={touched.account && errors.account}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='sign'
										label='Sign'
										error={touched.sign && !!errors.sign}
										helperText={touched.sign && errors.sign}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='taxCode'
										label='Tax Code'
										error={touched.taxCode && !!errors.taxCode}
										helperText={touched.taxCode && errors.taxCode}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='taxAmount'
										label='Tax Amount'
										error={touched.taxAmount && !!errors.taxAmount}
										helperText={touched.taxAmount && errors.taxAmount}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='costCenter'
										label='Cost Center'
										error={touched.costCenter && !!errors.costCenter}
										helperText={touched.costCenter && errors.costCenter}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='profitCenter'
										label='Profit Center'
										error={touched.profitCenter && !!errors.profitCenter}
										helperText={touched.profitCenter && errors.profitCenter}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='tradePartner'
										label='Trade Partner'
										error={touched.tradePartner && !!errors.tradePartner}
										helperText={touched.tradePartner && errors.tradePartner}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='docText'
										label='Doc Text'
										error={touched.docText && !!errors.docText}
										helperText={touched.docText && errors.docText}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='moreInfo'
										label='More Info'
										error={touched.moreInfo && !!errors.moreInfo}
										helperText={touched.moreInfo && errors.moreInfo}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='businessArea'
										label='Business Area'
										error={touched.businessArea && !!errors.businessArea}
										helperText={touched.businessArea && errors.businessArea}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='market'
										label='Market'
										error={touched.market && !!errors.market}
										helperText={touched.market && errors.market}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='customer'
										label='Customer'
										error={touched.customer && !!errors.customer}
										helperText={touched.customer && errors.customer}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='productModel'
										label='Product Model'
										error={touched.productModel && !!errors.productModel}
										helperText={touched.productModel && errors.productModel}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='lineType'
										label='Line Type'
										error={touched.lineType && !!errors.lineType}
										helperText={touched.lineType && errors.lineType}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										name='classification'
										label='Classification'
										error={touched.classification && !!errors.classification}
										helperText={touched.classification && errors.classification}
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
