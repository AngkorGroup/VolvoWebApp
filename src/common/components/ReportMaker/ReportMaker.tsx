import { Grid, makeStyles, SvgIcon } from '@material-ui/core';
import {
	FilterParams,
	ReportType,
	getQueryBanks,
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

const EXTENSIONS: Record<string, string> = {
	pdf: 'pdf',
	excel: 'xls',
};

const getFilename = (id: string, ext: string, content: any) => {
	if (content) {
		return content
			.split(';')
			.find((n: any) => n.includes('filename='))
			.replace('filename=', '')
			.trim();
	}
	return `${id}.${ext}`;
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
