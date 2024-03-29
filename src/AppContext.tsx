import UserRepository from 'common/repository/UserRepository';
import { getDocumentTypes, getQueryCurrencies } from 'common/services';
import { Admin, Option, parseListValues } from 'common/utils';
import React, { ReactElement, useState, useCallback, useEffect } from 'react';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	user: Admin | null;
	currencies: Option[];
	documentTypes: Option[];
	setAppUser: (u: Admin | null, t?: string) => void;
	updateState: Function;
}

const initialState: ContextProps = {
	user: UserRepository.getUser(),
	currencies: [],
	documentTypes: [],
	setAppUser: () => {},
	updateState: Function.prototype,
};

type Callback = Function | undefined;
type ListValues = { currencies: Option[]; documentTypes: Option[] };

const AppContext = React.createContext<ContextProps>(initialState);

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<ContextProps>(initialState);

	useEffect(() => {
		if (state.user) {
			const getListValues = async () => {
				const curResponse = await getQueryCurrencies();
				const docResponse = await getDocumentTypes();
				const listValues: ListValues = { currencies: [], documentTypes: [] };
				if (curResponse.ok) {
					listValues.currencies = parseListValues(curResponse.data || []);
				}
				if (docResponse.ok) {
					listValues.documentTypes = parseListValues(docResponse.data || []);
				}
				setState((old) => ({ ...old, ...listValues }));
			};
			getListValues();
		}
	}, [state.user]);

	const updateState = useCallback(
		(newState: ContextProps, callback: Callback = undefined) => {
			setState((oldState: ContextProps) => ({ ...oldState, ...newState }));

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
		setState((oldState: ContextProps) => ({
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
