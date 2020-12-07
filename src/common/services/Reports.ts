import { REPORT_URL } from 'common/constants';
import { api } from 'common/utils';

export type ReportType = 'excel' | 'pdf';

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
	return await api.post(`${REPORT_URL}/${url}`, body, {
		responseType: 'blob',
	});
};

export const REPORT_ENDPOINTS: Record<string, any> = {
	consumes_by_client: performRequest('consumes_by_client'),
	charges_by_dealer: performRequest('charges_by_dealer'),
	consumes_ranking: performRequest('consumes_ranking'),
	charges_ranking: performRequest('charges_ranking'),
	charges_by_client: performRequest('charges_by_client'),
	clients_card_use: performRequest('clients_card_use'),
	clients_card_expiration: performRequest('clients_card_expiration'),
	consumes_by_business_area: performRequest('consumes_by_business_area'),
	consumes_by_economic: performRequest('consumes_by_economic'),
	client_consumes_by_dealer: performRequest('client_consumes_by_dealer'),
	refunds: performRequest('refunds'),
	pending_charges_refund: performRequest('pending_charges_refund'),
	unsigned_contacts: performRequest('unsigned_contacts'),
};
