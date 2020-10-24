import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Theme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BasicTable from '../../../common/components/BasicTable/BasicTable';
import PageLoader from '../../../common/components/PageLoader/PageLoader';
import VolvoButton from '../../../common/components/VolvoButton/VolvoButton';
import VolvoCard from '../../../common/components/VolvoCard/VolvoCard';
import { CARD_LIST_COLUMNS } from '../columns';
import { ClientCardRow, VolvoCardData } from '../interfaces';
import CardListRow from './CardListRow/CardListRow';

interface CardListModalProps {
	show: boolean;
	id: string;
	cardType: string;
	currency: string;
	balance: string;
	onClose: () => void;
}

const clientCardRows: ClientCardRow[] = [
	{
		number: '924201002274611260',
		contact: 'Federico Montero',
		currency: 'US$',
		balance: '4,000.00',
	},
	{
		number: '924201002274611275',
		contact: 'Gianfranco Galvez',
		currency: 'US$',
		balance: '1,400.00',
	},
	{
		number: '924201002274611297',
		contact: 'Mauricio Castañeda',
		currency: 'US$',
		balance: '1,000.00',
	},
	{
		number: '924201002274611231',
		contact: 'Brajean Junchaya',
		currency: 'US$',
		balance: '2,000.00',
	},
];

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		cardContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: spacing(2),
		},
	}),
);

const CardListModal: React.FC<CardListModalProps> = ({
	show,
	id,
	cardType,
	currency,
	balance,
	onClose,
}: CardListModalProps) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [cards, setCards] = useState<ClientCardRow[]>([]);

	useEffect(() => {
		// perform API call with the 'id' param
		setLoading(true);
		setTimeout(() => {
			setCards(clientCardRows);
			setLoading(false);
		}, 1200);
	}, [id]);

	const cardDisplayData: VolvoCardData = {
		type: cardType,
		number: '',
		balance: `${currency} ${balance}`,
	};

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
				<div className={classes.cardContainer}>
					<VolvoCard
						type={cardType}
						balance={cardDisplayData.balance}
						title={cardType}
					/>
				</div>
				{loading && <PageLoader />}
				{!loading && (
					<BasicTable columns={CARD_LIST_COLUMNS}>
						<React.Fragment>
							{cards.map((item, i: number) => (
								<CardListRow key={i} item={item} cardData={cardDisplayData} />
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

export default CardListModal;
