import { ANNULATE_REFUND, REFUNDS_URL } from 'common/constants/api';
import { api, Refund, Charge } from 'common/utils';

export const getRefunds = async (date: string, status: string) => {
	return await api.get<Refund[]>(REFUNDS_URL, { date, status });
};

export const getRefundConsumes = async (id: string) => {
	return await api.get<Charge[]>(`${REFUNDS_URL}/${id}/consumes`);
};

export const annulateRefund = async (refundId: string) => {
	return await api.post(ANNULATE_REFUND, { refundId });
};

export const getQueryRefunds = async (
	key: string,
	date: string,
	status: string,
) => await getRefunds(date, status);

export const getQueryRefundConsumes = async (key: string, refundId: string) =>
	await getRefundConsumes(refundId);
