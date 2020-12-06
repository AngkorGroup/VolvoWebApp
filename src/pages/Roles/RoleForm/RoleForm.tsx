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
import { MultiTypeAhead, VolvoButton } from 'common/components';
import React, { useMemo } from 'react';
import { RoleForm, RoleSchema } from 'common/validations';
import { useQuery } from 'react-query';
import { getMenus } from 'common/services';
import { Option, parseMenuList } from 'common/utils';

interface RoleFormModalProps {
	show: boolean;
	title: string;
	values?: RoleForm;
	onClose: () => void;
	onConfirm: (data: RoleForm) => void;
}

const initialValues: RoleForm = {
	id: '',
	name: '',
	roleMenus: [],
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

const RoleFormModal: React.FC<RoleFormModalProps> = ({
	show,
	title,
	values,
	onClose,
	onConfirm,
}: RoleFormModalProps) => {
	const classes = useStyles();
	const { data, status } = useQuery('getMenus', getMenus);
	const menus = useMemo(() => {
		if (data?.ok) {
			return parseMenuList(data?.data || []);
		}
		return [];
	}, [data]);

	const handleSubmit = (data: RoleForm) => {
		onConfirm(data);
		onClose();
	};
	return (
		<Dialog fullWidth maxWidth='md' open={show} onClose={onClose}>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<Formik
				initialValues={values || initialValues}
				onSubmit={handleSubmit}
				validationSchema={RoleSchema}
			>
				{({ values, touched, errors, setFieldValue }) => (
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
									<MultiTypeAhead
										placeholder='Seleccione los menús'
										name='roleMenus'
										label='Menús'
										onChange={(_: any, values: Option[]) => {
											setFieldValue('roleMenus', values);
										}}
										loading={status === 'loading'}
										options={menus}
										value={values.roleMenus}
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

export default RoleFormModal;
