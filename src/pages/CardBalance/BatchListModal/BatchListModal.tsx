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
import { BATCH_COLUMNS } from '../columns';
import { Batch } from '../interface';
import BatchRow from './BatchRow/BatchRow';

interface BatchListModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const batchRows: Batch[] = [
	{
		number: '924201002274611260',
		batch: '01012020',
		expirationDate: '01/01/2021',
		currency: 'US$',
		balance: '2,500.00',
	},
	{
		number: '924201002274611260',
		batch: '01012020',
		expirationDate: '01/06/2021',
		currency: 'US$',
		balance: '900.00',
	},
	{
		number: '924201002274611260',
		batch: '01012020',
		expirationDate: '01/07/2021',
		currency: 'US$',
		balance: '400.00',
	},
	{
		number: '924201002274611260',
		batch: '01012020',
		expirationDate: '01/08/2021',
		currency: 'US$',
		balance: '200.00',
	},
];

const BatchListModal: React.FC<BatchListModalProps> = ({
	show,
	id,
	onClose,
}: BatchListModalProps) => {
	const [loading, setLoading] = useState(false);
	const [batches, setBatches] = useState<Batch[]>([]);

	useEffect(() => {
		// perform API call with the 'id' param
		setLoading(true);
		setTimeout(() => {
			setBatches(batchRows);
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
			<DialogTitle id='alert-dialog-title'>Lotes</DialogTitle>
			<DialogContent>
				{loading && <PageLoader />}
				{!loading && (
					<BasicTable columns={BATCH_COLUMNS}>
						<React.Fragment>
							{batches.map((item, i: number) => (
								<BatchRow key={i} item={item} />
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

export default BatchListModal;
