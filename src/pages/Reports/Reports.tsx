import { Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { PageTitle } from 'common/components';
import { REPORT_OPTIONS } from 'common/constants';
import React from 'react';
import ReportCard from './ReportCard/ReportCard';

const getColumnSize = (isMobile: boolean, isLarge: boolean) => {
	if (isMobile) {
		return 12;
	}
	if (isLarge) {
		return 3;
	}
	return 4;
};

const useStyles = makeStyles({
	header: {
		marginBottom: 10,
	},
});

const Reports = () => {
	const classes = useStyles();
	const isMobile = !useMediaQuery(({ breakpoints }: Theme) =>
		breakpoints.up('md'),
	);
	const isLarge = useMediaQuery(({ breakpoints }: Theme) =>
		breakpoints.up('lg'),
	);

	return (
		<div>
			<div className={classes.header}>
				<PageTitle title='Reportes' />
			</div>
			<Grid container spacing={2}>
				{REPORT_OPTIONS.map(({ id, title, filters }) => (
					<Grid key={id} item xs={getColumnSize(isMobile, isLarge)}>
						<ReportCard id={id} title={title} filters={filters} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Reports;
