import { Client } from 'common/utils';

export interface TableClient {
	ruc: string;
	name: string;
	createdAt: string;
	address: string;
	phone: string;
	status: string;
}

export const mapClients = (clients: Client[]) => {
	return clients.map((c) => ({
		ruc: c.ruc,
		name: c.name,
		createdAt: c.createdAt,
		address: c.address,
		phone: c.phone,
		status: c.status,
	}));
};
