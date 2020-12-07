import AppContext from 'AppContext';
import HOCLayout from 'common/Layout/HOCLayout';
import { getAllMenuIds, isRouteExcluded } from 'common/utils';
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
	const isAllowed = accesses.some((key) => key === id) || isRouteExcluded(id);
	const LayoutUnauthorized = HOCLayout(Unauthorized);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return isAllowed ? <Component {...props} /> : <LayoutUnauthorized />;
				}
				return <Redirect to='/' />;
			}}
		/>
	);
};

export default GuardedRoute;
