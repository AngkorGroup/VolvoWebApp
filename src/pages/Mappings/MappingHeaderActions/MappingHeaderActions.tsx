import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { MappingHeaderForm, TableMapping } from '../interfaces';
import FormModal from '../MappingHeadersModal/FormModal/FormModal';
import MappingDetailsModal from '../MappingDetailsModal/MappingDetailsModal';

interface MappingHeaderActionsProps {
	item: TableMapping;
	onEdit: (data: MappingHeaderForm) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const MappingHeaderActions: React.FC<MappingHeaderActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showMappingDetailsModal, setShowMappingDetailsModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id, archiveAt } = item;

	const withCloseMenu = (func: () => void) => () => {
		func();
		onCloseMenu();
	};
	const onOpenMenu = (e: Event) => setAnchorEl(e.currentTarget);
	const onCloseMenu = () => setAnchorEl(null);

	const setEditModalVisible = (flag: boolean) =>
		withCloseMenu(() => setShowEditModal(flag));
	const setMappingDetailsVisible = (flag: boolean) =>
		withCloseMenu(() => setShowMappingDetailsModal(flag));
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
						<MenuItem onClick={setMappingDetailsVisible(true)}>
							Detalle de Mapping
						</MenuItem>
						<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
						<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
					</Menu>
				</>
			)}
			{showEditModal && (
				<FormModal
					title='Editar Mapping Header'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showMappingDetailsModal && (
				<MappingDetailsModal
					show={showMappingDetailsModal}
					id={id.toString()}
					onClose={setMappingDetailsVisible(false)}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id.toString()}
					title='Eliminar Mapping Header'
					body={`¿Está seguro que desea eliminar el mapping header ${id}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default MappingHeaderActions;
