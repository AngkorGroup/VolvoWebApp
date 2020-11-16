import { PageTitle } from 'common/components';
import ReportMaker from 'common/components/ReportMaker/ReportMaker';
import { REPORT_ENDPOINTS } from 'common/services';
import React from 'react';

const ConsumesByClient = () => {
	return (
		<div>
			<div>
				<PageTitle title='Consumos por Cliente' />
			</div>
			<ReportMaker
				filterClient
				filterDateRange
				filterCardType
				endpoint={REPORT_ENDPOINTS['ConsumesByClient']}
			/>
		</div>
	);
};

export default ConsumesByClient;
