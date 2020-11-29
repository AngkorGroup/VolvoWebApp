import {
	GENERATE_LIQUIDATIONS,
	LIQUIDATIONS_URL,
	SCHEDULE_LIQUIDATIONS,
} from 'common/constants/api';
import { api, Liquidation, Charge } from 'common/utils';

export const getLiquidations = async (
	beginDate: string,
	endDate: string,
	status: string,
) => {
	return await api.get<Liquidation[]>(LIQUIDATIONS_URL, {
		beginDate,
		endDate,
		status,
	});
};

export const getLiquidationConsumes = async (id: string) => {
	return await api.get<Charge[]>(`${LIQUIDATIONS_URL}/${id}/charges`);
};

export const annulateLiquidation = async (id: string) => {
	return await api.post(`${LIQUIDATIONS_URL}/${id}/cancel`);
};

export const generateLiquidations = async () => {
	return await api.get(GENERATE_LIQUIDATIONS);
};

export const scheduleLiquidations = async (
	bankId: string,
	bankAccountId: string,
	liquidationsId: number[],
) => {
	return await api.post<any>(
		SCHEDULE_LIQUIDATIONS,
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

export const payLiquidation = async (
	id: string,
	paymentDate: string,
	voucher: string,
) => {
	return await api.post(`${LIQUIDATIONS_URL}/${id}/pay`, {
		paymentDate,
		voucher,
	});
};

export const getQueryLiquidations = async (
	key: string,
	beginDate: string,
	endDate: string,
	status: string,
) => await getLiquidations(beginDate, endDate, status);

export const getQueryLiquidationConsumes = async (key: string, id: string) =>
	await getLiquidationConsumes(id);
