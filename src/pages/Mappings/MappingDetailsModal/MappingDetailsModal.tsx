import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { GenericTable, PageLoader, VolvoButton } from 'common/components';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import {
	addMappingDetail,
	deleteMappingDetail,
	editMappingDetail,
	getQueryMappingDetails,
} from 'common/services';
import { buildAlertBody as at, MappingDetail } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { MAPPING_DETAIL_COLUMNS } from '../columns';
import { mapMappingDetails, MappingDetailForm } from '../interfaces';
import MappingDetailActions from '../MappingDetailActions/MappingDetailActions';
import FormModal from './FormModal/FormModal';

interface MappingDetailsModalProps {
	show: boolean;
	id: string;
	onClose: () => void;
}

const MappingDetailsModal: React.FC<MappingDetailsModalProps> = ({
	show,
	id,
	onClose,
}: MappingDetailsModalProps) => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const { data, status, refetch } = useQuery(
		['getQueryMappingDetails', id],
		getQueryMappingDetails,
	);
	const mappingHeaders = useMemo(() => {
		if (data?.ok) {
			return mapMappingDetails(data.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddMappingDetail = async (mapping: MappingDetailForm) => {
		const body: Partial<MappingDetail> = {
			type: mapping.type,
			documentType: mapping.documentType,
			line: mapping.line,
			recordType: mapping.recordType,
			company: mapping.company,
			reference: mapping.reference,
			postKey: mapping.postKey,
			account: mapping.account,
			sign: mapping.sign,
			taxCode: mapping.taxCode,
			taxAmount: mapping.taxAmount,
			costCenter: mapping.costCenter,
			profitCenter: mapping.profitCenter,
			tradePartner: mapping.tradePartner,
			docText: mapping.docText,
			moreInfo: mapping.moreInfo,
			businessArea: mapping.businessArea,
			market: mapping.market,
			customer: mapping.customer,
			productModel: mapping.productModel,
			lineType: mapping.lineType,
			classification: mapping.classification,
		};
		const response = await addMappingDetail({ ...body, mappingHeaderId: id });
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Detalle Mapping Agregado',
					'Se agregó un detalle de mapping correctamente',
				),
			);
		}
	};

	const onEditMappingDetail = async (mapping: MappingDetailForm) => {
		const body: Partial<MappingDetail> = {
			id: mapping.id,
			type: mapping.type,
			documentType: mapping.documentType,
			line: mapping.line,
			recordType: mapping.recordType,
			company: mapping.company,
			reference: mapping.reference,
			postKey: mapping.postKey,
			account: mapping.account,
			sign: mapping.sign,
			taxCode: mapping.taxCode,
			taxAmount: mapping.taxAmount,
			costCenter: mapping.costCenter,
			profitCenter: mapping.profitCenter,
			tradePartner: mapping.tradePartner,
			docText: mapping.docText,
			moreInfo: mapping.moreInfo,
			businessArea: mapping.businessArea,
			market: mapping.market,
			customer: mapping.customer,
			productModel: mapping.productModel,
			lineType: mapping.lineType,
			classification: mapping.classification,
		};
		const response = await editMappingDetail(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Detalle Mapping Editado',
					'Se editó un detalle de mapping correctamente',
				),
			);
		}
	};

	const onDeleteMappingDetail = async (id: string) => {
		const response = await deleteMappingDetail(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Detalle Mapping Eliminado',
					'Se eliminó un detalle de mapping correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...MAPPING_DETAIL_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<MappingDetailActions
						item={cell?.row?.original}
						onEdit={onEditMappingDetail}
						onDelete={onDeleteMappingDetail}
					/>
				),
			},
		],
		// eslint-disable-next-line
		[],
	);

	return (
		<Dialog
			fullWidth
			maxWidth='lg'
			open={show}
			onClose={onClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Detalle de Mapping</DialogTitle>
			<DialogContent>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable
						filename={`Detalle_Mapping_${id}`}
						columns={columns}
						data={mappingHeaders}
						rightButton={
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
						}
					/>
				)}
				{showAddModal && (
					<FormModal
						title='Agregar Detalle de Mapping'
						show={showAddModal}
						onClose={setAddModalVisible(false)}
						onConfirm={onAddMappingDetail}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default MappingDetailsModal;
