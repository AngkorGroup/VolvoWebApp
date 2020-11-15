import React from 'react';
import { useQuery } from 'react-query';
import PageActionBar from '../PageActionBar/PageActionBar';

interface ReportMakerProps {
	filterClient?: boolean;
	filterDateRange?: boolean;
	filterCardType?: boolean;
	filterDealer?: boolean;
	filterEconomicGroup?: boolean;
	filterBusinessArea?: boolean;
	filterRechargeType?: boolean;
	filterSector?: boolean;
}

const ReportMaker: React.FC<ReportMakerProps> = ({
	filterClient,
	filterDateRange,
	filterCardType,
	filterDealer,
	filterEconomicGroup,
	filterBusinessArea,
	filterRechargeType,
	filterSector,
}) => {
	let clients = null;
	if (filterClient) {
		//clients = useQuery( )
	}
	return (
		<div>
			<PageActionBar>asd</PageActionBar>
		</div>
	);
};

export default ReportMaker;
