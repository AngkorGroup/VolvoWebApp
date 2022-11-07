export const MAPPING_COLUMNS = [
	{ Header: 'N° Mapping', accessor: 'mappingNumber' },
	{ Header: 'TipMap', accessor: 'type' },
	{ Header: 'Descripción', accessor: 'description' },
	{ Header: 'Company', accessor: 'company' },
	{ Header: 'Feeder', accessor: 'feeder' },
	{ Header: 'File', accessor: 'file' },
	{ Header: 'Username', accessor: 'username' },
	{ Header: 'Password', accessor: 'password' },
	{ Header: 'Date', accessor: 'date' },
	{ Header: 'Filler', accessor: 'filler' },
	{ Header: 'Version', accessor: 'version' },
	{ Header: 'ReceiverLogicalID', accessor: 'receiverLogicalID' },
	{ Header: 'ReceiverComponentID', accessor: 'receiverComponentID' },
	{ Header: 'SenderLogicalID', accessor: 'senderLogicalID' },
	{ Header: 'SenderComponentID', accessor: 'senderComponentID' },
];

export const MAPPING_HEADER_COLUMNS = [
	{ Header: 'TipMap', accessor: 'type' },
	{ Header: 'Tipo Record', accessor: 'recordType' },
	{ Header: 'Company', accessor: 'company' },
	{ Header: 'Documento', accessor: 'documentNumber' },
	{ Header: 'Reference', accessor: 'reference' },
	{ Header: 'Control', accessor: 'control' },
	{ Header: 'Tipo Doc', accessor: 'documentType' },
	{ Header: 'Fecha Doc', accessor: 'documentDate' },
	{ Header: 'Fecha Post', accessor: 'postDate' },
	{ Header: 'Currency', accessor: 'currency' },
	{ Header: 'ExcRate', accessor: 'exchangeRate' },
	{ Header: 'Cabecera', accessor: 'documentHeader' },
	{ Header: 'TranslDate', accessor: 'translationDate' },
	{ Header: 'Intercompany', accessor: 'intercompanyNumber' },
	{ Header: 'Trad Partner', accessor: 'tradingPartner' },
	{ Header: 'ExcType', accessor: 'exchangeRateType' },
	{ Header: 'PostPeriod', accessor: 'postingPeriod' },
	{ Header: 'ExcToFactor', accessor: 'exchangeRateToFactor' },
	{ Header: 'ExcFromFactor', accessor: 'exchangeRateFromFactor' },
	{ Header: 'RevReason', accessor: 'reversalReason' },
	{ Header: 'RevDate', accessor: 'reversalDate' },
];

export const MAPPING_DETAIL_COLUMNS = [
	{ Header: 'TipMap', accessor: 'type' },
	{ Header: 'TipDoc', accessor: 'documentType' },
	{ Header: 'line', accessor: 'line' },
	{ Header: 'RecordType', accessor: 'recordType' },
	{ Header: 'Company', accessor: 'company' },
	{ Header: 'Reference', accessor: 'reference' },
	{ Header: 'PostKey', accessor: 'postKey' },
	{ Header: 'Account', accessor: 'account' },
	{ Header: 'Sign', accessor: 'sign' },
	{ Header: 'TaxCode', accessor: 'taxCode' },
	{ Header: 'TaxAmount', accessor: 'taxAmount' },
	{ Header: 'CostCenter', accessor: 'costCenter' },
	{ Header: 'ProfitCenter', accessor: 'profitCenter' },
	{ Header: 'TradePartner', accessor: 'tradePartner' },
	{ Header: 'DocText', accessor: 'docText' },
	{ Header: 'MoreInfo', accessor: 'moreInfo' },
	{ Header: 'BusinessArea', accessor: 'businessArea' },
	{ Header: 'Market', accessor: 'market' },
	{ Header: 'Customer', accessor: 'customer' },
	{ Header: 'ProductModel', accessor: 'productModel' },
	{ Header: 'LineType', accessor: 'lineType' },
	{ Header: 'Classif', accessor: 'classification' },
];
