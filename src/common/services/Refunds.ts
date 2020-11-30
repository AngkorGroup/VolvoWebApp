import { REFUNDS_URL } from 'common/constants/api';
import { api, Liquidation, Refund } from 'common/utils';

export const getRefunds = async (
	beginDate: string,
	endDate: string,
	status: string,
) => {
	return await api.get<Refund[]>(REFUNDS_URL, {
		beginDate,
		endDate,
		status,
	});
};

export const getRefundLiquidations = async (id: string) => {
	return await api.get<Liquidation[]>(`${REFUNDS_URL}/${id}/liquidations`);
};

export const payRefund = async (
	id: string,
	paymentDate: string,
	voucher: string,
) => {
	return await api.post(`${REFUNDS_URL}/${id}/pay`, {
		paymentDate,
		voucher,
	});
};

export const getQueryRefunds = async (
	key: string,
	beginDate: string,
	endDate: string,
	status: string,
) => await getRefunds(beginDate, endDate, status);

export const getQueryRefundLiquidations = async (key: string, id: string) => {
	return await getRefundLiquidations(id);
};

export const cancelRefund = async (id: string) => {
	return await api.post(`${REFUNDS_URL}/${id}/cancel`);
};
