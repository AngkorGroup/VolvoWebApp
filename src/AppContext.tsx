import UserRepository from 'common/repository/UserRepository';
import { Admin } from 'common/utils';
import React, { ReactElement, useState, useCallback } from 'react';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	user: Admin | null;
	setAppUser: (u: Admin | null, t?: string) => void;
	updateState: Function;
}

const initialState: ContextProps = {
	user: UserRepository.getUser(),
	setAppUser: () => {},
	updateState: Function.prototype,
};

type PartialContext = Partial<ContextProps>;
type Callback = Function | undefined;

const AppContext = React.createContext<PartialContext>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<PartialContext>(initialState);
	const updateState = useCallback(
		(newState: PartialContext, callback: Callback = undefined) => {
			setState((oldState: PartialContext) => ({ ...oldState, ...newState }));

			if (callback && typeof callback === 'function') {
				callback();
			}
		},
		[],
	);

	const setAppUser = useCallback((user: Admin | null, token: string = '') => {
		if (user && token) {
			UserRepository.setUser(user);
			UserRepository.setToken(token);
		} else {
			UserRepository.removeUser();
			UserRepository.removeToken();
		}
		setState((oldState: PartialContext) => ({
			...oldState,
			user,
		}));
	}, []);

	return (
		<AppContext.Provider value={{ ...state, updateState, setAppUser }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
export { AppProvider };
