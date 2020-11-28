import { makeStyles, Typography } from '@material-ui/core';
import { PageTitle } from 'common/components';
import ReportMaker from 'common/components/ReportMaker/ReportMaker';
import { REPORT_OPTIONS } from 'common/constants';
import { REPORT_ENDPOINTS } from 'common/services';
import React from 'react';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
	header: {
		marginBottom: 10,
	},
	filter: {
		marginBottom: 15,
	},
});

interface PathParams {
	id: string;
}

const Reports = () => {
	const classes = useStyles();
	const { id } = useParams<PathParams>();

	const report = REPORT_OPTIONS.find((r) => r.id === id);
	const title = report?.title || '';
	const filters = report?.filters || {};

	return (
		<div>
			<div className={classes.header}>
				<PageTitle title={title} />
			</div>
			<div>
				<Typography className={classes.filter} variant='subtitle1' align='left'>
					Filtros
				</Typography>
				<ReportMaker id={id} {...filters} endpoint={REPORT_ENDPOINTS[id]} />
			</div>
		</div>
	);
};

export default Reports;
