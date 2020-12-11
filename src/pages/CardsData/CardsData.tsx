import { Grid } from '@material-ui/core';
import {
	AsyncTypeAhead,
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
} from 'common/components';
import {
	getCardsByClient,
	getCardsByContact,
	getClients,
	getContactsByFilter,
} from 'common/services';
import { Option, parseClients, parseContacts } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { CARD_COLUMNS } from './columns';
import { CardData, mapCardData } from './interfaces';

const CardsData: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [loadingClients, setLoadingClients] = useState(false);
	const [loadingContacts, setLoadingContacts] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [client, setClient] = useState('');
	const [contact, setContact] = useState('');
	const [clients, setClients] = useState<Option[]>([]);
	const [contacts, setContacts] = useState<Option[]>([]);
	const [cards, setCards] = useState<CardData[]>([]);

	useEffect(() => {
		setLoadingClients(true);
		const fetchClients = async () => {
			const response = await getClients();
			setLoadingClients(false);
			if (response.ok) {
				const data = parseClients(response.data || []);
				setClients(data);
			}
		};
		setLoadingContacts(true);
		const fetchContacts = async () => {
			const response = await getContactsByFilter();
			setLoadingContacts(false);
			if (response.ok) {
				const data = parseContacts(response.data || []);
				setContacts(data);
			}
		};

		fetchClients();
		fetchContacts();
	}, []);

	useEffect(() => {
		const fetchCardsData = async () => {
			if (client) {
				setLoading(true);
				const response = await getCardsByClient(client, onlyActive);
				if (response.ok) {
					const cardDataRows = mapCardData(response.data || []);
					setCards(cardDataRows);
				}
				setLoading(false);
			}
		};

		fetchCardsData();
	}, [onlyActive, client]);

	useEffect(() => {
		const fetchCardsData = async () => {
			if (contact) {
				setLoading(true);
				const response = await getCardsByContact(contact, onlyActive);
				if (response.ok) {
					const cardDataRows = mapCardData(response.data || []);
					setCards(cardDataRows);
				}
				setLoading(false);
			}
		};

		fetchCardsData();
	}, [onlyActive, contact]);

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

	const onTypeAheadChange = (byContact?: boolean) => (
		_: any,
		newValue: string | Option,
	) => {
		const id = (newValue as Option).value;
		if (byContact) {
			setContact(id);
			setClient('');
		} else {
			setClient(id);
			setContact('');
		}
	};

	return (
		<div>
			<div>
				<PageTitle title='Datos de Tarjetas' />
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
						<GenericTable
							filename={`Datos de Tarjeta ${client}`}
							columns={CARD_COLUMNS}
							data={cards}
							customFilters={
								<OnlyActiveFilter
									checked={onlyActive}
									onChange={(e: any) => setOnlyActive(e.target.checked)}
								/>
							}
						/>
					)}
				</div>
			</PageBody>
		</div>
	);
};

export default CardsData;
