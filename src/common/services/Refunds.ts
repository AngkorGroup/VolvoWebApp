import {
	GENERATE_REFUNDS,
	REFUNDS_URL,
	SCHEDULE_REFUNDS,
} from 'common/constants/api';
import { api, Refund, Charge } from 'common/utils';

export const getRefunds = async (
	beginDate: string,
	endDate: string,
	status: string,
) => {
	return await api.get<Refund[]>(REFUNDS_URL, { beginDate, endDate, status });
};

export const getRefundConsumes = async (id: string) => {
	return await api.get<Charge[]>(`${REFUNDS_URL}/${id}/charges`);
};

export const annulateRefund = async (refundId: string) => {
	return await api.post(`${REFUNDS_URL}/${refundId}/cancel`);
};

export const generateLiquidations = async () => {
	return await api.get(GENERATE_REFUNDS);
};

export const scheduleRefunds = async (
	bankId: string,
	bankAccountId: string,
	liquidationsId: number[],
) => {
	return await api.post<any>(
		SCHEDULE_REFUNDS,
		{
			bankId,
			bankAccountId,
			liquidationsId,
		},
		{
			responseType: 'blob',
		},
	);
};

export const payRefund = async (
	id: string,
	paymentDate: string,
	voucher: string,
) => {
	return await api.post(`${REFUNDS_URL}/${id}/pay`, { paymentDate, voucher });
};

export const getQueryRefunds = async (
	key: string,
	beginDate: string,
	endDate: string,
	status: string,
) => await getRefunds(beginDate, endDate, status);

export const getQueryRefundConsumes = async (key: string, refundId: string) =>
	await getRefundConsumes(refundId);
