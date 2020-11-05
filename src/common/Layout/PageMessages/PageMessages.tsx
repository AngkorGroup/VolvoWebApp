import React, { useContext } from 'react';
import AppContext from '../../../AppContext';
import { PageMessage } from '../../utils/pageMessage';
import Message from './Message/Message';

const PageMessages: React.FC = () => {
	//const { pageMessages } = useContext(AppContext);
	return (
		<div>
			{[]?.map((m: PageMessage, i) => (
				<Message
					key={i}
					title={m.title}
					message={m.text}
					status={m.status}
					duration={m.ttl}
				/>
			))}
		</div>
	);
};

export default PageMessages;
