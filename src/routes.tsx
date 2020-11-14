import SignIn from 'pages/SignIn/SignIn';
import React, { lazy } from 'react';
import HOCLayout from './common/Layout/HOCLayout';

const PageCardBalance = (props: any) => {
	const CardBalance = lazy(() => import('./pages/CardBalance/CardBalance'));
	const LayoutCardBalance = HOCLayout(CardBalance);
	return <LayoutCardBalance {...props} />;
};

const PageCardsData = (props: any) => {
	const CardsData = lazy(() => import('./pages/CardsData/CardsData'));
	const LayoutCardsData = HOCLayout(CardsData);
	return <LayoutCardsData {...props} />;
};

const PageCardTypes = (props: any) => {
	const CardTypes = lazy(() => import('./pages/CardTypes/CardTypes'));
	const LayoutCardTypes = HOCLayout(CardTypes);
	return <LayoutCardTypes {...props} />;
};

const PageClientBalance = (props: any) => {
	const ClientBalance = lazy(
		() => import('./pages/ClientBalance/ClientBalance'),
	);
	const LayoutClientBalance = HOCLayout(ClientBalance);
	return <LayoutClientBalance {...props} />;
};

const PageClients = (props: any) => {
	const Clients = lazy(() => import('./pages/Clients/Clients'));
	const LayoutClients = HOCLayout(Clients);
	return <LayoutClients {...props} />;
};

const PageClientUsers = (props: any) => {
	const ClientUsers = lazy(() => import('./pages/ClientUsers/ClientUsers'));
	const LayoutClientUsers = HOCLayout(ClientUsers);
	return <LayoutClientUsers {...props} />;
};

const PageConsumesByDealer = (props: any) => {
	const ConsumesByDealer = lazy(
		() => import('./pages/ConsumesByDealer/ConsumesByDealer'),
	);
	const LayoutConsumesByDealer = HOCLayout(ConsumesByDealer);
	return <LayoutConsumesByDealer {...props} />;
};

const PageDealers = (props: any) => {
	const Dealers = lazy(() => import('./pages/Dealers/Dealers'));
	const LayoutDealers = HOCLayout(Dealers);
	return <LayoutDealers {...props} />;
};

const PageLoads = (props: any) => {
	const Loads = lazy(() => import('./pages/Loads/Loads'));
	const LayoutLoads = HOCLayout(Loads);
	return <LayoutLoads {...props} />;
};

const PagePOS = (props: any) => {
	const POS = lazy(() => import('./pages/POS/POS'));
	const LayoutPOS = HOCLayout(POS);
	return <LayoutPOS {...props} />;
};

const PageUsers = (props: any) => {
	const Users = lazy(() => import('./pages/Users/Users'));
	const LayoutUsers = HOCLayout(Users);
	return <LayoutUsers {...props} />;
};

const PageChargesByClient = (props: any) => {
	const ChargesByClient = lazy(() => import('./pages/Reports/ChargesByClient'));
	const LayoutChargesByClient = HOCLayout(ChargesByClient);
	return <LayoutChargesByClient {...props} />;
};

const PageChargesByDealer = (props: any) => {
	const ChargesByDealer = lazy(() => import('./pages/Reports/ChargesByDealer'));
	const LayoutChargesByDealer = HOCLayout(ChargesByDealer);
	return <LayoutChargesByDealer {...props} />;
};

const PageChargesRanking = (props: any) => {
	const ChargesRanking = lazy(() => import('./pages/Reports/ChargesRanking'));
	const LayoutChargesRanking = HOCLayout(ChargesRanking);
	return <LayoutChargesRanking {...props} />;
};

const PageClientConsumesByDealer = (props: any) => {
	const ClientConsumesByDealer = lazy(
		() => import('./pages/Reports/ClientConsumesByDealer'),
	);
	const LayoutClientConsumesByDealer = HOCLayout(ClientConsumesByDealer);
	return <LayoutClientConsumesByDealer {...props} />;
};

const PageClientsCardExpiration = (props: any) => {
	const ClientsCardExpiration = lazy(
		() => import('./pages/Reports/ClientsCardExpiration'),
	);
	const LayoutClientsCardExpiration = HOCLayout(ClientsCardExpiration);
	return <LayoutClientsCardExpiration {...props} />;
};

const PageClientsCardUse = (props: any) => {
	const ClientsCardUse = lazy(() => import('./pages/Reports/ClientsCardUse'));
	const LayoutClientsCardUse = HOCLayout(ClientsCardUse);
	return <LayoutClientsCardUse {...props} />;
};

const PageConsumesByBusinessArea = (props: any) => {
	const ConsumesByBusinessArea = lazy(
		() => import('./pages/Reports/ConsumesByBusinessArea'),
	);
	const LayoutConsumesByBusinessArea = HOCLayout(ConsumesByBusinessArea);
	return <LayoutConsumesByBusinessArea {...props} />;
};

const PageConsumesByEconomic = (props: any) => {
	const ConsumesByEconomic = lazy(
		() => import('./pages/Reports/ConsumesByEconomic'),
	);
	const LayoutConsumesByEconomic = HOCLayout(ConsumesByEconomic);
	return <LayoutConsumesByEconomic {...props} />;
};

const PageConsumesRanking = (props: any) => {
	const ConsumesRanking = lazy(() => import('./pages/Reports/ConsumesRanking'));
	const LayoutConsumesRanking = HOCLayout(ConsumesRanking);
	return <LayoutConsumesRanking {...props} />;
};

const PagePendingChargesRefund = (props: any) => {
	const PendingChargesRefund = lazy(
		() => import('./pages/Reports/PendingChargesRefund'),
	);
	const LayoutPendingChargesRefund = HOCLayout(PendingChargesRefund);
	return <LayoutPendingChargesRefund {...props} />;
};

const PageRefunds = (props: any) => {
	const Refunds = lazy(() => import('./pages/Reports/Refunds'));
	const LayoutRefunds = HOCLayout(Refunds);
	return <LayoutRefunds {...props} />;
};

const PageConsumesByClient = (props: any) => {
	const ConsumesByClient = lazy(
		() => import('./pages/Reports/ConsumesByClient'),
	);
	const LayoutConsumesByClient = HOCLayout(ConsumesByClient);
	return <LayoutConsumesByClient {...props} />;
};

export interface Route {
	id: string;
	path: string;
	component: (props: any) => JSX.Element;
}

export const guarded: Route[] = [
	{ id: 'CardBalance', path: '/card_balance', component: PageCardBalance },
	{ id: 'CardsData', path: '/cards_data', component: PageCardsData },
	{ id: 'CardTypes', path: '/card_types', component: PageCardTypes },
	{
		id: 'ClientBalance',
		path: '/client_balance',
		component: PageClientBalance,
	},
	{ id: 'Clients', path: '/clients', component: PageClients },
	{ id: 'ClientUsers', path: '/client_users', component: PageClientUsers },
	{
		id: 'ConsumesByDealer',
		path: '/consumes_by_dealer',
		component: PageConsumesByDealer,
	},
	{ id: 'Dealers', path: '/dealers', component: PageDealers },
	{ id: 'Loads', path: '/loads', component: PageLoads },
	{ id: 'POS', path: '/pos', component: PagePOS },
	{ id: 'Users', path: '/users', component: PageUsers },
	{
		id: 'ConsumesByClient',
		path: '/reports/consumes_by_client',
		component: PageConsumesByClient,
	},
	{
		id: 'ChargesByClient',
		path: '/reports/charges_by_client',
		component: PageChargesByClient,
	},
	{
		id: 'ChargesRanking',
		path: '/reports/charges_ranking',
		component: PageChargesRanking,
	},
	{
		id: 'ClientConsumesByDealer',
		path: '/reports/client_consumes_by_dealer',
		component: PageClientConsumesByDealer,
	},
	{
		id: 'ClientsCardExpiration',
		path: '/reports/clients_card_expiration',
		component: PageClientsCardExpiration,
	},
	{
		id: 'ClientsCardUse',
		path: '/reports/clients_card_use',
		component: PageClientsCardUse,
	},
	{
		id: 'ConsumesByBusinessArea',
		path: '/reports/consumes_by_business_area',
		component: PageConsumesByBusinessArea,
	},
	{
		id: 'ConsumesByClient',
		path: '/reports/consumes_by_client',
		component: PageConsumesByClient,
	},
	{
		id: 'ConsumesByEconomic',
		path: '/reports/consumes_by_economic',
		component: PageConsumesByEconomic,
	},
	{
		id: 'ConsumesRanking',
		path: '/reports/consumes_ranking',
		component: PageConsumesRanking,
	},
	{
		id: 'PendingChargesRefund',
		path: '/reports/pending_charges_refund',
		component: PagePendingChargesRefund,
	},
	{
		id: 'Refunds',
		path: '/reports/refunds',
		component: PageRefunds,
	},
	{
		id: 'ChargesByDealer',
		path: '/reports/charges_by_dealer',
		component: PageChargesByDealer,
	},
];

export const routes: Route[] = [{ id: 'SignIn', path: '/', component: SignIn }];
