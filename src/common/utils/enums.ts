export enum PDFConfig {
	orientation = 'landscape',
	unit = 'pt',
	size = 'A4',
	marginLeft = 40,
	marginTop = 40,
	fontSize = 15,
	maxColumns = 11,
}

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
	Contabilizado = 'Contabilizado',
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

export enum ChargeTypeKey {
	Pending = 'Pending',
	Accepted = 'Accepted',
	Rejected = 'Rejected',
	Canceled = 'Canceled',
}

export enum ChargeType {
	Pending = 'Pendiente',
	Accepted = 'Aceptado',
	Rejected = 'Rechazado',
	Canceled = 'Cancelado',
}

export enum ContactTypeKey {
	Primary = 'Primary',
	Secondary = 'Secondary',
}

export enum ContactType {
	Primary = 'Principal',
	Secondary = 'Secundario',
}
