import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BasicTable from '../../../common/components/BasicTable/BasicTable';
import PageLoader from '../../../common/components/PageLoader/PageLoader';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';
import { UserCard } from '../interfaces';
import CardRow from './CardRow/CardRow';

interface CardsModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const batchColumns = [
	{ title: 'Número' },
	{ title: 'Fecha de Creación' },
	{ title: 'Tipo' },
	{ title: 'Moneda' },
	{ title: 'Saldo', props: { align: 'center' as 'center' } },
];

const batchRows: UserCard[] = [
	{
		number: '924201002274611260',
		createdAt: '01/01/2021',
		type: 'VURE',
		currency: 'US$',
		balance: '4,000.00',
	},
	{
		number: '924201002274611275',
		createdAt: '11/01/2021',
		type: 'VURE',
		currency: 'US$',
		balance: '1,400.00',
	},
	{
		number: '924201002274611297',
		createdAt: '15/01/2021',
		type: 'VREP',
		currency: 'US$',
		balance: '1,000.00',
	},
	{
		number: '924201002274611231',
		createdAt: '16/01/2021',
		type: 'VREP',
		currency: 'US$',
		balance: '2,000.00',
	},
];

const CardsModal: React.FC<CardsModalProps> = ({
	show,
	id,
	onClose,
}: CardsModalProps) => {
	const [loading, setLoading] = useState(false);
	const [cards, setCards] = useState<UserCard[]>([]);

	useEffect(() => {
		// perform API call with the 'id' param
		setLoading(true);
		setTimeout(() => {
			setCards(batchRows);
			setLoading(false);
		}, 1200);
	}, [id]);

	return (
		<Dialog
			fullWidth
			maxWidth='md'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Tarjetas</DialogTitle>
			<DialogContent>
				{loading && <PageLoader />}
				{!loading && (
					<BasicTable columns={batchColumns}>
						<React.Fragment>
							{cards.map((item, i: number) => (
								<CardRow key={i} item={item} />
							))}
						</React.Fragment>
					</BasicTable>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default CardsModal;
