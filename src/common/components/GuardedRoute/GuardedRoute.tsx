import AppContext from 'AppContext';
import HOCLayout from 'common/Layout/HOCLayout';
import { getAllMenuIds, isRouteAllow } from 'common/utils';
import React, { useContext } from 'react';
import {
	Route,
	Redirect,
	RouteComponentProps,
	RouteProps,
} from 'react-router-dom';
import Unauthorized from '../Unauthorized/Unauthorized';

interface GuardedRouteProps {
	id: string;
	component: React.FC<RouteComponentProps<any>>;
}

const GuardedRoute: React.FC<GuardedRouteProps & RouteProps> = ({
	id,
	component: Component,
	...rest
}: GuardedRouteProps) => {
	const { user } = useContext(AppContext);
	const isAuth = !!user;
	const accesses = user?.menuOptions || getAllMenuIds();
	const LayoutUnauthorized = HOCLayout(Unauthorized);

	return (
		<Route
			{...rest}
			render={(props) => {
				const routeId = id === 'REPORTS' ? props.match?.params?.id : id;
				const isAllowed = isRouteAllow(routeId, accesses);
				if (isAuth) {
					return isAllowed ? <Component {...props} /> : <LayoutUnauthorized />;
				}
				return <Redirect to='/' />;
			}}
		/>
	);
};

export default GuardedRoute;
