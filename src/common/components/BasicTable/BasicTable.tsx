import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import { ACTIONS_LABEL, TableColumn } from 'common/constants';
import React from 'react';
import DownloadExcel from '../DownloadExcel/DownloadExcel';

interface BasicTableProps {
	tableClassname?: string;
	size?: 'small' | 'medium' | undefined;
	name?: string;
	columns: TableColumn[];
	children: JSX.Element;
	data?: any[];
	exportExcel?: boolean;
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	exportButtons: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: '5px',
	},
});

const BasicTable: React.FC<BasicTableProps> = ({
	tableClassname = '',
	columns,
	size,
	children,
	name,
	data,
	exportExcel,
}: BasicTableProps) => {
	const classes = useStyles();
	const excelColumns = columns.filter((col) => col.title !== ACTIONS_LABEL);

	return (
		<React.Fragment>
			{exportExcel && !!data && !!name && (
				<div className={classes.exportButtons}>
					<DownloadExcel name={name} columns={excelColumns} data={data} />
				</div>
			)}
			<TableContainer className={tableClassname} component={Paper}>
				<Table
					className={classes.table}
					size={size}
					aria-label='material table'
				>
					<TableHead>
						<TableRow>
							{columns.map((col: TableColumn, i: number) => (
								<TableCell key={i} {...(col.props || {})}>
									{col.title}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>{children}</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default BasicTable;
