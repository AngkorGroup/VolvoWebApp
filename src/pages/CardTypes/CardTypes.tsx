import React, { useContext, useEffect, useState } from 'react';
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
import { filterRows } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { CardType, CardTypeForm } from './interfaces';
import CardTypeRow from './CardTypeRow/CardTypeRow';
import AppContext from '../../AppContext';
import { CARD_TYPE_COLUMNS } from './columns';

const cardTypeRows: CardType[] = [
	{
		id: '1',
		type: 'VREP',
		description: 'VOLVO REPUESTOS',
		currency: 'US$',
		term: '18',
		imgURL: '',
		createdAt: '10/05/2020',
		status: 'Activo',
		deletedAt: '',
	},
	{
		id: '2',
		type: 'VURE',
		description: 'VOLVO BONO UREA',
		currency: 'US$',
		term: '12',
		imgURL: '',
		createdAt: '11/05/2020',
		status: 'Activo',
		deletedAt: '',
	},
];

const CardTypes: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [cardTypes, setCardTypes] = useState<CardType[]>([]);
	const [filtered, setFiltered] = useState<CardType[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, cardTypes);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setCardTypes(cardTypeRows);
			setFiltered(cardTypeRows);
		}, 1500);
	}, []);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddCardType = (cardType: CardTypeForm) => {
		const newCardTypes = [...cardTypes, cardType as CardType];
		setCardTypes(newCardTypes);
		setFiltered(newCardTypes);
		// Perform API call
		addPageMessage!({
			title: 'Tipo de Tarjeta Agregado',
			text: 'Se agregó un nuevo tipo de tarjeta correctamente',
			status: 'success',
		});
	};

	const onEditCardType = (cardType: CardTypeForm) => {
		const newCardTypes = cardTypes.map((d) =>
			d.id === cardType.id ? (cardType as CardType) : d,
		);
		setCardTypes(newCardTypes);
		setFiltered(newCardTypes);
		// Perform API call
		addPageMessage!({
			title: 'Tipo de Tarjeta Editado',
			text: 'Se editó un tipo de tarjeta correctamente',
			status: 'success',
		});
	};

	const onDeleteCardType = (id: string) => {
		const status = 'Inactivo';
		const deletedAt = '16/10/2020';
		const newCardTypes = cardTypes.map((d) =>
			d.id !== id ? d : { ...d, status, deletedAt },
		);
		setCardTypes(newCardTypes);
		setFiltered(newCardTypes);
		// Perform API call
		addPageMessage!({
			title: 'Tipo de Tarjeta Desactivado',
			text: 'Se desactivó un tipo de tarjeta correctamente',
			status: 'success',
		});
	};
	return (
		<div>
			<div>
				<PageTitle title='Tipos de Tarjeta' />
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && cardTypes.length > 0 && (
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
