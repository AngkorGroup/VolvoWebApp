import { Grid } from '@material-ui/core';
import {
	FilterParams,
	getQueryBusinessAreas,
	getQueryCardTypes,
	getQueryRechargeTypes,
	getQuerySectors,
} from 'common/services';
import { parseCardTypes, parseCommonValue } from 'common/utils';
import React, { useContext } from 'react';
import VolvoButton from '../VolvoButton/VolvoButton';
import {
	FilterClients,
	FilterDateRange,
	FilterDealers,
	FilterEconomicGroup,
	FilterMultiSelect,
} from './Filters';
import ReportMakerContext, { ReportMakerProvider } from './ReportMakerContext';

interface ReportMakerProps {
	filterClient?: boolean;
	filterDateRange?: boolean;
	filterCardType?: boolean;
	filterDealer?: boolean;
	filterEconomicGroup?: boolean;
	filterBusinessArea?: boolean;
	filterRechargeType?: boolean;
	filterSector?: boolean;
	endpoint: (params: FilterParams) => any;
}

const InnerComponent: React.FC<ReportMakerProps> = ({
	filterClient,
	filterDateRange,
	filterCardType,
	filterDealer,
	filterEconomicGroup,
	filterBusinessArea,
	filterRechargeType,
	filterSector,
	endpoint,
}) => {
	const params = useContext(ReportMakerContext);
	const exportPDF = async () => await endpoint({ type: 'pdf', ...params });
	const exportExcel = async () => await endpoint({ type: 'excel', ...params });
	return (
		<div>
			<Grid container spacing={1}>
				{filterClient && (
					<Grid item xs={6}>
						<FilterClients />
					</Grid>
				)}
				{filterDealer && (
					<Grid item xs={6}>
						<FilterDealers />
					</Grid>
				)}
				<Grid item xs={6}>
					{filterDateRange && <FilterDateRange />}
				</Grid>
				<Grid item xs={6}>
					{filterCardType && (
						<FilterMultiSelect
							label={'Tipos de Tarjeta'}
							param={'cardTypes'}
							getEndpoint={getQueryCardTypes}
							paramsEndpoint={[true]}
							parser={parseCardTypes}
						/>
					)}
				</Grid>
				<Grid item xs={6}>
					{filterEconomicGroup && <FilterEconomicGroup />}
				</Grid>
				<Grid item xs={6}>
					{filterBusinessArea && (
						<FilterMultiSelect
							label={'Área de Negocio'}
							param={'businessAreas'}
							getEndpoint={getQueryBusinessAreas}
							parser={parseCommonValue}
						/>
					)}
				</Grid>
				<Grid item xs={6}>
					{filterRechargeType && (
						<FilterMultiSelect
							label={'Tipo de Recarga'}
							param={'chargeTypes'}
							getEndpoint={getQueryRechargeTypes}
							parser={parseCommonValue}
						/>
					)}
				</Grid>
				<Grid item xs={6}>
					{filterSector && (
						<FilterMultiSelect
							label={'Sector'}
							param={'sectors'}
							getEndpoint={getQuerySectors}
							parser={parseCommonValue}
						/>
					)}
				</Grid>
			</Grid>
			<div>
				<VolvoButton text='PDF' onClick={exportPDF} color='primary' />
				<VolvoButton text='Excel' onClick={exportExcel} color='primary' />
			</div>
		</div>
	);
};

const ReportMaker = (props: ReportMakerProps) => (
	<ReportMakerProvider>
		<InnerComponent {...props} />
	</ReportMakerProvider>
);

export default ReportMaker;
