import { CommonValue } from 'common/utils';

export interface DocumentTypeColumn {
	id: string;
	name: string;
	tpCode: string;
	abbreviation: string;
	sunatCode: string;
	status: string;
	archiveAt: string;
}

export const mapDocumentType = (dt: CommonValue): DocumentTypeColumn => {
	return {
		id: `${dt.id}`,
		name: dt.name,
		tpCode: dt.tpCode,
		abbreviation: dt.abbreviation,
		sunatCode: dt.sunatCode,
		status: dt.status,
		archiveAt: dt.archiveAt,
	};
};

export const mapDocumentTypes = (
	documentTypes: CommonValue[],
): DocumentTypeColumn[] => {
	return documentTypes.map(mapDocumentType);
};
