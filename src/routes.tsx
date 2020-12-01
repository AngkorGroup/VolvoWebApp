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

const PageConsultLoads = (props: any) => {
	const ConsultLoads = lazy(() => import('./pages/ConsultLoads/ConsultLoads'));
	const LayoutConsultLoads = HOCLayout(ConsultLoads);
	return <LayoutConsultLoads {...props} />;
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

const PageLiquidations = (props: any) => {
	const Liquidations = lazy(() => import('./pages/Liquidations/Liquidations'));
	const LayoutLiquidations = HOCLayout(Liquidations);
	return <LayoutLiquidations {...props} />;
};

const PageRefunds = (props: any) => {
	const Refunds = lazy(() => import('./pages/Refunds/Refunds'));
	const LayoutRefunds = HOCLayout(Refunds);
	return <LayoutRefunds {...props} />;
};

const PageReports = (props: any) => {
	const Reports = lazy(() => import('./pages/Reports/Reports'));
	const LayoutReports = HOCLayout(Reports);
	return <LayoutReports {...props} />;
};

const PagePOSOperations = (props: any) => {
	const POSOperations = lazy(() => import('./pages/POSOperations/POS'));
	const LayoutPOSOperations = HOCLayout(POSOperations);
	return <LayoutPOSOperations {...props} />;
};

const PageConsultOperations = (props: any) => {
	const ConsultOperations = lazy(
		() => import('./pages/ConsultOperations/ConsumesByDealer'),
	);
	const LayoutConsultOperations = HOCLayout(ConsultOperations);
	return <LayoutConsultOperations {...props} />;
};

const PageConsultLiquidations = (props: any) => {
	const ConsultLiquidations = lazy(
		() => import('./pages/ConsultLiquidations/Liquidations'),
	);
	const LayoutConsultLiquidations = HOCLayout(ConsultLiquidations);
	return <LayoutConsultLiquidations {...props} />;
};

const PageDocumentTypes = (props: any) => {
	const DocumentTypes = lazy(
		() => import('./pages/DocumentTypes/DocumentTypes'),
	);
	const LayoutDocumentTypes = HOCLayout(DocumentTypes);
	return <LayoutDocumentTypes {...props} />;
};

export interface Route {
	id: string;
	path: string;
	component: (props: any) => JSX.Element;
}

export const guarded: Route[] = [
	// Configuration
	{
		id: 'CardTypes',
		path: '/configuration/card_types',
		component: PageCardTypes,
	},
	{
		id: 'DocumentTypes',
		path: '/configuration/document_types',
		component: PageDocumentTypes,
	},

	// Cards
	{
		id: 'CardBalance',
		path: '/cards/card_balance',
		component: PageCardBalance,
	},
	{
		id: 'CardsData',
		path: '/cards/cards_data',
		component: PageCardsData,
	},

	// Clients
	{
		id: 'Clients',
		path: '/clients/list',
		component: PageClients,
	},
	{
		id: 'ClientUsers',
		path: '/clients/client_users',
		component: PageClientUsers,
	},
	{
		id: 'ClientBalance',
		path: '/clients/client_balance',
		component: PageClientBalance,
	},

	// Dealers
	{
		id: 'Dealers',
		path: '/dealers/list',
		component: PageDealers,
	},
	{
		id: 'POS',
		path: '/dealers/pos',
		component: PagePOS,
	},
	{
		id: 'ConsumesByDealer',
		path: '/dealers/consumes_by_dealer',
		component: PageConsumesByDealer,
	},

	// Operations
	{
		id: 'Loads',
		path: '/operations/loads',
		component: PageLoads,
	},
	{
		id: 'ConsultLoads',
		path: '/operations/consult_loads',
		component: PageConsultLoads,
	},
	{
		id: 'Liquidations',
		path: '/operations/liquidations',
		component: PageLiquidations,
	},
	{
		id: 'Refunds',
		path: '/operations/refunds',
		component: PageRefunds,
	},

	// Reports
	{
		id: 'Reports',
		path: '/reports/:id',
		component: PageReports,
	},

	// Portal
	{
		id: 'POSOperations',
		path: '/portal/pos',
		component: PagePOSOperations,
	},
	{
		id: 'ConsultOperations',
		path: '/portal/consult_operations',
		component: PageConsultOperations,
	},
	{
		id: 'ConsultLiquidations',
		path: '/portal/consult_liquidations',
		component: PageConsultLiquidations,
	},

	// Security
	{
		id: 'Users',
		path: '/security/users',
		component: PageUsers,
	},
];

export const routes: Route[] = [{ id: 'SignIn', path: '/', component: SignIn }];
