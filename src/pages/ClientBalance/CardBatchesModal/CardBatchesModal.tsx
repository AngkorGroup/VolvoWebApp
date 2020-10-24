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
import CardBatchesRow from './CardBatchesRow/CardBatchesRow';
import { CardBatchRow, VolvoCardData } from '../interfaces';
import { CARD_BATCH_COLUMNS } from '../columns';

interface CardBatchesModalProps {
	show: boolean;
	id: string;
	cardData: VolvoCardData;
	onClose: () => void;
}

const cardBatchRows: CardBatchRow[] = [
	{
		number: '924201002274611260',
		batch: '01012020',
		expiration: '01/01/2020',
		currency: 'US$',
		balance: '2,500.00',
	},
	{
		number: '924201002274611260',
		batch: '01062020',
		expiration: '01/06/2020',
		currency: 'US$',
		balance: '900.00',
	},
	{
		number: '924201002274611260',
		batch: '01072020',
		expiration: '01/07/2020',
		currency: 'US$',
		balance: '400.00',
	},
	{
		number: '924201002274611260',
		batch: '01082020',
		expiration: '01/08/2020',
		currency: 'US$',
		balance: '200.00',
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

const CardBatchesModal: React.FC<CardBatchesModalProps> = ({
	show,
	id: cardNumber,
	cardData,
	onClose,
}: CardBatchesModalProps) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [cardBatches, setCardBatches] = useState<CardBatchRow[]>([]);
	const { type, number, balance } = cardData;

	useEffect(() => {
		// perform API call with the 'cardNumber' param
		setLoading(true);
		setTimeout(() => {
			setCardBatches(cardBatchRows);
			setLoading(false);
		}, 1200);
	}, [cardNumber]);

	return (
		<Dialog
			fullWidth
			maxWidth='md'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Lotes</DialogTitle>
			<DialogContent>
				<div className={classes.cardContainer}>
					<VolvoCard
						type={type}
						balance={balance}
						title={type}
						number={number}
					/>
				</div>
				{loading && <PageLoader />}
				{!loading && (
					<BasicTable columns={CARD_BATCH_COLUMNS}>
						<React.Fragment>
							{cardBatches.map((item, i: number) => (
								<CardBatchesRow key={i} item={item} cardData={cardData} />
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

export default CardBatchesModal;
