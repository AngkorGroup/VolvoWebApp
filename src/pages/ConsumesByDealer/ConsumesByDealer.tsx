import React, { useState } from 'react';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import PageBody from '../../common/components/PageBody/PageBody';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import TypeAhead, { Option } from '../../common/components/TypeAhead/TypeAhead';
import {
	MOCKED_CARD_TYPES_MULTITYPEAHEAD,
	MOCKED_CASHIERS_SELECT,
	MOCKED_DEALERS_TYPEAHEAD,
} from '../../common/utils/mocked';
import ConsumeRow from './ConsumeRow/ConsumeRow';
import { Consume } from './interface';
import SearchIcon from '@material-ui/icons/Search';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DatePicker from '../../common/components/DatePicker/DatePicker';
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import VolvoIconButton from '../../common/components/VolvoIconButton/VolvoIconButton';
import { filterDateRangeRows } from '../../common/utils/utils';
import MultiTypeAhead from '../../common/components/MultiTypeAhead/MultiTypeAhead';
import { CONSUMES_COLUMNS } from './columns';

const consumesRows: Consume[] = [
	{
		id: '1',
		voucher: '589614',
		paymentType: 'PRESENCIAL',
		status: 'CONFIRMADO',
		cardType: 'VREP',
		cardNumber: '924201002274611260',
		tpNumber: '598941562',
		client: 'Angkor Group',
		date: '11/09/2020',
		contact: 'Federico Montero',
		currency: 'US$',
		amount: '-2,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		id: '2',
		voucher: '589633',
		paymentType: 'PRESENCIAL',
		status: 'CONFIRMADO',
		cardType: 'VREP',
		cardNumber: '924201002274611277',
		tpNumber: '538921372',
		client: 'Zieme PLC',
		date: '02/11/2020',
		contact: 'Gianfranco Galvez Montero',
		currency: 'US$',
		amount: '10,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		id: '3',
		voucher: '715596',
		paymentType: 'REMOTO',
		status: 'CONFIRMADO',
		cardType: 'VURE',
		cardNumber: '924201002274611281',
		tpNumber: '558943272',
		client: 'Bashirian-Legros',
		date: '16/11/2020',
		contact: 'Mauricio Castañeda Monzón',
		currency: 'US$',
		amount: '-3,000.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		id: '4',
		voucher: '763325',
		paymentType: 'REMOTO',
		status: 'CONFIRMADO',
		cardType: 'VURE',
		cardNumber: '924201002274611256',
		tpNumber: '218941272',
		client: 'Hickle Group',
		date: '27/11/2020',
		contact: 'Brajean Junchaya Navarrete',
		currency: 'US$',
		amount: '8,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		id: '5',
		voucher: '829635',
		paymentType: 'REMOTO',
		status: 'INGRESADO',
		cardType: 'VURE',
		cardNumber: '924201002274611292',
		tpNumber: '498941272',
		client: 'Angkor Group',
		date: '02/12/2020',
		contact: 'Juan Jose Ramirez Calderón',
		currency: 'US$',
		amount: '1,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
];

const rowsForBox = [
	{
		id: '1',
		voucher: '589614',
		paymentType: 'PRESENCIAL',
		status: 'CONFIRMADO',
		cardType: 'VREP',
		cardNumber: '924201002274611260',
		tpNumber: '598941562',
		client: 'Angkor Group',
		date: '11/09/2020',
		contact: 'Federico Montero',
		currency: 'US$',
		amount: '-2,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
	{
		id: '2',
		voucher: '589633',
		paymentType: 'PRESENCIAL',
		status: 'CONFIRMADO',
		cardType: 'VREP',
		cardNumber: '924201002274611277',
		tpNumber: '538921372',
		client: 'Zieme PLC',
		date: '02/11/2020',
		contact: 'Gianfranco Galvez Montero',
		currency: 'US$',
		amount: '10,500.00',
		voucherURL:
			'https://templates.invoicehome.com/modelo-de-recibo-es-franja-azul-750px.png',
	},
];

type SelectEvent = React.ChangeEvent<{
	name?: string | undefined;
	value: unknown;
}>;

const ConsumesByDealer: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [startDate, setStartDate] = useState<MaterialUiPickersDate>(null);
	const [endDate, setEndDate] = useState<MaterialUiPickersDate>(null);
	const [cashier, setCashier] = useState('all');
	const [cardTypes, setCardTypes] = useState<Option[]>(
		MOCKED_CARD_TYPES_MULTITYPEAHEAD,
	);
	const [consumes, setConsumes] = useState<Consume[]>([]);
	const [filtered, setFiltered] = useState<Consume[]>([]);

	const onStartDateChange = (date: MaterialUiPickersDate) => setStartDate(date);
	const onEndDateChange = (date: MaterialUiPickersDate) => setEndDate(date);
	const onCashierChange = (e: SelectEvent) =>
		setCashier(e.target.value as string);
	const onCardTypeChange = (_: React.ChangeEvent<{}>, values: Option[]) => {
		setCardTypes(values);
	};
	// TODO: look for a different approach for handling filters
	const onApplyFilters = () => {
		if (cashier !== 'all') {
			setFiltered(rowsForBox);
		}
		if (!!startDate && !!endDate) {
			const consumeIds = consumes.map((c) => ({ id: c.id, date: c.date }));
			const filteredIds = filterDateRangeRows(startDate, endDate, consumeIds);
			const filtered = consumes.filter((c) =>
				filteredIds.some((f) => f.id === c.id),
			);
			setFiltered(filtered);
		}
		if (cardTypes.length > 0) {
			const filtered = consumes.filter((c) =>
				cardTypes.some((f) => f.value === c.cardType),
			);
			setFiltered(filtered);
		}
		if (
			(!startDate || !endDate) &&
			cashier === 'all' &&
			cardTypes.length === 0
		) {
			setFiltered(consumes);
		}
	};

	const onDealerChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setConsumes(consumesRows);
			setFiltered(consumesRows);
		}, 1000);
	};

	return (
		<div>
			<div>
				<PageTitle title='Operaciones por Dealer' />
				<TypeAhead
					options={MOCKED_DEALERS_TYPEAHEAD}
					placeholder='Dealer'
					onChange={onDealerChange}
				/>
			</div>
			<PageBody>
				<div>
					{loading && <PageLoader />}
					{!loading && consumes.length > 0 && (
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
												label='Moneda'
												onChange={onCashierChange}
												value={cashier}
											>
												{MOCKED_CASHIERS_SELECT.map((d) => (
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
											options={MOCKED_CARD_TYPES_MULTITYPEAHEAD}
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
							<BasicTable columns={CONSUMES_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<ConsumeRow key={i} item={item} />
									))}
								</React.Fragment>
							</BasicTable>
						</React.Fragment>
					)}
				</div>
			</PageBody>
		</div>
	);
};

export default ConsumesByDealer;
