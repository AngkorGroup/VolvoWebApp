import { createStyles, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getPageAlertMessage } from 'common/utils';
import React from 'react';
import { AlertComponentPropsWithStyle } from 'react-alert';

const useStyles = makeStyles(() =>
	createStyles({
		alertTitle: {
			textAlign: 'left',
			fontWeight: 700,
		},
	}),
);

const AlertMessage: React.FC<AlertComponentPropsWithStyle> = ({
	style,
	options,
	message,
	close,
}) => {
	const classes = useStyles();
	const { title, body } = getPageAlertMessage(message as string);
	return (
		<Alert style={style} elevation={6} onClose={close} severity={options.type}>
			<AlertTitle className={classes.alertTitle}>{title}</AlertTitle>
			{body}
		</Alert>
	);
};

export default AlertMessage;
