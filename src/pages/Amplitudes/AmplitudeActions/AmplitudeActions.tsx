import { makeStyles } from '@material-ui/core';
import { VolvoIconButton } from 'common/components';
import React, { useState } from 'react';
import EventIcon from '@material-ui/icons/Event';
import { TableLoad } from '../interfaces';
import ExtendModal from '../ExtendModal/ExtendModal';

interface AmplitudeActionsProps {
	item: TableLoad;
	onExtend: (id: string, date: string) => void;
}

const useStyles = makeStyles({
	actionButtons: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
});

const AmplitudeActions: React.FC<AmplitudeActionsProps> = ({
	item,
	onExtend,
}) => {
	const classes = useStyles();
	const [showModal, setShowModal] = useState(false);
	const { id } = item;
	return (
		<div className={classes.actionButtons}>
			<VolvoIconButton color='primary' onClick={() => setShowModal(true)}>
				<EventIcon />
			</VolvoIconButton>
			{showModal && (
				<ExtendModal
					title='Ampliar Vencimiento'
					show={showModal}
					id={id}
					onClose={() => setShowModal(false)}
					onConfirm={onExtend}
				/>
			)}
		</div>
	);
};

export default AmplitudeActions;
