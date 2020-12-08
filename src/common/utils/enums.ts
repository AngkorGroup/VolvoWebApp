export enum UserType {
	WebAdmin = 'WebAdmin',
	Contacto = 'Contacto',
	Cajero = 'Cajero',
}

export enum LiquidationStatus {
	Anulado = 'Anulado',
	Generado = 'Generado',
	Programado = 'Programado',
	Pagado = 'Pagado',
}

export enum RefundStatus {
	Anulado = 'Anulado',
	Programado = 'Programado',
	Pagado = 'Pagado',
}

export enum MovementType {
	Creation = 'CTA',
	Recharge = 'REC',
	TransferIn = 'ITR',
	TransferOut = 'STR',
	Consume = 'CON',
	Canceled = 'CVT',
	Extended = 'AVT',
}

export enum ChargeType {
	Pendiente = 'Pendiente',
	Aceptado = 'Aceptado',
	Rechazado = 'Rechazado',
	Cancelado = 'Cancelado',
}
