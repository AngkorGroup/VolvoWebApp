import { CommonValue } from 'common/utils';

export interface SectorColumn {
	id: string;
	name: string;
	tpCode: string;
	abbreviation: string;
	sunatCode: string;
	status: string;
	archiveAt: string;
}

export const mapSector = (dt: CommonValue): SectorColumn => {
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

export const mapSectors = (
	sectors: CommonValue[],
): SectorColumn[] => {
	return sectors.map(mapSector);
};
