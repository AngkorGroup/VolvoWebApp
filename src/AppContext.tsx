import UserRepository from 'common/repository/UserRepository';
import { PageMessage, Admin } from 'common/utils';
import React, { ReactElement, useState, useCallback } from 'react';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	user: Admin | null;
	pageMessages: PageMessage[];
	addPageMessage: (m: PageMessage) => void;
	setAppUser: (u: Admin | null, t?: string) => void;
	updateState: Function;
}

const initialState: ContextProps = {
	user: UserRepository.getUser(),
	pageMessages: [],
	addPageMessage: () => {},
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

	const addPageMessage = useCallback((message: PageMessage) => {
		setState((oldState: PartialContext) => ({
			...oldState,
			pageMessages: [...(oldState.pageMessages || []), message],
		}));
	}, []);

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
		<AppContext.Provider
			value={{ ...state, updateState, addPageMessage, setAppUser }}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
export { AppProvider };
