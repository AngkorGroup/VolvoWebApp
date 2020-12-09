import {
	Card,
	CardActions,
	CardContent,
	Grid,
	makeStyles,
	SvgIcon,
	Typography,
} from '@material-ui/core';
import {
	FilterParams,
	ReportType,
	getQueryBanks,
	getQueryBusinessAreas,
	getQueryCardTypes,
	getQueryRechargeTypes,
	getQuerySectors,
	getReportClients,
} from 'common/services';
import {
	getFilename,
	parseCardTypes,
	parseCommonValue,
	parseSimpleClients,
} from 'common/utils';
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
	id: string;
	filterClient?: boolean;
	filterDateRange?: boolean;
	filterCardType?: boolean;
	filterDealer?: boolean;
	filterEconomicGroup?: boolean;
	filterBusinessArea?: boolean;
	filterRechargeType?: boolean;
	filterSector?: boolean;
	filterBank?: boolean;
	filterMultiClient?: boolean;
	endpoint: (params: FilterParams) => any;
}

const useStyles = makeStyles(() => ({
	root: {
		margin: '0 auto',
		minWidth: 275,
		maxWidth: 600,
	},
	title: {
		marginBottom: 15,
	},
	buttons: {
		justifyContent: 'center',
	},
}));

const EXTENSIONS: Record<string, string> = {
	pdf: 'pdf',
	excel: 'xls',
};

const InnerComponent: React.FC<ReportMakerProps> = ({
	id,
	filterClient,
	filterDateRange,
	filterCardType,
	filterDealer,
	filterEconomicGroup,
	filterBusinessArea,
	filterRechargeType,
	filterSector,
	filterBank,
	filterMultiClient,
	endpoint,
}) => {
	const classes = useStyles();
	const params = useContext(ReportMakerContext);
	const exportPDF = async () => await exportFile('pdf');
	const exportExcel = async () => await exportFile('excel');

	const exportFile = async (type: ReportType) => {
		const { data, headers } = await endpoint({ type, ...params });
		const ext = EXTENSIONS[type];
		const filename = getFilename(id, ext, headers['content-disposition']);
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<div>
			<Card className={classes.root} variant='outlined'>
				<CardContent>
					<Typography className={classes.title} variant='h4' component='h3'>
						Filtros
					</Typography>
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
						{filterBank && (
							<Grid item xs={12}>
								<FilterMultiSelect
									label={'Banco'}
									param={'banks'}
									getEndpoint={getQueryBanks}
									parser={parseCommonValue}
								/>
							</Grid>
						)}
						{filterMultiClient && (
							<Grid item xs={12}>
								<FilterMultiSelect
									label={'Clientes'}
									param={'clients'}
									getEndpoint={getReportClients}
									parser={parseSimpleClients}
								/>
							</Grid>
						)}
					</Grid>
				</CardContent>
				<CardActions className={classes.buttons}>
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
				</CardActions>
			</Card>
		</div>
	);
};

const ReportMaker = (props: ReportMakerProps) => (
	<ReportMakerProvider>
		<InnerComponent {...props} />
	</ReportMakerProvider>
);

export default ReportMaker;
