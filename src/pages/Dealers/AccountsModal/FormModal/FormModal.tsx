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
import { getCommonBankAccounts, getQueryBanks } from 'common/services';
import { Option, parseBankAccounts, parseCommonValue } from 'common/utils';
import { BankAccountSchema } from 'common/validations';
import { Field, Form, Formik } from 'formik';
import { BankAccountForm } from 'pages/Dealers/interfaces';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
	const [accountOptions, setAccountOptions] = useState<Option[]>([]);
	const { data } = useQuery('getQueryBanks', getQueryBanks);
	const bankOptions = useMemo(() => {
		if (data?.ok) {
			return parseCommonValue(data?.data || []);
		}
		return [];
	}, [data]);

	const onBankChange = (setFieldValue: any) => async (e: any) => {
		const bankId = e.target.value;
		setFieldValue('bankId', bankId);
		const response = await getCommonBankAccounts(bankId);
		if (response.ok) {
			const accounts = parseBankAccounts(response?.data || []);
			setAccountOptions(accounts);
		}
	};

	useEffect(() => {
		const fetchBankAccounts = async (bankId: string) => {
			const response = await getCommonBankAccounts(bankId);
			if (response.ok) {
				const accounts = parseBankAccounts(response?.data || []);
				setAccountOptions(accounts);
			}
		};
		if (values?.bankId) {
			fetchBankAccounts(values.bankId);
		}
	}, [values]);

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
											onChange={onBankChange(setFieldValue)}
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
										<InputLabel id='accountLabel'>Cuenta</InputLabel>
										<Field
											labelId='accountLabel'
											label='Cuenta'
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
