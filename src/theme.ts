import { Overrides } from '@material-ui/core/styles/overrides';

const colors = {
	// Corporate Colors
	volvoBlue: '#182871',
	volvoSilver: '#8D9192',
	volvoWhite: '#FFF',
	volvoBlack: '#222222',

	// Profile Colors
	granite: '#4D4E63',
	slate: '#919296',
	fog: '#D8D7D5',
	grass: '#78B833',
	cloudberry: '#DD7611',
	midnightSun: '#FCCC82',
	ocean: '#16A6C9',
	sky: '#BADCE6',
	mud: '#704E36',
	sand: '#DCCCA7',

	// Accent Colors
	heather: '#763369',
	raspberry: '#D84451',

	// Signal Colors
	success: '#47962D',
	warning: '#F7D302',
	error: '#C4001A',

	// Others
	elegantBlack: '#353535',
	elegantBlue: '#1b2430',
	elegantDarkBlue: '#121820',
	navHover: 'rgba(0,0,0,0.08)',
};

const palette = {
	primary: {
		main: colors.volvoBlue,
		light: colors.elegantBlue,
		dark: colors.elegantDarkBlue,
		contrastText: colors.volvoWhite,
	},
	success: {
		main: colors.success,
	},
	warning: {
		main: colors.warning,
	},
	error: {
		main: colors.error,
	},
	info: {
		main: colors.ocean,
	},
	text: {
		primary: colors.granite,
		secondary: colors.elegantBlack,
	},
	action: {
		disabled: colors.fog,
	},
};

const typography = {
	fontFamily: [
		'VolvoNovum',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
	].join(','),
};

const overrides: Overrides = {
	MuiListItem: {
		button: {
			'&:hover': {
				backgroundColor: colors.navHover,
			},
		},
	},
	MuiListItemIcon: {
		root: {
			color: colors.slate,
			minWidth: '40px',
		},
	},
	MuiDialogTitle: {
		root: {
			textAlign: 'center',
		},
	},
	MuiDialogContent: {
		root: {
			textAlign: 'center',
		},
	},
};

export default {
	palette,
	typography,
	overrides,
};
