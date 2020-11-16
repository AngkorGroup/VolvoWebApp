import { REPORT_URL } from 'common/constants';
import { api } from 'common/utils';

type ReportType = 'excel' | 'pdf';

export interface FilterParams {
	type: ReportType;
	clientId?: string;
	startDate?: string;
	endDate?: string;
	cardTypes?: string[];
	dealerId?: string;
	economicGroup?: boolean;
	businessAreas?: string[];
	chargeTypes?: string[];
	sectors?: string[];
}

const performRequest = (url: string) => async (body: FilterParams) => {
	return await api.post(`${REPORT_URL}/${url}`, body);
};

export const REPORT_ENDPOINTS: Record<string, any> = {
	ConsumesByClient: performRequest('consumes_by_client'),
	ChargesByDealer: performRequest('charges_by_dealer'),
	ConsumesRanking: performRequest('consumes_ranking'),
	ChargesRanking: performRequest('charges_ranking'),
	ChargesByClient: performRequest('charges_by_client'),
	ClientsCardUse: performRequest('clients_card_use'),
	ClientsCardExpiration: performRequest('clients_card_expiration'),
	ConsumesByBusinessArea: performRequest('consumes_by_business_area'),
	ConsumesByEconomic: performRequest('consumes_by_economic'),
	ClientConsumesByDealer: performRequest('client_consumes_by_dealer'),
	Refunds: performRequest('refunds'),
	PendingChargesRefund: performRequest('pending_charges_refund'),
};
