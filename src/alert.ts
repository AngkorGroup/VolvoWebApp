import { positions, transitions } from 'react-alert';

export const options = {
	position: positions.TOP_RIGHT,
	timeout: 4000,
	offset: '10px',
	transition: transitions.SCALE,
	containerStyle: {
		zIndex: 1200,
	},
};
