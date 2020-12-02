import { RechargeType } from 'common/utils';

export interface RechargeTypeColumn {
	id: string;
	name: string;
	tpCode: string;
	status: string;
	archiveAt: string;
}

export const mapRechargeType = (dt: RechargeType): RechargeTypeColumn => {
	return {
		id: `${dt.id}`,
		name: dt.name,
		tpCode: dt.tpCode,
		status: dt.status,
		archiveAt: dt.archiveAt,
	};
};

export const mapRechargeTypes = (
	rechargeTypes: RechargeType[],
): RechargeTypeColumn[] => {
	return rechargeTypes.map(mapRechargeType);
};
