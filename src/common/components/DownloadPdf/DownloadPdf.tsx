import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import { TableColumn } from 'common/constants';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import VolvoButton from '../VolvoButton/VolvoButton';
import { PDFConfig } from 'common/utils';

interface DownloadPdfProps {
	className?: string;
	name: string;
	columns: TableColumn[];
	data: any[];
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({
	className,
	name,
	columns,
	data,
}: DownloadPdfProps) => {
	const now = moment().format('DD-MM-YYYY');
	const filename = `${name.split(' ').join('_')}_${now}`;
	const generatePDF = () => {
		const unit = PDFConfig.unit;
		const size = PDFConfig.size;
		const orientation = PDFConfig.orientation;
		const doc = new jsPDF(orientation, unit, size);
		const headers = columns.map((col) => ({
			header: col.title,
			dataKey: col.value,
		}));
		doc.setFontSize(PDFConfig.fontSize);
		doc.text(name, PDFConfig.marginLeft, PDFConfig.marginTop);
		autoTable(doc, {
			startY: 50,
			columns: headers,
			body: data,
		});
		doc.save(`${filename}.pdf`);
	};

	return (
		<VolvoButton
			className={className}
			onClick={() => generatePDF()}
			icon={<GetAppIcon />}
			text='PDF'
			color='primary'
		/>
	);
};

export default DownloadPdf;
