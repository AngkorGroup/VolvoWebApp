import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { TableClient } from '../interface';

interface ClientRowProps {
	item: TableClient;
}

const ClientRow = ({ item }: ClientRowProps) => {
	const { ruc, name, createdAt, address, phone, status } = item;
	return (
		<TableRow>
			<TableCell>{ruc}</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{createdAt}</TableCell>
			<TableCell>{address}</TableCell>
			<TableCell>{phone}</TableCell>
			<TableCell>{status}</TableCell>
		</TableRow>
	);
};

export default ClientRow;
