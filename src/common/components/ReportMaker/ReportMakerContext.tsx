import React, {
	createContext,
	ReactElement,
	useCallback,
	useState,
} from 'react';

interface AppProviderProps {
	children: ReactElement;
}

interface ContextProps {
	clientId?: string;
	startDate?: string;
	endDate?: string;
	cardTypes?: string[];
	dealerId?: string;
	economicGroup?: boolean;
	businessAreas?: string[];
	chargeTypes?: string[];
	sectors?: string[];
	updateState: Function;
}

const initialState: ContextProps = {
	clientId: '',
	startDate: '',
	endDate: '',
	cardTypes: undefined,
	dealerId: '',
	economicGroup: false,
	businessAreas: undefined,
	chargeTypes: undefined,
	sectors: undefined,
	updateState: Function.prototype,
};

const ReportMakerContext = createContext<ContextProps>({
	updateState: Function.prototype,
});

const ReportMakerProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState<ContextProps>(initialState);
	const updateState = useCallback((newState: ContextProps) => {
		setState((old: ContextProps) => ({ ...old, ...newState }));
	}, []);
	return (
		<ReportMakerContext.Provider value={{ ...state, updateState }}>
			{children}
		</ReportMakerContext.Provider>
	);
};

export default ReportMakerContext;
export { ReportMakerProvider };
