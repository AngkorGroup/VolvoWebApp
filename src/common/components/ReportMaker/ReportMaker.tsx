import { Grid, makeStyles, SvgIcon } from '@material-ui/core';
import {
	FilterParams,
	getQueryBusinessAreas,
	getQueryCardTypes,
	getQueryRechargeTypes,
	getQuerySectors,
} from 'common/services';
import { parseCardTypes, parseCommonValue } from 'common/utils';
import React, { useContext } from 'react';
import { ReactComponent as ExcelIcon } from 'common/icons/excel.svg';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
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

const useStyles = makeStyles(() => ({
	buttons: {
		marginTop: '15px',
		'& button': {
			margin: '0 5px',
		},
	},
}));

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
	const classes = useStyles();
	const params = useContext(ReportMakerContext);
	const exportPDF = async () => await endpoint({ type: 'pdf', ...params });
	const exportExcel = async () => await endpoint({ type: 'excel', ...params });
	return (
		<div>
			<Grid container spacing={1}>
				{filterClient && (
					<Grid item xs={12}>
						<FilterClients />
					</Grid>
				)}
				{filterDealer && (
					<Grid item xs={12}>
						<FilterDealers />
					</Grid>
				)}
				{filterDateRange && (
					<Grid item xs={12}>
						<FilterDateRange />
					</Grid>
				)}
				{filterCardType && (
					<Grid item xs={12}>
						<FilterMultiSelect
							label={'Tipos de Tarjeta'}
							param={'cardTypes'}
							getEndpoint={getQueryCardTypes}
							paramsEndpoint={[true]}
							parser={parseCardTypes}
						/>
					</Grid>
				)}
				{filterEconomicGroup && (
					<Grid item xs={12}>
						<FilterEconomicGroup />
					</Grid>
				)}
				{filterBusinessArea && (
					<Grid item xs={12}>
						<FilterMultiSelect
							label={'Área de Negocio'}
							param={'businessAreas'}
							getEndpoint={getQueryBusinessAreas}
							parser={parseCommonValue}
						/>
					</Grid>
				)}
				{filterRechargeType && (
					<Grid item xs={12}>
						<FilterMultiSelect
							label={'Tipo de Recarga'}
							param={'chargeTypes'}
							getEndpoint={getQueryRechargeTypes}
							parser={parseCommonValue}
						/>
					</Grid>
				)}
				{filterSector && (
					<Grid item xs={12}>
						<FilterMultiSelect
							label={'Sector'}
							param={'sectors'}
							getEndpoint={getQuerySectors}
							parser={parseCommonValue}
						/>
					</Grid>
				)}
			</Grid>
			<div className={classes.buttons}>
				<VolvoButton
					icon={<PictureAsPdfOutlinedIcon />}
					text='PDF'
					onClick={exportPDF}
					color='primary'
				/>
				<VolvoButton
					icon={<SvgIcon component={ExcelIcon} />}
					text='Excel'
					onClick={exportExcel}
					color='primary'
				/>
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
