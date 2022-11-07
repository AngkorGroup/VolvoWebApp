import AddIcon from '@material-ui/icons/Add';
import React, { useMemo, useState } from 'react';
import {
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
	GenericTable,
} from 'common/components';
import { useAlert } from 'react-alert';
import { mapMappings, MappingForm } from './interfaces';
import { MAPPING_COLUMNS } from './columns';
import {
	addMapping,
	deleteMapping,
	editMapping,
	getQueryMappings,
} from 'common/services';
import { ACTIONS_COLUMN_V2 } from 'common/constants/tableColumn';
import { useQuery } from 'react-query';
import MappingActions from './MappingActions/MappingActions';
import FormModal from './FormModal/FormModal';
import { buildAlertBody as at, Mapping } from 'common/utils';

type Event = React.ChangeEvent<HTMLInputElement>;

const Mappings: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const { data, status, refetch } = useQuery(
		['getQueryMappings'],
		getQueryMappings,
	);
	const mappings = useMemo(() => {
		if (data?.ok) {
			return mapMappings(data?.data || []);
		}
		return [];
	}, [data]);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddMapping = async (mapping: MappingForm) => {
		const body: Partial<Mapping> = {
			mappingNumber: mapping.mappingNumber,
			type: mapping.type,
			description: mapping.description,
			company: mapping.company,
			feeder: mapping.feeder,
			file: mapping.file,
			username: mapping.username,
			password: mapping.password,
			date: mapping.date,
			filler: mapping.filler,
			version: mapping.version,
			receiverLogicalID: mapping.receiverLogicalID,
			receiverComponentID: mapping.receiverComponentID,
			senderLogicalID: mapping.senderLogicalID,
			senderComponentID: mapping.senderComponentID,
		};
		const response = await addMapping(body);
		if (response.ok) {
			refetch();
			alert.success(
				at('Mapping Agregado', 'Se agregó un nuevo mapping correctamente'),
			);
		}
	};

	const onEditMapping = async (mapping: MappingForm) => {
		const body: Partial<Mapping> = {
			id: mapping.id,
			mappingNumber: mapping.mappingNumber,
			type: mapping.type,
			description: mapping.description,
			company: mapping.company,
			feeder: mapping.feeder,
			file: mapping.file,
			username: mapping.username,
			password: mapping.password,
			date: mapping.date,
			filler: mapping.filler,
			version: mapping.version,
			receiverLogicalID: mapping.receiverLogicalID,
			receiverComponentID: mapping.receiverComponentID,
			senderLogicalID: mapping.senderLogicalID,
			senderComponentID: mapping.senderComponentID,
		};
		const response = await editMapping(body);
		if (response.ok) {
			refetch();
			alert.success(at('Mapping Editado', 'Se editó un mapping correctamente'));
		}
	};

	const onDeleteMapping = async (id: string) => {
		const response = await deleteMapping(id);
		if (response.ok) {
			refetch();
			alert.success(
				at('Mapping Eliminado', 'Se eliminó un mapping correctamente'),
			);
		}
	};

	const mappingsColumns = useMemo(
		() => [
			...MAPPING_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<MappingActions
						item={cell?.row?.original}
						onEdit={onEditMapping}
						onDelete={onDeleteMapping}
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
				<PageTitle title='Mappings' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status !== 'loading' && (
					<GenericTable
						filename='Mappings'
						columns={mappingsColumns}
						data={mappings}
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
			</PageBody>
			{showAddModal && (
				<FormModal
					title='Agregar Mapping'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddMapping}
				/>
			)}
		</div>
	);
};

export default Mappings;
