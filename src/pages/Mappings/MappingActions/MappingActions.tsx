import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { MappingForm, TableMapping } from '../interfaces';
import FormModal from '../FormModal/FormModal';
import MappingHeadersModal from '../MappingHeadersModal/MappingHeadersModal';

interface MappingActionsProps {
	item: TableMapping;
	onEdit: (data: MappingForm) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const MappingActions: React.FC<MappingActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showMappingHeadersModal, setShowMappingHeadersModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, archiveAt, mappingNumber } = item;

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};
	const onOpenMenu = (e: Event) => setAnchorEl(e.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setMappingHeadersVisible = (flag: boolean) =>
		withCloseMenu(() => setShowMappingHeadersModal(flag));
	const setDelModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowDeleteModal(flag));
	return (
		<>
			{!archiveAt && (
				<>
					<VolvoIconButton
						aria-controls='options'
						aria-haspopup='true'
						color='primary'
						onClick={onOpenMenu}
					>
						<SettingsIcon />
					</VolvoIconButton>
					<Menu
						id='options'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={onCloseMenu}
					>
						<MenuItem onClick={setMappingHeadersVisible(true)}>
							Cabecera de Mapping
						</MenuItem>
						<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
						<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
					</Menu>
				</>
			)}
			{showEditModal && (
				<FormModal
					title='Editar Mapping'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showMappingHeadersModal && (
				<MappingHeadersModal
					show={showMappingHeadersModal}
					id={id.toString()}
					mappingNumber={mappingNumber}
					onClose={setMappingHeadersVisible(false)}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id.toString()}
					title='Eliminar Mapping'
					body={`¿Está seguro que desea eliminar el mapping ${id}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default MappingActions;
