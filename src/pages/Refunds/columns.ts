import { ACTIONS_COLUMN, COLUMN_CENTER } from 'common/constants';

export const LIQUIDATIONS_COLUMNS = [
	{ title: '#Liquidación' },
	{ title: 'Dealer' },
	{ title: 'Moneda' },
	{ title: 'Monto', props: { align: COLUMN_CENTER } },
	{ title: 'Fecha' },
	{ title: '#Consumos' },
	{ title: 'Origen' },
	{ title: 'Destino' },
	{ title: 'Fecha Pago' },
	{ title: 'Voucher' },
	{ title: 'Estado' },
	ACTIONS_COLUMN,
];

export const REFUNDS_COLUMNS = [
	{ title: '#Reembolso' },
	{ title: 'Banco' },
	{ title: 'Cuenta Bancaria' },
	{ title: 'Moneda', props: { align: COLUMN_CENTER } },
	{ title: 'Importe', props: { align: COLUMN_CENTER } },
	{ title: 'Fecha' },
	{ title: 'Estado' },
	{ title: '#Liquidaciones' },
	{ title: 'Fecha Pago' },
	{ title: '#Voucher' },
	ACTIONS_COLUMN,
];
