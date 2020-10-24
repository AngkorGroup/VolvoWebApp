import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import VolvoButton from '../../common/components/VolvoButton/VolvoButton';
import { POS as POSType, POSForm } from './interfaces';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageBody from '../../common/components/PageBody/PageBody';
import POSRow from './POSRow/POSRow';
import FormModal from './FormModal.tsx/FormModal';
import TypeAhead, { Option } from '../../common/components/TypeAhead/TypeAhead';
import { MOCKED_DEALERS_TYPEAHEAD } from '../../common/utils/mocked';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import TableFilter from '../../common/components/TableFilter/TableFilter';
import { filterRows } from '../../common/utils/utils';
import AppContext from '../../AppContext';
import { POS_COLUMNS } from './columns';

const posRows: POSType[] = [
	{
		id: '1',
		code: '22569',
		dealer: {
			code: '8000',
			name: 'AUTOMOTORES MOQUEGUA',
		},
		phone: '987654321',
		email: 'fpeña@gmail.com',
	},
	{
		id: '2',
		code: '22570',
		dealer: {
			code: '8000',
			name: 'AUTOMOTORES MOQUEGUA',
		},
		phone: '988665531',
		email: 'lcastillo@gmail.com',
	},
	{
		id: '3',
		code: '22571',
		dealer: {
			code: '8000',
			name: 'AUTOMOTORES MOQUEGUA',
		},
		phone: '999666333',
		email: 'hlobaton@gmail.com',
	},
];

const POS: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [posList, setPOSList] = useState<POSType[]>([]);
	const [filtered, setFiltered] = useState<POSType[]>([]);
	const { addPageMessage } = useContext(AppContext);
	const maxCashiers = 5;

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, posList);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	const onDealerChange = (_: any, newValue: string | Option) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setPOSList(posRows);
			setFiltered(posRows);
		}, 1000);
	};

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddPOS = (pos: POSForm) => {
		const newPOS = {
			id: '4',
			dealer: {
				code: '8000',
				name: 'AUTOMOTORES MOQUEGUA',
			},
		};
		const newPOSList = [...posList, { ...newPOS, ...pos } as POSType];
		setPOSList(newPOSList);
		setFiltered(newPOSList);
		// Perform API call
		addPageMessage!({
			title: 'POS Agregado',
			text: 'Se agregó un nuevo POS correctamente',
			status: 'success',
		});
	};

	const onEditPOS = (pos: POSForm) => {
		const newPOSList = posList.map((d) =>
			d.id === pos.id ? { ...d, ...pos } : d,
		);
		setPOSList(newPOSList);
		setFiltered(newPOSList);
		// Perform API call
		addPageMessage!({
			title: 'POS Editado',
			text: 'Se editó un POS correctamente',
			status: 'success',
		});
	};

	const onDeletePOS = (id: string) => {
		const newPOSList = posList.filter((d) => d.id !== id);
		setPOSList(newPOSList);
		setFiltered(newPOSList);
		// Perform API call
		addPageMessage!({
			title: 'POS Eliminado',
			text: 'Se eliminó un POS correctamente',
			status: 'success',
		});
	};
	return (
		<div>
			<div>
				<PageTitle title='POS' />
				<TypeAhead
					options={MOCKED_DEALERS_TYPEAHEAD}
					placeholder='Dealer'
					onChange={onDealerChange}
				/>
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && posList.length > 0 && (
					<div>
						<PageActionBar justifyContent='space-between'>
							<TableFilter value={query} onChange={onFilterChange} />
							{posList.length < maxCashiers && (
								<React.Fragment>
									<VolvoButton
										text='Agregar'
										icon={<AddIcon />}
										color='primary'
										onClick={setAddModalVisible(true)}
									/>
									<FormModal
										title='Agregar POS'
										show={showAddModal}
										onClose={setAddModalVisible(false)}
										onConfirm={onAddPOS}
									/>
								</React.Fragment>
							)}
						</PageActionBar>
						<BasicTable columns={POS_COLUMNS}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<POSRow
										key={i}
										item={item}
										onEdit={onEditPOS}
										onDelete={onDeletePOS}
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

export default POS;
