import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { BasicTable, PageLoader, VolvoButton } from 'common/components';
import { getRefundConsumes } from 'common/services';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { REFUNDS_COLUMNS } from '../columns';
import ConsumeRow from '../ConsumeRow/ConsumeRow';
import { mapCharges } from '../interfaces';

interface DetailModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
	show,
	id,
	onClose,
}: DetailModalProps) => {
	const { data, status } = useQuery(
		['getRefundConsumes', id],
		getRefundConsumes,
	);
	const consumes = useMemo(() => {
		if (data?.ok) {
			return mapCharges(data.data || []);
		}
		return [];
	}, [data]);

	return (
		<Dialog
			fullWidth
			maxWidth='lg'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Consumos</DialogTitle>
			<DialogContent>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<BasicTable columns={REFUNDS_COLUMNS}>
						<React.Fragment>
							{consumes.map((item, i: number) => (
								<ConsumeRow key={i} item={item} />
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

export default DetailModal;
