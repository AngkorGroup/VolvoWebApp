import { Sector } from 'common/utils';

export interface SectorColumn {
	id: string;
	name: string;
	tpCode: string;
	status: string;
	archiveAt: string;
}

export const mapSector = (dt: Sector): SectorColumn => {
	return {
		id: `${dt.id}`,
		name: dt.name,
		tpCode: dt.tpCode,
		status: dt.status,
		archiveAt: dt.archiveAt,
	};
};

export const mapSectors = (
	sectors: Sector[],
): SectorColumn[] => {
	return sectors.map(mapSector);
};
