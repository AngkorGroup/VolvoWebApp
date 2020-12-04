import { CommonValue } from 'common/utils';

export interface BusinessAreaColumn {
	id: string;
	name: string;
	tpCode: string;
	abbreviation:string;
	sunatCode: string;
	status: string;
	archiveAt: string;
}

export const mapBusinessArea = (dt: CommonValue): BusinessAreaColumn => {
	return {
		id: `${dt.id}`,
		name: dt.name,
		tpCode: dt.tpCode,
		abbreviation:dt.abbreviation,
		sunatCode: dt.sunatCode,
		status: dt.status,
		archiveAt: dt.archiveAt,
	};
};

export const mapBusinessAreas = (
	businessAreas: CommonValue[],
): BusinessAreaColumn[] => {
	return businessAreas.map(mapBusinessArea);
};
