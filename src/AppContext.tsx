import React, { ReactElement, useState, useCallback } from 'react';
import { PageMessage } from './common/utils/pageMessage';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	pageMessages: PageMessage[];
	addPageMessage: (m: PageMessage) => void;
	updateState: Function;
}

const initialState: ContextProps = {
	pageMessages: [],
	addPageMessage: () => {},
	updateState: Function.prototype,
};

type PartialContext = Partial<ContextProps>;
type Callback = Function | undefined;

const AppContext = React.createContext<PartialContext>({});

const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<PartialContext>(initialState);
	const updateState = useCallback(
		(newState: PartialContext, callback: Callback = undefined) => {
			setState((state: PartialContext) => ({ ...state, ...newState }));

			if (callback && typeof callback === 'function') {
				callback();
			}
		},
		[],
	);

	const addPageMessage = useCallback((message: PageMessage) => {
		setState((state: PartialContext) => ({
			...state,
			pageMessages: [...(state.pageMessages || []), message],
		}));
	}, []);

	return (
		<AppContext.Provider value={{ ...state, updateState, addPageMessage }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
export { AppProvider };
