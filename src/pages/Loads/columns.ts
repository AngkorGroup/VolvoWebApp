import { COLUMN_CENTER } from 'common/constants/tableColumn';

export const LOAD_COLUMNS = [
	{ title: 'Contrato' },
	{ title: 'RUC' },
	{ title: 'Razón Social' },
	{ title: 'Fecha' },
	{ title: 'Chasis' },
	{ title: 'Factura' },
	{ title: 'Importe' },
	{ title: 'Moneda' },
	{ title: 'Tipo' },
	{ title: 'Motivo' },
	{ title: 'Tipo Tarjeta' },
	{ title: '#TopPerú' },
];

export const ERROR_COLUMNS = [
	{ title: 'Línea', props: { align: COLUMN_CENTER } },
	{ title: 'Error' },
];
