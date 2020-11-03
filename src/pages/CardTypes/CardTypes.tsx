import React, { useContext, useMemo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	BasicTable,
	PageActionBar,
	PageBody,
	PageLoader,
	PageTitle,
	TableFilter,
	VolvoButton,
} from 'common/components';
import { CardType, filterRows } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { TableCardType, CardTypeForm, mapCardType } from './interfaces';
import CardTypeRow from './CardTypeRow/CardTypeRow';
import AppContext from '../../AppContext';
import { CARD_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
	addCardType,
	deleteCardType,
	editCardType,
	getCardTypes,
} from 'common/services';

const CardTypes: React.FC = () => {
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [filtered, setFiltered] = useState<TableCardType[]>([]);
	const { addPageMessage } = useContext(AppContext);
	const { data, status } = useQuery('cardTypes', getCardTypes);
	const cardTypes = useMemo(() => {
		if (data?.ok) {
			const rows = mapCardType(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, cardTypes);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddCardType = async (cardType: CardTypeForm) => {
		const term = parseInt(cardType.term || '0', 10) * 30;
		const body: Partial<CardType> = {
			name: cardType.type || '',
			displayName: cardType.description || '',
			currency: cardType.currency || '',
			color: cardType.color || '',
			tpCode: '0004',
			term,
		};
		const response = await addCardType(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Tipo de Tarjeta Agregado',
				text: 'Se agregó un nuevo tipo de tarjeta correctamente',
				status: 'success',
			});
		}
	};

	const onEditCardType = async (cardType: CardTypeForm) => {
		const term = parseInt(cardType.term || '0', 10) * 30;
		const body: Partial<CardType> = {
			id: +(cardType.id || '0'),
			name: cardType.type || '',
			displayName: cardType.description || '',
			currency: cardType.currency || '',
			color: cardType.color || '',
			tpCode: '0004',
			term,
		};
		const response = await editCardType(body);
		if (response.ok) {
			addPageMessage!({
				title: 'Tipo de Tarjeta Editado',
				text: 'Se editó un tipo de tarjeta correctamente',
				status: 'success',
			});
		}
	};

	const onDeleteCardType = async (id: string) => {
		const response = await deleteCardType(id);
		if (response.ok) {
			addPageMessage!({
				title: 'Tipo de Tarjeta Desactivado',
				text: 'Se desactivó un tipo de tarjeta correctamente',
				status: 'success',
			});
		}
	};
	return (
		<div>
			<div>
				<PageTitle title='Tipos de Tarjeta' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && cardTypes.length > 0 && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
							<VolvoButton
								text='Agregar'
								icon={<AddIcon />}
								color='primary'
								onClick={setAddModalVisible(true)}
							/>
							<FormModal
								title='Agregar Tipo de Tarjeta'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddCardType}
							/>
						</PageActionBar>
						<BasicTable columns={CARD_TYPE_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<CardTypeRow
										key={i}
										item={item}
										onEdit={onEditCardType}
										onDelete={onDeleteCardType}
									/>
								))}
							</React.Fragment>
						</BasicTable>
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default CardTypes;
