import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { BasicTable, PageLoader, VolvoButton } from 'common/components';
import { getQueryRefundLiquidations } from 'common/services';
import { LIQUIDATIONS_COLUMNS } from 'pages/Liquidations/columns';
import { mapLiquidations } from 'pages/Liquidations/interfaces';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import LiquidationRow from '../LiquidationRow/LiquidationRow';

interface LiquidationsModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const LiquidationsModal: React.FC<LiquidationsModalProps> = ({
	show,
	id,
	onClose,
}: LiquidationsModalProps) => {
	const { data, status } = useQuery(
		['getQueryRefundLiquidations', id],
		getQueryRefundLiquidations,
	);
	const liquidations = useMemo(() => {
		if (data?.ok) {
			return mapLiquidations(data.data || []);
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
					<BasicTable columns={LIQUIDATIONS_COLUMNS}>
						<React.Fragment>
							{liquidations.map((item, i: number) => (
								<LiquidationRow key={i} item={item} />
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

export default LiquidationsModal;
