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

const getConsumesByClientReport = async ({
	type,
	clientId,
	startDate,
	endDate,
	cardTypes,
}: FilterParams) => {
	return await api.post(`${REPORT_URL}/consumes_by_client`, {
		type,
		clientId,
		startDate,
		endDate,
		cardTypes,
	});
};

export const REPORT_ENDPOINTS = {
	ConsumesByClient: getConsumesByClientReport,
};
