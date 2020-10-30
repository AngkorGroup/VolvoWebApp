import { createStyles, makeStyles, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';
import { DEFAULT_DURATION, MessageStatus } from '../../../utils/pageMessage';

interface MessageProps {
	title: string;
	message: string | JSX.Element;
	status: MessageStatus;
	duration?: number;
}

const useStyles = makeStyles(() =>
	createStyles({
		alertTitle: {
			textAlign: 'left',
			fontWeight: 700,
		},
	}),
);

const Message: React.FC<MessageProps> = ({
	title,
	message,
	status,
	duration,
}: MessageProps) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const handleClose = () => setOpen(false);
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			onClose={handleClose}
			autoHideDuration={duration || DEFAULT_DURATION}
		>
			<Alert elevation={6} onClose={handleClose} severity={status}>
				<AlertTitle className={classes.alertTitle}>{title}</AlertTitle>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Message;
