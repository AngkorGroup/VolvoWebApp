import {
	ACTIONS_COLUMN,
	COLUMN_CENTER,
} from '../../common/constants/tableColumn';

export const CONSUMES_COLUMNS = [
	{ title: '#Voucher' },
	{ title: 'Tipo' },
	{ title: 'Número de Tarjeta' },
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
