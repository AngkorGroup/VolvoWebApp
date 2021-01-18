import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { GenericTable, PageLoader, VolvoButton } from 'common/components';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import { getQueryRefundLiquidations } from 'common/services';
import { mapLiquidations } from 'pages/Liquidations/interfaces';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { LIQUIDATIONS_COLUMNS } from '../columns';
import LiquidationActions from '../LiquidationActions/LiquidationActions';

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

	const columns = useMemo(
		() => [
			...LIQUIDATIONS_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => <LiquidationActions item={cell?.row?.original} />,
			},
		],
		[],
	);
	return (
		<Dialog fullWidth maxWidth='xl' open={show} onClose={onClose}>
			<DialogTitle id='alert-dialog-title'>Liquidaciones</DialogTitle>
			<DialogContent>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable columns={columns} data={liquidations} />
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default LiquidationsModal;
