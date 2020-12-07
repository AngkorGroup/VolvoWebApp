import {
	Card,
	CardActions,
	CardContent,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { buildAlertBody as at } from 'common/utils';
import AppContext from 'AppContext';
import { VolvoButton } from 'common/components';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import React, { useContext, useState } from 'react';
import PasswordFormModal from './PasswordFormModal/PasswordFormModal';
import { changePassword } from 'common/services';
import { ChangePasswordForm } from 'common/validations';
import { useAlert } from 'react-alert';

const useStyles = makeStyles({
	root: {
		margin: '0 auto',
		minWidth: 275,
		maxWidth: 350,
	},
	title: {
		marginBottom: 15,
	},
	text: {
		textAlign: 'start',
	},
	actions: {
		justifyContent: 'center',
	},
});

const Profile = () => {
	const { user } = useContext(AppContext);
	const alert = useAlert();
	const classes = useStyles();
	const [showModal, setShowModal] = useState(false);

	const onChangePassword = async (data: ChangePasswordForm) => {
		const response = await changePassword(data);
		if (response.ok) {
			alert.success(
				at(
					'Contraseña Cambiada',
					'Se cambió la contraseña actual correctamente.',
				),
			);
		} else {
			alert.error(
				at('Ocurrió un error', 'Hubo un error al cambiar la contraseña.'),
			);
		}
	};

	return (
		<>
			<Card className={classes.root} variant='outlined'>
				<CardContent>
					<Typography className={classes.title} variant='h4' component='h2'>
						Perfil
					</Typography>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<FaceIcon />
						</Grid>
						<Grid item xs={10}>
							<Typography className={classes.text} color='textSecondary'>
								{user?.fullName}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<EmailIcon />
						</Grid>
						<Grid item xs={10}>
							<Typography className={classes.text} color='textSecondary'>
								{user?.email}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<PhoneIcon />
						</Grid>
						<Grid item xs={10}>
							<Typography className={classes.text} color='textSecondary'>
								{user?.phone}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.actions}>
					<VolvoButton
						onClick={() => setShowModal(true)}
						color='success'
						text='Cambiar Contraseña'
					/>
				</CardActions>
			</Card>
			{showModal && (
				<PasswordFormModal
					show={showModal}
					title='Cambiar Contraseña'
					onClose={() => setShowModal(false)}
					onConfirm={onChangePassword}
				/>
			)}
		</>
	);
};

export default Profile;
