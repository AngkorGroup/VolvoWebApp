import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { ConfirmationModal, VolvoIconButton } from 'common/components';
import { MappingDetailForm, TableMapping } from '../interfaces';
import FormModal from '../MappingDetailsModal/FormModal/FormModal';

interface MappingDetailActionsProps {
	item: TableMapping;
	onEdit: (data: MappingDetailForm) => void;
	onDelete: (id: string) => void;
}

type Event = React.MouseEvent<HTMLButtonElement>;

const MappingDetailActions: React.FC<MappingDetailActionsProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showEditModal, setShowEditModal] = useState(false);
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
						<MenuItem onClick={setEditModalVisible(true)}>Editar</MenuItem>
						<MenuItem onClick={setDelModalVisible(true)}>Eliminar</MenuItem>
					</Menu>
				</>
			)}
			{showEditModal && (
				<FormModal
					title='Editar Detalle de Mapping'
					show={showEditModal}
					values={item}
					onClose={setEditModalVisible(false)}
					onConfirm={onEdit}
				/>
			)}
			{showDeleteModal && (
				<ConfirmationModal
					show={showDeleteModal}
					id={id.toString()}
					title='Eliminar Detalle de Mapping'
					body={`¿Está seguro que desea eliminar el detalle de mapping ${id}?`}
					onClose={setDelModalVisible(false)}
					onConfirm={onDelete}
				/>
			)}
		</>
	);
};

export default MappingDetailActions;
