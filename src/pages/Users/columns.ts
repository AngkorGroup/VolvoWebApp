import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const USER_COLUMNS = [
	{ title: 'Código' },
	{ title: 'Nombre' },
	{ title: 'Email' },
	{ title: 'Teléfono' },
	{ title: 'Fecha de Creación' },
	{ title: 'Tipo' },
	{ title: 'Estado' },
	{ title: 'Fecha de Baja' },
	ACTIONS_COLUMN,
];

export const BATCH_COLUMNS = [
	{ title: 'Número' },
	{ title: 'Fecha de Creación' },
	{ title: 'Tipo' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: COLUMN_CENTER } },
];
