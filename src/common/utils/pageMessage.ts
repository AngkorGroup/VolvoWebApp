export type MessageStatus = 'success' | 'info' | 'warning' | 'error';

export interface PageMessage {
	title: string;
	text: string | JSX.Element;
	status: MessageStatus;
	ttl?: number;
}

export interface PageAlertMessage {
	title: string;
	body: string;
}

export const ALERT_SEPARATOR = '|';

export const DEFAULT_DURATION = 4000;

export const buildAlertBody = (title: string, msg: string) => `${title}|${msg}`;

export const getPageAlertMessage = (message: string): PageAlertMessage => {
	const body = message.split(ALERT_SEPARATOR);
	return {
		title: body[0],
		body: body[1],
	};
};
