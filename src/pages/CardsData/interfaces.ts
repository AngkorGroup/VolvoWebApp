interface Contact {
	id: string;
	name: string;
	type: string;
}

export interface CardData {
	type: string;
	number: string;
	tpNumber: string;
	createdAt: string;
	currency: string;
	contact: Contact;
	status: string;
}
