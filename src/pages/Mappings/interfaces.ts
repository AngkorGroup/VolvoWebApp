import { Mapping, MappingDetail, MappingHeader } from 'common/utils';

export interface TableMapping {
	id: number;
	mappingNumber: string;
	type: string;
	description: string;
	company: string;
	feeder: string;
	file: string;
	username: string;
	password: string;
	date: string;
	filler: string;
	version: string;
	receiverLogicalID: string;
	receiverComponentID: string;
	senderLogicalID: string;
	senderComponentID: string;
	createdAt: string;
	createdBy: string;
	archiveAt: string;
}

export interface TableMappingHeader {
	id: number;
	type: string;
	recordType: string;
	company: string;
	documentNumber: string;
	reference: string;
	control: string;
	documentType: string;
	documentDate: string;
	postDate: string;
	currency: string;
	exchangeRate: string;
	documentHeader: string;
	translationDate: string;
	intercompanyNumber: string;
	tradingPartner: string;
	exchangeRateType: string;
	postingPeriod: string;
	exchangeRateToFactor: string;
	exchangeRateFromFactor: string;
	reversalReason: string;
	reversalDate: string;
	createdAt: string;
	createdBy: string;
	archiveAt: string;
}

export interface TableMappingDetail {
	id: number;
	type: string;
	documentType: string;
	line: string;
	recordType: string;
	company: string;
	reference: string;
	postKey: string;
	account: string;
	sign: string;
	taxCode: string;
	taxAmount: string;
	costCenter: string;
	profitCenter: string;
	tradePartner: string;
	docText: string;
	moreInfo: string;
	businessArea: string;
	market: string;
	customer: string;
	productModel: string;
	lineType: string;
	classification: string;
}

export type MappingForm = Partial<TableMapping>;
export type MappingHeaderForm = Partial<TableMappingHeader>;
export type MappingDetailForm = Partial<TableMappingDetail>;

export const mapMapping = (mappings: Mapping): TableMapping => ({
	...mappings,
});

export const mapMappings = (mappings: Mapping[]): TableMapping[] => {
	return mappings.map(mapMapping);
};

export const mapMappingHeader = (
	mappings: MappingHeader,
): TableMappingHeader => ({
	...mappings,
});

export const mapMappingHeaders = (
	mappings: MappingHeader[],
): TableMappingHeader[] => {
	return mappings.map(mapMappingHeader);
};

export const mapMappingDetail = (
	mappings: MappingDetail,
): TableMappingDetail => ({
	...mappings,
});

export const mapMappingDetails = (
	mappings: MappingDetail[],
): TableMappingDetail[] => {
	return mappings.map(mapMappingDetail);
};
