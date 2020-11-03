import { Grid } from '@material-ui/core';
import {
	AsyncTypeAhead,
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
} from 'common/components';
import {
	getCardsByClient,
	getClients,
	getContactsByFilter,
} from 'common/services';
import { filterRows, Option, parseClients, parseContacts } from 'common/utils';
import React, { useState } from 'react';
import CardDataRow from './CardDataRow/CardDataRow';
import { CARD_COLUMNS } from './columns';
import { CardData, mapCardData } from './interfaces';

const CardsData: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingClients, setLoadingClients] = useState(false);
	const [loadingContacts, setLoadingContacts] = useState(false);
	const [clients, setClients] = useState<Option[]>([]);
	const [contacts, setContacts] = useState<Option[]>([]);
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

	const onTypeContact = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoadingContacts(true);
		const response = await getContactsByFilter(e.target.value);
		if (response.ok) {
			const data = parseContacts(response.data || []);
			setContacts(data);
		}
		setLoadingContacts(false);
	};

	const onTypeAheadChange = (byContact?: boolean) => async (
		_: any,
		newValue: string | Option,
	) => {
		setLoading(true);
		const response = await getCardsByClient(byContact)(
			(newValue as Option).value,
		);
		if (response.ok) {
			const cardDataRows = mapCardData(response.data || []);
			setCards(cardDataRows);
			setFiltered(cardDataRows);
		}
		setLoading(false);
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
							onChange={onTypeAheadChange()}
							onType={onTypeClient}
						/>
					</Grid>
					<Grid item xs={6}>
						<AsyncTypeAhead
							options={contacts}
							placeholder='Contacto'
							loading={loadingContacts}
							onChange={onTypeAheadChange(true)}
							onType={onTypeContact}
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
