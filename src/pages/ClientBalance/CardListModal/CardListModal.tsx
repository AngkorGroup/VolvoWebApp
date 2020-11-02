import {
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Theme,
} from '@material-ui/core';
import {
	BasicTable,
	PageLoader,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { getCardsByClientCardType } from 'common/services';
import { Card } from 'common/utils';
import React from 'react';
import { useQuery } from 'react-query';
import { CARD_LIST_COLUMNS } from '../columns';
import { ClientCardRow, VolvoCardData } from '../interfaces';
import CardListRow from './CardListRow/CardListRow';

interface CardListModalProps {
	show: boolean;
	id: string;
	cardType: string;
	currency: string;
	balance: string;
	clientId: string;
	onClose: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
	createStyles({
		cardContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: spacing(2),
		},
	}),
);

const mapCardList = (data: Card[]): ClientCardRow[] => {
	return data.map((d) => ({
		number: d.code,
		contact: d.contact.fullName,
		currency: d.balance.currency,
		balance: d.balance.value,
	}));
};

const CardListModal: React.FC<CardListModalProps> = ({
	show,
	id,
	cardType,
	currency,
	balance,
	clientId,
	onClose,
}: CardListModalProps) => {
	const classes = useStyles();
	const { data, status } = useQuery([clientId, id], getCardsByClientCardType);
	const cards = mapCardList(data?.data || []);

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
						currency=''
					/>
				</div>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
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
