import ForgotPassword from 'pages/ForgotPassword/ForgotPassword';
import RecoverPassword from 'pages/RecoverPassword/RecoverPassword';
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

const PageBanks = (props: any) => {
	const Banks = lazy(() => import('./pages/Banks/Banks'));
	const LayoutBanks = HOCLayout(Banks);
	return <LayoutBanks {...props} />;
};

const PageBankAccountTypes = (props: any) => {
	const BankAccountTypes = lazy(
		() => import('./pages/BankAccountTypes/BankAccountTypes'),
	);
	const LayoutBankAccountTypes = HOCLayout(BankAccountTypes);
	return <LayoutBankAccountTypes {...props} />;
};

const PageBankAccounts = (props: any) => {
	const BankAccounts = lazy(() => import('./pages/BankAccounts/BankAccounts'));
	const LayoutBankAccounts = HOCLayout(BankAccounts);
	return <LayoutBankAccounts {...props} />;
};

const PageCurrencies = (props: any) => {
	const Currencies = lazy(() => import('./pages/Currencies/Currencies'));
	const LayoutCurrencies = HOCLayout(Currencies);
	return <LayoutCurrencies {...props} />;
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

const PageAmplitudes = (props: any) => {
	const Amplitudes = lazy(() => import('./pages/Amplitudes/Amplitudes'));
	const LayoutAmplitudes = HOCLayout(Amplitudes);
	return <LayoutAmplitudes {...props} />;
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

const PageRoles = (props: any) => {
	const Roles = lazy(() => import('./pages/Roles/Roles'));
	const LayoutRoles = HOCLayout(Roles);
	return <LayoutRoles {...props} />;
};

const PageProfile = (props: any) => {
	const Profile = lazy(() => import('./pages/Profile/Profile'));
	const LayoutProfile = HOCLayout(Profile);
	return <LayoutProfile {...props} />;
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

const PageRechargeTypes = (props: any) => {
	const RechargeTypes = lazy(
		() => import('./pages/RechargeTypes/RechargeTypes'),
	);
	const LayoutRechargeTypes = HOCLayout(RechargeTypes);
	return <LayoutRechargeTypes {...props} />;
};

const PageBusinessAreas = (props: any) => {
	const BusinessAreas = lazy(
		() => import('./pages/BusinessAreas/BusinessAreas'),
	);
	const LayoutBusinessAreas = HOCLayout(BusinessAreas);
	return <LayoutBusinessAreas {...props} />;
};

const PageSectors = (props: any) => {
	const Sectors = lazy(() => import('./pages/Sectors/Sectors'));
	const LayoutSectors = HOCLayout(Sectors);
	return <LayoutSectors {...props} />;
};

const PageMappings = (props: any) => {
	const Mappings = lazy(() => import('./pages/Mappings/Mappings'));
	const LayoutMappings = HOCLayout(Mappings);
	return <LayoutMappings {...props} />;
};

export interface Route {
	id: string;
	path: string;
	component: (props: any) => JSX.Element;
}

export const guarded: Route[] = [
	// Configuration
	{
		id: 'CARD_TYPES',
		path: '/configuration/card_types',
		component: PageCardTypes,
	},
	{
		id: 'RECHARGE_TYPES',
		path: '/configuration/recharge_types',
		component: PageRechargeTypes,
	},
	{
		id: 'BUSINESS_AREAS',
		path: '/configuration/business_areas',
		component: PageBusinessAreas,
	},
	{
		id: 'DOCUMENT_TYPES',
		path: '/configuration/document_types',
		component: PageDocumentTypes,
	},
	{
		id: 'SECTORS',
		path: '/configuration/sectors',
		component: PageSectors,
	},
	{
		id: 'CURRENCIES',
		path: '/configuration/currencies',
		component: PageCurrencies,
	},
	{
		id: 'BANKS',
		path: '/configuration/banks',
		component: PageBanks,
	},
	{
		id: 'BANK_ACCOUNT_TYPES',
		path: '/configuration/bank_account_types',
		component: PageBankAccountTypes,
	},
	{
		id: 'BANK_ACCOUNTS',
		path: '/configuration/bank_accounts',
		component: PageBankAccounts,
	},
	{
		id: 'MAPPINGS',
		path: '/configuration/mappings',
		component: PageMappings,
	},

	// Cards
	{
		id: 'CARD_BALANCE',
		path: '/cards/card_balance',
		component: PageCardBalance,
	},
	{
		id: 'CARDS_DATA',
		path: '/cards/cards_data',
		component: PageCardsData,
	},

	// Clients
	{
		id: 'CLIENT_LIST',
		path: '/clients/list',
		component: PageClients,
	},
	{
		id: 'CLIENT_USERS',
		path: '/clients/client_users',
		component: PageClientUsers,
	},
	{
		id: 'CLIENT_BALANCE',
		path: '/clients/client_balance',
		component: PageClientBalance,
	},

	// Dealers
	{
		id: 'DEALER_LIST',
		path: '/dealers/list',
		component: PageDealers,
	},
	{
		id: 'POS',
		path: '/dealers/pos',
		component: PagePOS,
	},
	{
		id: 'CONSUMES_BY_DEALERS',
		path: '/dealers/consumes_by_dealer',
		component: PageConsumesByDealer,
	},

	// Operations
	{
		id: 'LOADS',
		path: '/operations/loads',
		component: PageLoads,
	},
	{
		id: 'CONSULT_LOADS',
		path: '/operations/consult_loads',
		component: PageConsultLoads,
	},
	{
		id: 'AMPLITUDES',
		path: '/operations/extend_expirations',
		component: PageAmplitudes,
	},
	{
		id: 'LIQUIDATIONS',
		path: '/operations/liquidations',
		component: PageLiquidations,
	},
	{
		id: 'REFUNDS',
		path: '/operations/refunds',
		component: PageRefunds,
	},

	// Reports
	{
		id: 'REPORTS',
		path: '/reports/:id',
		component: PageReports,
	},

	// Portal
	{
		id: 'POS_OPERATIONS',
		path: '/portal/pos',
		component: PagePOSOperations,
	},
	{
		id: 'CONSULT_OPERATIONS',
		path: '/portal/consult_operations',
		component: PageConsultOperations,
	},
	{
		id: 'CONSULT_LIQUIDATIONS',
		path: '/portal/consult_liquidations',
		component: PageConsultLiquidations,
	},

	// Security
	{
		id: 'USERS',
		path: '/security/users',
		component: PageUsers,
	},
	{
		id: 'ROLES',
		path: '/security/roles',
		component: PageRoles,
	},
	{
		id: 'PROFILE',
		path: '/security/profile',
		component: PageProfile,
	},
];

export const routes: Route[] = [
	{
		id: 'SIGN_IN',
		path: '/',
		component: SignIn,
	},
	{
		id: 'FORGOT_PASSWORD',
		path: '/forgot_password',
		component: ForgotPassword,
	},
	{
		id: 'RECOVER_PASSWORD',
		path: '/security/recover/:token',
		component: RecoverPassword,
	},
];
