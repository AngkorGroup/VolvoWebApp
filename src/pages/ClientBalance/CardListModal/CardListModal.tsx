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
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { CARD_LIST_COLUMNS } from '../columns';
import { ClientCardRow, VolvoCardData } from '../interfaces';
import CardListRow from './CardListRow/CardListRow';

interface CardListModalProps {
	show: boolean;
	id: string;
	cardType: string;
	cardName: string;
	currency: string;
	balance: number;
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
	return data.map(({ id, code, contact, balance }) => ({
		cardId: `${id}`,
		number: code,
		contact: contact?.fullName,
		currency: balance?.currency,
		balance: balance?.value,
	}));
};

const CardListModal: React.FC<CardListModalProps> = ({
	show,
	id,
	cardType,
	cardName,
	currency,
	balance,
	clientId,
	onClose,
}: CardListModalProps) => {
	const classes = useStyles();
	const { data, status } = useQuery([clientId, id], getCardsByClientCardType);
	const cards = useMemo(() => {
		if (data?.ok) {
			return mapCardList(data?.data || []);
		}
		return [];
	}, [data]);

	const cardDisplayData: VolvoCardData = {
		id: '',
		type: cardType,
		balance,
		name: cardName,
		currency,
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
						balance={balance}
						title={cardName}
						currency={currency}
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
