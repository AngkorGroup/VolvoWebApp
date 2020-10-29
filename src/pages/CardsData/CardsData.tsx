import { Grid } from '@material-ui/core';
import {
	AsyncTypeAhead,
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	TypeAhead,
} from 'common/components';
import { getClients } from 'common/services';
import {
	filterRows,
	MOCKED_CONTACTS_TYPEAHEAD,
	Option,
	parseClients,
} from 'common/utils';
import React, { useState } from 'react';
import CardDataRow from './CardDataRow/CardDataRow';
import { CARD_COLUMNS } from './columns';
import { CardData } from './interfaces';

const cardDataRows: CardData[] = [
	{
		type: 'VREP',
		number: '924201002274611260',
		tpNumber: '598941562',
		createdAt: '01/01/2020',
		currency: 'US$',
		contactName: 'Federico Montero',
		contactType: 'Principal',
		contactPhone: '987654321',
		status: 'Activo',
	},
	{
		type: 'VREP',
		number: '924201002274611277',
		tpNumber: '538921372',
		createdAt: '01/06/2020',
		currency: 'US$',
		contactName: 'Gianfranco Galvez Montero',
		contactType: 'Adicional',
		contactPhone: '949666888',
		status: 'Activo',
	},
	{
		type: 'VURE',
		number: '924201002274611281',
		tpNumber: '558943272',
		createdAt: '01/07/2020',
		currency: 'US$',
		contactName: 'Mauricio Castañeda Monzón',
		contactType: 'Adicional',
		contactPhone: '985555123',
		status: 'Activo',
	},
	{
		type: 'VURE',
		number: '924201002274611256',
		tpNumber: '218941272',
		createdAt: '01/08/2020',
		currency: 'US$',
		contactName: 'Brajean Junchaya Navarrete',
		contactType: 'Adicional',
		contactPhone: '987486426',
		status: 'Activo',
	},
	{
		type: 'VURE',
		number: '924201002274611292',
		tpNumber: '498941272',
		createdAt: '02/08/2020',
		currency: 'US$',
		contactName: 'Juan Jose Ramirez Calderón',
		contactType: 'Adicional',
		contactPhone: '963852741',
		status: 'Activo',
	},
];

const CardsData: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingClients, setLoadingClients] = useState(false);
	const [clients, setClients] = useState<Option[]>([]);
	const [query, setQuery] = useState('');
	const [cards, setCards] = useState<CardData[]>([]);
	const [filtered, setFiltered] = useState<CardData[]>([]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, cards);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onTypeClient = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingClients(true);
		const response = await getClients(e.target.value);
		if (response.ok) {
			const data = parseClients(response.data || []);
			setClients(data);
		}
		setLoadingClients(false);
	};

	const onClientChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setCards(cardDataRows);
			setFiltered(cardDataRows);
			setLoading(false);
		}, 1500);
	};

	const onContactChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setCards(cardDataRows);
			setFiltered(cardDataRows);
			setLoading(false);
		}, 1500);
	};

	return (
		<div>
			<div>
				<PageTitle title='Tarjetas' />
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<AsyncTypeAhead
							options={clients}
							placeholder='Cliente'
							loading={loadingClients}
							onChange={onClientChange}
							onType={onTypeClient}
						/>
					</Grid>
					<Grid item xs={6}>
						<TypeAhead
							options={MOCKED_CONTACTS_TYPEAHEAD}
							placeholder='Contacto'
							onChange={onContactChange}
						/>
					</Grid>
				</Grid>
			</div>
			<PageBody>
				<div>
					{loading && <PageLoader />}
					{!loading && cards.length > 0 && (
						<React.Fragment>
							<PageActionBar>
								<TableFilter value={query} onChange={onFilterChange} />
							</PageActionBar>
							<BasicTable columns={CARD_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<CardDataRow key={i} item={item} />
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

export default CardsData;
