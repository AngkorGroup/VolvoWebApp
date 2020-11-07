import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { BasicTable, PageLoader, VolvoButton } from 'common/components';
import { getUserCards } from 'common/services/Admins';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { BATCH_COLUMNS } from '../columns';
import { mapUserCards } from '../interfaces';
import CardRow from './CardRow/CardRow';

interface CardsModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const CardsModal: React.FC<CardsModalProps> = ({
	show,
	id,
	onClose,
}: CardsModalProps) => {
	//const [loading, setLoading] = useState(false);
	//const [cards, setCards] = useState<UserCard[]>([]);
	const { data, status } = useQuery(id, getUserCards);
	const cards = useMemo(() => {
		if (data?.ok) {
			return mapUserCards(data?.data || []);
		}
		return [];
	}, [data]);

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
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<BasicTable columns={BATCH_COLUMNS}>
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
