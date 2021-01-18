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
import { MultiTypeAhead, PageLoader, VolvoButton } from 'common/components';
import { getQueryDealerCashiers, getQueryOnlyDealers } from 'common/services';
import { getQueryRoles } from 'common/services/Roles';
import { Option, parseCashiers, parseDealers, parseRoles } from 'common/utils';
import { UserSchema } from 'common/validations';
import { Field, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { UserForm } from '../interfaces';

interface FormModalProps {
	show: boolean;
	title: string;
	values?: UserForm;
	onClose: () => void;
	onConfirm: (data: UserForm) => void;
}

const initialValues: UserForm = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	password: '',
	dealerId: '',
	cashierId: '',
	roleIds: [],
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

type CheckEvent = React.ChangeEvent<HTMLInputElement>;
type Setter = (
	field: string,
	value: any,
	shouldValidate?: boolean | undefined,
) => void;

const FormModal: React.FC<FormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: FormModalProps) => {
	const classes = useStyles();
	const [generate, setGenerate] = useState(true);
	const [dealerId, setDealerId] = useState(values?.dealerId || '-');

	const dealersQuery = useQuery(
		['getQueryOnlyDealers', true],
		getQueryOnlyDealers,
	);
	const dealers = useMemo(() => {
		const { data } = dealersQuery;
		if (data?.ok) {
			return parseDealers(data?.data || [], false, true);
		}
		return [];
	}, [dealersQuery]);

	const rolesQuery = useQuery('getQueryRoles', getQueryRoles);
	const roles = useMemo(() => {
		const { data } = rolesQuery;
		if (data?.ok) {
			return parseRoles(data?.data || []);
		}
		return [];
	}, [rolesQuery]);

	const cashiersQuery = useQuery(
		['getDealerCashiers', dealerId],
		getQueryDealerCashiers,
	);
	const cashiers = useMemo(() => {
		const { data } = cashiersQuery;
		if (data?.ok) {
			return parseCashiers(data?.data || [], false, true);
		}
		return [];
	}, [cashiersQuery]);

	const handleSubmit = (data: UserForm) => {
		onConfirm(data);
		onClose();
	};
	const handleCheck = (setFieldValue: Setter) => (e: CheckEvent) => {
		setGenerate(e.target.checked);
		setFieldValue('password', '');
	};
	return (
		<Dialog open={show} onClose={onClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={UserSchema}
			>
				{({ setFieldValue, errors, touched, values: formValues }) => (
					<Form className={classes.root}>
						<DialogContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Field
										name='firstName'
										label='Nombre'
										helperText={touched.firstName && errors.firstName}
										error={touched.firstName && !!errors.firstName}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='lastName'
										label='Apellido'
										helperText={touched.lastName && errors.lastName}
										error={touched.lastName && !!errors.lastName}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='email'
										label='Email'
										helperText={touched.email && errors.email}
										error={touched.email && !!errors.email}
										{...fieldProps}
									/>
								</Grid>
								{!values && (
									<React.Fragment>
										<Grid item xs={8}>
											<Field
												disabled={generate}
												name='password'
												label='Contraseña'
												type='password'
												{...fieldProps}
											/>
										</Grid>
										<Grid item xs={4}>
											<FormControlLabel
												control={
													<Checkbox
														checked={generate}
														onChange={handleCheck(setFieldValue)}
														color='primary'
													/>
												}
												label='Autogenerar'
											/>
										</Grid>
									</React.Fragment>
								)}
								<Grid item xs={12}>
									<Field
										name='phone'
										label='Teléfono'
										helperText={touched.phone && errors.phone}
										error={touched.phone && !!errors.phone}
										{...fieldProps}
									/>
								</Grid>
								<Grid item xs={12}>
									{dealersQuery.status === 'loading' && <PageLoader />}
									{dealersQuery.status === 'success' && (
										<FormControl variant='outlined' fullWidth size='small'>
											<InputLabel id='dealerLabel'>Dealer</InputLabel>
											<Field
												labelId='dealerLabel'
												label='Dealer'
												name='dealerId'
												error={touched.dealerId && !!errors.dealerId}
												onChange={(e: any) => {
													const selected = e.target.value;
													setDealerId(selected);
													setFieldValue('dealerId', selected);
												}}
												as={Select}
											>
												{dealers.map((d) => (
													<MenuItem key={d.value} value={d.value}>
														{d.label}
													</MenuItem>
												))}
											</Field>
										</FormControl>
									)}
								</Grid>
								<Grid item xs={12}>
									{cashiersQuery.status === 'loading' && <PageLoader />}
									{cashiersQuery.status === 'success' && (
										<FormControl variant='outlined' fullWidth size='small'>
											<InputLabel id='cashierLabel'>Cashier</InputLabel>
											<Field
												labelId='cashierLabel'
												label='Cajero'
												name='cashierId'
												error={touched.cashierId && !!errors.cashierId}
												as={Select}
											>
												{cashiers.map((d) => (
													<MenuItem key={d.value} value={d.value}>
														{d.label}
													</MenuItem>
												))}
											</Field>
										</FormControl>
									)}
								</Grid>
								<Grid item xs={12}>
									<MultiTypeAhead
										placeholder='Seleccione los roles'
										name='roleIds'
										label='Roles'
										onChange={(_: any, vals: Option[]) => {
											setFieldValue('roleIds', vals);
										}}
										loading={rolesQuery.status === 'loading'}
										options={roles}
										value={formValues?.roleIds}
										limitTags={-1}
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
