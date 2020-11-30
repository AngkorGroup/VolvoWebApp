import {
	Checkbox,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Theme,
} from '@material-ui/core';
import AppContext from 'AppContext';
import { VolvoButton } from 'common/components';
import { getQueryBankAccountTypes, getQueryBanks } from 'common/services';
import { parseCommonValue } from 'common/utils';
import { BankAccountSchema } from 'common/validations';
import { Field, Form, Formik } from 'formik';
import { BankAccountForm } from 'pages/Dealers/interfaces';
import React, { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: BankAccountForm;
	onClose: () => void;
	onConfirm: (data: BankAccountForm) => void;
}

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

const initialValues: BankAccountForm = {
	account: '',
	cci: '',
	currencyId: '',
	isDefault: false,
	bankAccountTypeId: '',
	bankId: '',
};

const fieldProps = {
	size: 'small',
	variant: 'outlined',
	fullWidth: true,
	as: TextField,
};

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}) => {
	const { currencies } = useContext(AppContext);
	const classes = useStyles();
	const { data: banksData } = useQuery('getQueryBanks', getQueryBanks);
	const bankOptions = useMemo(() => {
		if (banksData?.ok) {
			return parseCommonValue(banksData?.data || []);
		}
		return [];
	}, [banksData]);

	const { data: typesData } = useQuery(
		'getQueryBankAccountTypes',
		getQueryBankAccountTypes,
	);
	const accountOptions = useMemo(() => {
		if (typesData?.ok) {
			return parseCommonValue(typesData?.data || []);
		}
		return [];
	}, [typesData]);

	const handleSubmit = (data: BankAccountForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={BankAccountSchema}
			>
				{({ touched, errors, setFieldValue, values }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Field
										name='account'
										label='Cuenta'
										error={touched.account && !!errors.account}
										helperText={touched.account && errors.account}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='cci'
										label='CCI'
										error={touched.cci && !!errors.cci}
										helperText={touched.cci && errors.cci}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='currencyLabel'>Moneda</InputLabel>
										<Field
											labelId='currencyLabel'
											label='Moneda'
											name='currencyId'
											as={Select}
											error={touched.currencyId && !!errors.currencyId}
										>
											{currencies.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel
										control={
											<Field
												name='isDefault'
												color='primary'
												checked={values.isDefault}
												as={Checkbox}
											/>
										}
										label='Por Defecto'
									/>
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='bankLabel'>Banco</InputLabel>
										<Field
											labelId='bankLabel'
											label='Banco'
											name='bankId'
											as={Select}
										>
											{bankOptions.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<FormControl variant='outlined' fullWidth size='small'>
										<InputLabel id='accountLabel'>Tipo de Cuenta</InputLabel>
										<Field
											labelId='accountLabel'
											label='Tipo de Cuenta'
											name='bankAccountTypeId'
											as={Select}
										>
											{accountOptions.map((d) => (
												<MenuItem key={d.value} value={d.value}>
													{d.label}
												</MenuItem>
											))}
										</Field>
									</FormControl>
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
