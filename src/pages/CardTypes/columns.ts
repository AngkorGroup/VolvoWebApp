import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const CARD_TYPE_COLUMNS = [
	{ title: 'Tipo Tarjeta' },
	{ title: 'Descripción' },
	{ title: 'Moneda' },
	{ title: 'Plazo(meses)' },
	{ title: 'Logo', props: { align: COLUMN_CENTER } },
	{ title: 'Fecha Creación' },
	{ title: 'Estado' },
	{ title: 'Fecha Baja' },
	ACTIONS_COLUMN,
];
