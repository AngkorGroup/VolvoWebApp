import { positions, transitions } from 'react-alert';

export const options = {
	position: positions.TOP_RIGHT,
	timeout: 40000,
	offset: '10px',
	transition: transitions.SCALE,
	containerStyle: {
		zIndex: 1200,
	},
};
