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

export interface Route {
	id: string;
	path: string;
	component: (props: any) => JSX.Element;
}

export const routes: Route[] = [
	{ id: 'Home', path: '/', component: PageCardBalance },
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
];
