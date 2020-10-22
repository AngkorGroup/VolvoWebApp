export type MessageStatus = 'success' | 'info' | 'warning' | 'error';

export interface PageMessage {
	title: string;
	text: string;
	status: MessageStatus;
	ttl?: number;
}

export const DEFAULT_DURATION = 4000;
