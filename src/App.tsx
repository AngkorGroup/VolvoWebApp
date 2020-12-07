import MomentUtils from '@date-io/moment';
import {
	CircularProgress,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import GuardedRoute from 'common/components/GuardedRoute/GuardedRoute';
import moment from 'moment';
import React, { Suspense } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AppProvider } from './AppContext';
import { routes, Route as RouteType, guarded } from './routes';
import pageTheme from './theme';

const theme = createMuiTheme({
	...pageTheme,
});

const queryCache = new QueryCache({
	defaultConfig: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App = () => {
	return (
		<div className='App'>
			<ReactQueryCacheProvider queryCache={queryCache}>
				<ThemeProvider theme={theme}>
					<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
						<AppProvider>
							<Router>
								<Suspense
									fallback={<CircularProgress size={40} thickness={4} />}
								>
									<Switch>
										{routes.map((route: RouteType) => (
											<Route
												key={route.id}
												exact
												path={route.path}
												component={route.component}
											/>
										))}
										{guarded.map((route: RouteType) => (
											<GuardedRoute
												id={route.id}
												key={route.id}
												exact
												path={route.path}
												component={route.component}
											/>
										))}
									</Switch>
								</Suspense>
							</Router>
						</AppProvider>
					</MuiPickersUtilsProvider>
				</ThemeProvider>
			</ReactQueryCacheProvider>
		</div>
	);
};

export default App;
