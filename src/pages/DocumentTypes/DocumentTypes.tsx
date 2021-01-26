import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
} from 'common/components';
import AddIcon from '@material-ui/icons/Add';
import {
	addDocumentType,
	deleteDocumentType,
	editDocumentType,
	getQueryDocumentTypes,
} from 'common/services';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { mapDocumentTypes } from './interfaces';
import { DOCUMENT_TYPES_COLUMNS } from './columns';
import { buildAlertBody as at } from 'common/utils';
import { useAlert } from 'react-alert';
import { DocumentTypeForm } from 'common/validations';
import FormModal from './FormModal/FormModal';
import { ACTIONS_COLUMN_V2 } from 'common/constants';
import DocumentTypeActions from './DocumentTypeActions/DocumentTypeActions';

const DocumentTypes: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryDocumentTypes', onlyActive],
		getQueryDocumentTypes,
	);
	const documentTypes = useMemo(() => {
		if (data?.ok) {
			return mapDocumentTypes(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onAdd = async (form: DocumentTypeForm) => {
		const body = {
			name: form.name,
			tpCode: form.tpCode,
			abbreviation: form.abbreviation,
			sunatCode: form.sunatCode,
		};
		const response = await addDocumentType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Documento Agregado',
					'Se agregó un tipo de documento correctamente',
				),
			);
		}
	};

	const onEdit = async (form: DocumentTypeForm) => {
		const body = {
			id: form.id,
			name: form.name,
			tpCode: form.tpCode,
			abbreviation: form.abbreviation,
			sunatCode: form.sunatCode,
		};
		const response = await editDocumentType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Documento Editado',
					'Se editó un tipo de documento correctamente',
				),
			);
		}
	};

	const onDelete = async (id: string) => {
		const response = await deleteDocumentType(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Documento Eliminado',
					'Se eliminó un tipo de documento correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...DOCUMENT_TYPES_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<DocumentTypeActions
						item={cell?.row?.original}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				),
			},
		],
		// eslint-disable-next-line
		[],
	);
	return (
		<div>
			<div>
				<PageTitle title='Tipos de Documento' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Tipos_de_documento'
							columns={columns}
							data={documentTypes}
							customFilters={
								<OnlyActiveFilter
									checked={onlyActive}
									onChange={onOnlyActiveChange}
								/>
							}
							rightButton={
								<VolvoButton
									text='Agregar'
									icon={<AddIcon />}
									color='primary'
									onClick={setAddModalVisible(true)}
								/>
							}
						/>
					</PageBody>
				)}
			</PageBody>
			{showAddModal && (
				<FormModal
					title='Agregar Tipo de Documento'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAdd}
				/>
			)}
		</div>
	);
};

export default DocumentTypes;
