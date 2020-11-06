import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ConsumeRow from './ConsumeRow/ConsumeRow';
import { Consume, mapCharges } from './interface';
import SearchIcon from '@material-ui/icons/Search';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import {
	Option,
	parseCardTypes,
	parseCashiers,
	parseDealers,
} from 'common/utils';
import {
	AsyncTypeAhead,
	BasicTable,
	DatePicker,
	MultiTypeAhead,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoIconButton,
} from 'common/components';
import { CONSUMES_COLUMNS } from './columns';
import {
	getCardTypes,
	getDealerCashiers,
	getDealerCharges,
	getDealersByFilter,
} from 'common/services';

type SelectEvent = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const ConsumesByDealer: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingFilters, setLoadingFilters] = useState(false);
	const [loadingOptions, setLoadingOptions] = useState(false);
	const [options, setOptions] = useState<Option[]>([]);
	const [cashiers, setCashiers] = useState<Option[]>([]);
	const [cardTypeList, setCardTypeList] = useState<Option[]>([]);
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(moment());
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(null);
	const [dealer, setDealer] = useState('');
	const [cashier, setCashier] = useState('all');
	const [cardTypes, setCardTypes] = useState<Option[]>([]);
	const [consumes, setConsumes] = useState<Consume[]>([]);
	const [filtered, setFiltered] = useState<Consume[]>([]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onCashierChange = (e: SelectEvent) =>
		setCashier(e.target.value as string);
	const onCardTypeChange = (_: React.ChangeEvent<{}>, values: Option[]) => {
		setCardTypes(values);
	};

	const onApplyFilters = async () => {
		const start = startDate?.format('DD/mm/yyyy') || '';
		const end = endDate?.format('DD/mm/yyyy') || '';
		const selectedCashier = cashier === 'all' ? '' : cashier;
		const list = cardTypes.map((c) => c.value);
		setLoading(true);
		const responseCharges = await getDealerCharges(
			dealer,
			start,
			end,
			selectedCashier,
			list,
		);
		if (responseCharges.ok) {
			const data = mapCharges(responseCharges.data || []);
			setConsumes(data);
			setFiltered(data);
		}
		setLoading(false);
	};

	const onDealerChange = async (_: any, newValue: string | Option) => {
		setLoadingFilters(true);
		const dealerId = (newValue as Option).value;
		setDealer(dealerId);
		const responseCashiers = await getDealerCashiers(dealerId);
		if (responseCashiers.ok) {
			const data = parseCashiers(responseCashiers.data || []);
			setCashiers(data);
		}
		setLoadingFilters(false);
		setLoading(true);
		const responseCharges = await getDealerCharges(dealerId);
		if (responseCharges.ok) {
			const data = mapCharges(responseCharges.data || []);
			setConsumes(data);
			setFiltered(data);
		}
		setLoading(false);
	};

	const onTypeDealer = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingOptions(true);
		const response = await getDealersByFilter(e.target.value);
		if (response.ok) {
			const data = parseDealers(response.data || []);
			setOptions(data);
		}
		setLoadingOptions(false);
	};

	useEffect(() => {
		const fetchCardTypes = async () => {
			const response = await getCardTypes();
			if (response.ok) {
				const data = parseCardTypes(response.data || []);
				setCardTypeList(data);
				setCardTypes(data);
			}
		};
		fetchCardTypes();
	}, []);

	return (
		<div>
			<div>
				<PageTitle title='Operaciones por Dealer' />
				<AsyncTypeAhead
					options={options}
					placeholder='Dealer'
					loading={loadingOptions}
					onChange={onDealerChange}
					onType={onTypeDealer}
				/>
			</div>
			<PageBody>
				<div>
					{loadingFilters && <PageLoader />}
					{!loadingFilters && !!dealer && (
						<React.Fragment>
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
											label='Fecha Fin'
											minDate={startDate}
											value={endDate}
											onChange={onEndDateChange}
										/>
									</Grid>
									<Grid item xs={2}>
										<FormControl variant='outlined' fullWidth size='small'>
											<InputLabel id='cashierLabel'>Caja</InputLabel>
											<Select
												labelId='cashierLabel'
												label='Caja'
												onChange={onCashierChange}
												value={cashier}
											>
												{cashiers.map((d) => (
													<MenuItem key={d.value} value={d.value}>
														{d.label}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={5}>
										<MultiTypeAhead
											placeholder='Seleccione'
											label='Tipo de Tarjeta'
											onChange={onCardTypeChange}
											options={cardTypeList}
										/>
									</Grid>
									<Grid item xs={1}>
										<VolvoIconButton
											color='primary'
											title='Buscar'
											onClick={onApplyFilters}
										>
											<SearchIcon />
										</VolvoIconButton>
									</Grid>
								</Grid>
							</PageActionBar>
							{loading && <PageLoader />}
							{!loading && consumes.length > 0 && (
								<BasicTable columns={CONSUMES_COLUMNS}>
									<React.Fragment>
										{filtered.map((item, i: number) => (
											<ConsumeRow key={i} item={item} />
										))}
									</React.Fragment>
								</BasicTable>
							)}
						</React.Fragment>
					)}
				</div>
			</PageBody>
		</div>
	);
};

export default ConsumesByDealer;
