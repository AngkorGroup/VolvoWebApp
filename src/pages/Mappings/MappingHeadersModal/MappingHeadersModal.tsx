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
	addMappingHeader,
	deleteMappingHeader,
	editMappingHeader,
	getQueryMappingHeaders,
} from 'common/services';
import { buildAlertBody as at, MappingHeader } from 'common/utils';
import React, { useMemo, useState } from 'react';
import { useAlert } from 'react-alert';
import { useQuery } from 'react-query';
import { MAPPING_HEADER_COLUMNS } from '../columns';
import { mapMappingHeaders, MappingHeaderForm } from '../interfaces';
import MappingHeaderActions from '../MappingHeaderActions/MappingHeaderActions';
import FormModal from './FormModal/FormModal';

interface MappingHeadersModalProps {
	show: boolean;
	id: string;
	mappingNumber: string;
	onClose: () => void;
}

const MappingHeadersModal: React.FC<MappingHeadersModalProps> = ({
	show,
	id,
	mappingNumber,
	onClose,
}: MappingHeadersModalProps) => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const { data, status, refetch } = useQuery(
		['getQueryMappingHeaders', id],
		getQueryMappingHeaders,
	);
	const mappingHeaders = useMemo(() => {
		if (data?.ok) {
			return mapMappingHeaders(data.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddMappingHeader = async (mapping: MappingHeaderForm) => {
		const body: Partial<MappingHeader> = {
			type: mapping.type,
			recordType: mapping.recordType,
			company: mapping.company,
			documentNumber: mapping.documentNumber,
			reference: mapping.reference,
			control: mapping.control,
			documentType: mapping.documentType,
			documentDate: mapping.documentDate,
			postDate: mapping.postDate,
			currency: mapping.currency,
			exchangeRate: mapping.exchangeRate,
			documentHeader: mapping.documentHeader,
			translationDate: mapping.translationDate,
			intercompanyNumber: mapping.intercompanyNumber,
			tradingPartner: mapping.tradingPartner,
			exchangeRateType: mapping.exchangeRateType,
			postingPeriod: mapping.postingPeriod,
			exchangeRateToFactor: mapping.exchangeRateToFactor,
			exchangeRateFromFactor: mapping.exchangeRateFromFactor,
			reversalReason: mapping.reversalReason,
			reversalDate: mapping.reversalDate,
		};
		const response = await addMappingHeader({ ...body, mappingId: id });
		if (response.ok) {
			refetch();
			alert.success(
				at('Cabecera Agregada', 'Se agregó una cabecera correctamente'),
			);
		}
	};

	const onEditMappingHeader = async (mapping: MappingHeaderForm) => {
		const body: Partial<MappingHeader> = {
			id: mapping.id,
			type: mapping.type,
			recordType: mapping.recordType,
			company: mapping.company,
			documentNumber: mapping.documentNumber,
			reference: mapping.reference,
			control: mapping.control,
			documentType: mapping.documentType,
			documentDate: mapping.documentDate,
			postDate: mapping.postDate,
			currency: mapping.currency,
			exchangeRate: mapping.exchangeRate,
			documentHeader: mapping.documentHeader,
			translationDate: mapping.translationDate,
			intercompanyNumber: mapping.intercompanyNumber,
			tradingPartner: mapping.tradingPartner,
			exchangeRateType: mapping.exchangeRateType,
			postingPeriod: mapping.postingPeriod,
			exchangeRateToFactor: mapping.exchangeRateToFactor,
			exchangeRateFromFactor: mapping.exchangeRateFromFactor,
			reversalReason: mapping.reversalReason,
			reversalDate: mapping.reversalDate,
		};
		const response = await editMappingHeader(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cabecera Editada', 'Se editó una cabecera correctamente'),
			);
		}
	};

	const onDeleteMappingHeader = async (id: string) => {
		const response = await deleteMappingHeader(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Cabecera Eliminada', 'Se eliminó una cabecera correctamente'),
			);
		}
	};

	const columns = useMemo(
		() => [
			...MAPPING_HEADER_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<MappingHeaderActions
						item={cell?.row?.original}
						onEdit={onEditMappingHeader}
						onDelete={onDeleteMappingHeader}
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
			<DialogTitle id='alert-dialog-title'>
				Cabecera de Mapping Número {mappingNumber}
			</DialogTitle>
			<DialogContent>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<GenericTable
						filename={`Cabecera_Mapping_${id}`}
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
						title='Agregar Cabecera de Mapping'
						show={showAddModal}
						onClose={setAddModalVisible(false)}
						onConfirm={onAddMappingHeader}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<VolvoButton onClick={onClose} variant='text' text='Cerrar' />
			</DialogActions>
		</Dialog>
	);
};

export default MappingHeadersModal;
