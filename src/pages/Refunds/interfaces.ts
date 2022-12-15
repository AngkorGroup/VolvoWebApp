import { Refund, RefundStatus } from 'common/utils';

export interface RefundColumn {
	id: string;
	bank: string;
	account: string;
	currency: string;
	total: number;
	date: string;
	refundStatus: string;
	liquidationsCount: string;
	paymentDate: string;
	voucher: string;
}

export const mapRefunds = (refunds: Refund[]): RefundColumn[] => {
	return refunds.map((r) => ({
		id: `${r.id}`,
		bank: r.bankAccount?.bank?.name,
		account: r.bankAccount?.account,
		currency: r.amount?.currency?.symbol,
		total: r.amount?.value,
		date: r.date,
		refundStatus: r.refundStatus,
		liquidationsCount: `${r.liquidationsCount}`,
		paymentDate: r.paymentDate,
		voucher: r.voucher,
	}));
};

export const isCanceled = (st: string) => st === RefundStatus.Anulado;
export const isPaid = (st: string) => st === RefundStatus.Pagado;
export const isScheduled = (st: string) => st === RefundStatus.Programado;
export const isTabulated = (st: string) => st === RefundStatus.Contabilizado;
