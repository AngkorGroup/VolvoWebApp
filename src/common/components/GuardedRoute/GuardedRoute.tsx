import AppContext from 'AppContext';
import React, { useContext } from 'react';
import {
	Route,
	Redirect,
	RouteComponentProps,
	RouteProps,
} from 'react-router-dom';

interface GuardedRouteProps {
	component: React.FC<RouteComponentProps<any>>;
}

const GuardedRoute: React.FC<GuardedRouteProps & RouteProps> = ({
	component: Component,
	...rest
}: GuardedRouteProps) => {
	const { user } = useContext(AppContext);
	const isAuth = !!user;

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	);
};

export default GuardedRoute;
