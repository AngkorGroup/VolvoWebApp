import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
	DatePicker,
	GenericTable,
	NoDealer,
	PageActionBar,
	PageLoader,
	PageTitle,
} from 'common/components';
import {
	DEFAULT_NOW_DATE,
	DEFAULT_WEEK_START_DATE,
	LIQUIDATION_STATUSES,
	DEFAULT_MOMENT_FORMAT,
	ACTIONS_COLUMN_V2,
} from 'common/constants';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getQueryLiquidations } from 'common/services';
import { mapLiquidations } from './interfaces';
import { LiquidationStatus } from 'common/utils';
import { LIQUIDATIONS_COLUMNS } from './columns';
import AppContext from 'AppContext';
import LiquidationActions from './LiquidationActions/LiquidationActions';

type Event = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const Liquidations: React.FC = () => {
	const { user } = useContext(AppContext);
	const [userHasDealer, setUserHasDealer] = useState(!!user?.dealerId);
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
		DEFAULT_WEEK_START_DATE,
	);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(
		DEFAULT_NOW_DATE,
	);
	const [liquidationStatus, setLiquidationStatus] = useState<string>(
		LiquidationStatus.Generado,
	);
	const { data, status } = useQuery(
		[
			'getQueryLiquidations',
			startDate?.format(DEFAULT_MOMENT_FORMAT),
			endDate?.format(DEFAULT_MOMENT_FORMAT),
			liquidationStatus,
		],
		getQueryLiquidations,
	);
	const liquidations = useMemo(() => {
		if (data?.ok) {
			return mapLiquidations(data?.data || []);
		}
		return [];
	}, [data]);

	useEffect(() => {
		if (!user?.dealerId) {
			setUserHasDealer(false);
			return;
		}
	}, [user]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onStatusChange = (e: Event) =>
		setLiquidationStatus(e.target.value as string);

	const columns = useMemo(
		() => [
			...LIQUIDATIONS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => <LiquidationActions item={cell?.row?.original} />,
			},
		],
		// eslint-disable-next-line
		[],
	);

	if (!userHasDealer) {
		return <NoDealer />;
	}

	return (
		<div>
			<div>
				<PageTitle title='Liquidaciones' />
				<PageActionBar>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<DatePicker
								label='Fecha Inicio'
								value={startDate}
								onChange={onStartDateChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<DatePicker
								minDate={startDate}
								label='Fecha Fin'
								value={endDate}
								onChange={onEndDateChange}
							/>
						</Grid>
						<Grid item xs={2}>
							<FormControl variant='outlined' fullWidth size='small'>
								<InputLabel id='statusLabel'>Estado</InputLabel>
								<Select
									labelId='statusLabel'
									label='Estado'
									value={liquidationStatus}
									onChange={onStatusChange}
								>
									{LIQUIDATION_STATUSES.map((d) => (
										<MenuItem key={d.value} value={d.value}>
											{d.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</PageActionBar>
			</div>
			<div>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable
						filename='Consulta_liquidaciones'
						columns={columns}
						data={liquidations}
					/>
				)}
			</div>
		</div>
	);
};

export default Liquidations;
