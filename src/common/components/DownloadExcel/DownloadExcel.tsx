import React from 'react';
import ReactExport from 'react-export-excel';
import GetAppIcon from '@material-ui/icons/GetApp';
import { TableColumn } from 'common/constants';
import moment from 'moment';
import VolvoButton from '../VolvoButton/VolvoButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface DownloadExcelProps {
	name: string;
	columns: TableColumn[];
	data: any[];
}

const renderDownloadButton = () => (
	<VolvoButton icon={<GetAppIcon />} text='Excel' color='primary' />
);

const DownloadExcel: React.FC<DownloadExcelProps> = ({
	name,
	columns,
	data,
}: DownloadExcelProps) => {
	const now = moment().format('DD-MM-YYYY');
	const filename = `${name.split(' ').join('_')}_${now}`;
	return (
		<ExcelFile element={renderDownloadButton()} filename={filename}>
			<ExcelSheet data={data} name={name}>
				{columns.map(({ value, title }) => (
					<ExcelColumn key={value} label={title} value={value} />
				))}
			</ExcelSheet>
		</ExcelFile>
	);
};

export default DownloadExcel;
