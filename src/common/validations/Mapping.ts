import { TEXT_MAX_LENGTH } from 'common/constants';
import yup from './YupLocale';

interface MappingForm {
	type: string;
	mappingNumber: string;
	description: string;
	company: string;
	feeder: string;
	file: string;
	username: string;
	password: string;
	date: string;
	filler?: string;
	version?: string;
	receiverLogicalID?: string;
	receiverComponentID?: string;
	senderLogicalID?: string;
	senderComponentID?: string;
}

export const MappingSchema = yup.object<MappingForm>({
	mappingNumber: yup.string().max(TEXT_MAX_LENGTH).required(),
	type: yup.string().max(TEXT_MAX_LENGTH).required(),
	description: yup.string().max(TEXT_MAX_LENGTH).required(),
	company: yup.string().max(TEXT_MAX_LENGTH).required(),
	feeder: yup.string().max(TEXT_MAX_LENGTH).required(),
	file: yup.string().max(TEXT_MAX_LENGTH).required(),
	username: yup.string().max(TEXT_MAX_LENGTH).required(),
	password: yup.string().max(TEXT_MAX_LENGTH).required(),
	date: yup.string().max(TEXT_MAX_LENGTH).required(),
	filler: yup.string().max(TEXT_MAX_LENGTH),
	version: yup.string().max(TEXT_MAX_LENGTH),
	receiverLogicalID: yup.string().max(TEXT_MAX_LENGTH),
	receiverComponentID: yup.string().max(TEXT_MAX_LENGTH),
	senderLogicalID: yup.string().max(TEXT_MAX_LENGTH),
	senderComponentID: yup.string().max(TEXT_MAX_LENGTH),
});

interface MappingHeaderForm {
	type: string;
	recordType: string;
	company: string;
	documentNumber?: string;
	reference: string;
	control: string;
	documentType: string;
	documentDate: string;
	postDate: string;
	currency: string;
	exchangeRate?: string;
	documentHeader: string;
	translationDate?: string;
	intercompanyNumber?: string;
	tradingPartner?: string;
	exchangeRateType?: string;
	postingPeriod?: string;
	exchangeRateToFactor?: string;
	exchangeRateFromFactor?: string;
	reversalReason?: string;
	reversalDate?: string;
}

export const MappingHeaderSchema = yup.object<MappingHeaderForm>({
	type: yup.string().max(TEXT_MAX_LENGTH).required(),
	recordType: yup.string().max(TEXT_MAX_LENGTH).required(),
	company: yup.string().max(TEXT_MAX_LENGTH).required(),
	documentNumber: yup.string().max(TEXT_MAX_LENGTH),
	reference: yup.string().max(TEXT_MAX_LENGTH).required(),
	control: yup.string().max(TEXT_MAX_LENGTH).required(),
	documentType: yup.string().max(TEXT_MAX_LENGTH).required(),
	documentDate: yup.string().max(TEXT_MAX_LENGTH).required(),
	postDate: yup.string().max(TEXT_MAX_LENGTH).required(),
	currency: yup.string().max(TEXT_MAX_LENGTH).required(),
	exchangeRate: yup.string().max(TEXT_MAX_LENGTH),
	documentHeader: yup.string().max(TEXT_MAX_LENGTH).required(),
	translationDate: yup.string().max(TEXT_MAX_LENGTH),
	intercompanyNumber: yup.string().max(TEXT_MAX_LENGTH),
	tradingPartner: yup.string().max(TEXT_MAX_LENGTH),
	exchangeRateType: yup.string().max(TEXT_MAX_LENGTH),
	postingPeriod: yup.string().max(TEXT_MAX_LENGTH),
	exchangeRateToFactor: yup.string().max(TEXT_MAX_LENGTH),
	exchangeRateFromFactor: yup.string().max(TEXT_MAX_LENGTH),
	reversalReason: yup.string().max(TEXT_MAX_LENGTH),
	reversalDate: yup.string().max(TEXT_MAX_LENGTH),
});

interface MappingDetailForm {
	type: string;
	documentType: string;
	line: string;
	recordType: string;
	company: string;
	reference?: string;
	postKey?: string;
	account?: string;
	sign?: string;
	taxCode?: string;
	taxAmount?: string;
	costCenter?: string;
	profitCenter?: string;
	tradePartner?: string;
	docText?: string;
	moreInfo?: string;
	businessArea?: string;
	market?: string;
	customer?: string;
	productModel?: string;
	lineType?: string;
	classification?: string;
}

export const MappingDetailSchema = yup.object<MappingDetailForm>({
	type: yup.string().max(TEXT_MAX_LENGTH).required(),
	documentType: yup.string().max(TEXT_MAX_LENGTH).required(),
	line: yup.string().max(TEXT_MAX_LENGTH).required(),
	recordType: yup.string().max(TEXT_MAX_LENGTH).required(),
	company: yup.string().max(TEXT_MAX_LENGTH).required(),
	reference: yup.string().max(TEXT_MAX_LENGTH),
	postKey: yup.string().max(TEXT_MAX_LENGTH),
	account: yup.string().max(TEXT_MAX_LENGTH),
	sign: yup.string().max(TEXT_MAX_LENGTH),
	taxCode: yup.string().max(TEXT_MAX_LENGTH),
	taxAmount: yup.string().max(TEXT_MAX_LENGTH),
	costCenter: yup.string().max(TEXT_MAX_LENGTH),
	profitCenter: yup.string().max(TEXT_MAX_LENGTH),
	tradePartner: yup.string().max(TEXT_MAX_LENGTH),
	docText: yup.string().max(TEXT_MAX_LENGTH),
	moreInfo: yup.string().max(TEXT_MAX_LENGTH),
	businessArea: yup.string().max(TEXT_MAX_LENGTH),
	market: yup.string().max(TEXT_MAX_LENGTH),
	customer: yup.string().max(TEXT_MAX_LENGTH),
	productModel: yup.string().max(TEXT_MAX_LENGTH),
	lineType: yup.string().max(TEXT_MAX_LENGTH),
	classification: yup.string().max(TEXT_MAX_LENGTH),
});
