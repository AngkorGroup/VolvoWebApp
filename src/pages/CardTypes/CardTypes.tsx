import React, { useMemo, useState } from 'react';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
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
import { buildAlertBody as at, CardType, filterRows } from 'common/utils';
import FormModal from './FormModal/FormModal';
import {
	TableCardType,
	CardTypeForm,
	mapCardType,
	mapCardTypes,
} from './interfaces';
import CardTypeRow from './CardTypeRow/CardTypeRow';
import { CARD_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
	addCardType,
	deleteCardType,
	editCardType,
	getCardTypes,
} from 'common/services';
import { useAlert } from 'react-alert';

const CardTypes: React.FC = () => {
	const alert = useAlert();
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [onlyActive, setOnlyActive] = useState(false);
	const [filtered, setFiltered] = useState<TableCardType[]>([]);
	const { data, status } = useQuery([onlyActive], getCardTypes);
	const cardTypes = useMemo(() => {
		if (data?.ok) {
			const rows = mapCardTypes(data?.data || []);
			setFiltered(rows);
			return rows;
		}
		return [];
	}, [data, setFiltered]);

	const onOnlyActiveChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setOnlyActive(e.target.checked);
	};

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, cardTypes);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddCardType = async (cardType: CardTypeForm) => {
		const body: Partial<CardType> = {
			name: cardType.type || '',
			displayName: cardType.description || '',
			currency: cardType.currency || '',
			color: cardType.color || '',
			tpCode: cardType.tpCode || '',
			term: parseInt(cardType.term || '0', 10),
		};
		const response = await addCardType(body);
		if (response.ok) {
			const newRows = mapCardType(response.data || ({} as CardType));
			setFiltered((old) => [...old, newRows]);
			alert.success(
				at(
					'Tipo de Tarjeta Agregado',
					'Se agregó un nuevo tipo de tarjeta correctamente',
				),
			);
		}
	};

	const onEditCardType = async (cardType: CardTypeForm) => {
		const body: Partial<CardType> = {
			id: parseInt(cardType.id || '0', 10),
			name: cardType.type || '',
			displayName: cardType.description || '',
			currency: cardType.currency || '',
			color: cardType.color || '',
			tpCode: cardType.tpCode || '',
			term: parseInt(cardType.term || '0', 10),
		};
		const response = await editCardType(body);
		if (response.ok) {
			const newData = mapCardType(response.data || ({} as CardType));
			const newRows = cardTypes.map((c) => (c.id === newData.id ? newData : c));
			setFiltered(newRows);
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
			const archiveAt = moment().format('DD/MM/YYYY h:mm:ss');
			const newRows = cardTypes.map((c) =>
				c.id === id ? { ...c, archiveAt } : c,
			);
			setFiltered(newRows);
			alert.success(
				at(
					'Tipo de Tarjeta Desactivado',
					'Se desactivó un tipo de tarjeta correctamente',
				),
			);
		}
	};
	return (
		<div>
			<div>
				<PageTitle title='Tipos de Tarjeta' />
			</div>
			<PageBody>
				{status === 'loading' && <PageLoader />}
				{status === 'success' && (
					<div>
						<PageActionBar justifyContent='space-between'>
							{cardTypes.length > 0 && (
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
							<FormModal
								title='Agregar Tipo de Tarjeta'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddCardType}
							/>
						</PageActionBar>
						{cardTypes.length > 0 && (
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
						)}
					</div>
				)}
			</PageBody>
		</div>
	);
};

export default CardTypes;
