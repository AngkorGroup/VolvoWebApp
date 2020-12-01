import {
	BasicTable,
	OnlyActiveFilter,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
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
import { mapDocumentTypes, DocumentTypeColumn } from './interfaces';
import { DOCUMENT_TYPES_COLUMNS } from './columns';
import { filterRows, buildAlertBody as at } from 'common/utils';
import DocumentTypeRow from './DocumentTypeRow/DocumentTypeRow';
import { useAlert } from 'react-alert';
import { DocumentTypeForm } from 'common/validations/DocumentType';
import FormModal from './FormModal/FormModal';

const DocumentTypes: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const [filtered, setFiltered] = useState<DocumentTypeColumn[]>([]);
	const { data, status, refetch } = useQuery(
		['getQueryDocumentTypes', onlyActive],
		getQueryDocumentTypes,
	);
	const documentTypes = useMemo(() => {
		if (data?.ok) {
			const rows = mapDocumentTypes(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, documentTypes);
		setQuery(newQuery);
		setFiltered(filtered);
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

	return (
		<div>
			<div>
				<PageTitle title='Tipos de Documento' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{documentTypes.length > 0 && (
								<div>
									<TableFilter value={query} onChange={onFilterChange} />
									<OnlyActiveFilter
										checked={onlyActive}
										onChange={onOnlyActiveChange}
									/>
								</div>
							)}
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							{showAddModal && (
								<FormModal
									title='Agregar Tipo de Documento'
									show={showAddModal}
									onClose={setAddModalVisible(false)}
									onConfirm={onAdd}
								/>
							)}
						</PageActionBar>
						{documentTypes.length > 0 && (
							<BasicTable columns={DOCUMENT_TYPES_COLUMNS}>
								<React.Fragment>
									{filtered.map((item, i: number) => (
										<DocumentTypeRow
											key={i}
											item={item}
											onEdit={onEdit}
											onDelete={onDelete}
										/>
									))}
								</React.Fragment>
							</BasicTable>
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default DocumentTypes;
