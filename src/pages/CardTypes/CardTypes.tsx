import React, { useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	GenericTable,
	OnlyActiveFilter,
	PageBody,
	PageLoader,
	PageTitle,
	VolvoButton,
	VolvoCard,
} from 'common/components';
import { buildAlertBody as at } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { CardTypeForm, mapCardTypes } from './interfaces';
import { CARD_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
	addCardType,
	deleteCardType,
	editCardType,
	getQueryCardTypes,
} from 'common/services';
import { useAlert } from 'react-alert';
import CardTypeActions from './CardTypeActions/CardTypeActions';
import { ACTIONS_COLUMN_V2 } from 'common/constants';

export const renderCardColor = (color: string) => (
	<VolvoCard isThumbnail color={color} customStyle={{ margin: 'auto' }} />
);

const CardTypes: React.FC = () => {
	const alert = useAlert();
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(true);
	const { data, status, refetch } = useQuery(
		['getQueryCardTypes', onlyActive],
		getQueryCardTypes,
	);
	const cardTypes = useMemo(() => {
		if (data?.ok) {
			return mapCardTypes(data?.data || []);
		}
		return [];
	}, [data]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddCardType = async (cardType: CardTypeForm) => {
		const body = {
			name: cardType.type || '',
			displayName: cardType.description || '',
			currencyId: cardType.currencyId || '',
			color: cardType.color || '',
			tpCode: cardType.tpCode || '',
			term: parseInt(cardType.term || '0', 10),
		};
		const response = await addCardType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Tarjeta Agregado',
					'Se agregó un nuevo tipo de tarjeta correctamente',
				),
			);
		}
	};

	const onEditCardType = async (cardType: CardTypeForm) => {
		const body = {
			id: parseInt(cardType.id || '0', 10),
			name: cardType.type || '',
			displayName: cardType.description || '',
			currencyId: cardType.currencyId || '',
			color: cardType.color || '',
			tpCode: cardType.tpCode || '',
			term: parseInt(cardType.term || '0', 10),
		};
		const response = await editCardType(body);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Tarjeta Editado',
					'Se editó un tipo de tarjeta correctamente',
				),
			);
		}
	};

	const onDeleteCardType = async (id: string) => {
		const response = await deleteCardType(id);
		if (response.ok) {
			refetch();
			alert.success(
				at(
					'Tipo de Tarjeta Desactivado',
					'Se desactivó un tipo de tarjeta correctamente',
				),
			);
		}
	};

	const columns = useMemo(
		() => [
			...CARD_TYPE_COLUMNS,
			{
				...ACTIONS_COLUMN_V2,
				Cell: (cell: any) => (
					<CardTypeActions
						item={cell?.row?.original}
						onEdit={onEditCardType}
						onDelete={onDeleteCardType}
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
				<PageTitle title='Tipos de Tarjeta' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<PageBody>
						<GenericTable
							filename='Tipos_de_tarjeta'
							columns={columns}
							data={cardTypes}
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
					title='Agregar Tipo de Tarjeta'
					show={showAddModal}
					onClose={setAddModalVisible(false)}
					onConfirm={onAddCardType}
				/>
			)}
		</div>
	);
};

export default CardTypes;
