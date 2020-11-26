import { ACTIONS_COLUMN, COLUMN_CENTER } from 'common/constants';

export const REFUNDS_COLUMNS = [
	{ title: '#Liquidación' },
	{ title: 'Dealer' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	{ title: 'Fecha' },
	ACTIONS_COLUMN,
];

export const CHARGES_COLUMNS = [
	{ title: '#Voucher' },
	{ title: 'Tipo' },
	{ title: '#Tarjeta' },
	{ title: 'Cajero' },
	{ title: 'Cliente' },
	{ title: 'Fecha Op.' },
	{ title: 'Cobro' },
	{ title: 'Estado' },
	{ title: 'Contacto' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	ACTIONS_COLUMN,
];
