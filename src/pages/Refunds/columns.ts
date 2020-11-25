import { ACTIONS_COLUMN, COLUMN_CENTER } from 'common/constants';

export const REFUNDS_COLUMNS = [
	{ title: '#Liquidación' },
	{ title: 'Dealer' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	{ title: 'Fecha' },
	{ title: 'Estado' },
	ACTIONS_COLUMN,
];
