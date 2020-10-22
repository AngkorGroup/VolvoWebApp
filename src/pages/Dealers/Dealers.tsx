import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import BasicTable from '../../common/components/BasicTable/BasicTable';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import VolvoButton from '../../common/components/VolvoButton/VolvoButton';
import DealerRow from './DealerRow/DealerRow';
import FormModal from './FormModal/FormModal';
import { Dealer } from './interfaces';
import PageLoader from '../../common/components/PageLoader/PageLoader';
import PageBody from '../../common/components/PageBody/PageBody';
import AppContext from '../../AppContext';
import { filterRows } from '../../common/utils/utils';
import PageActionBar from '../../common/components/PageActionBar/PageActionBar';
import TableFilter from '../../common/components/TableFilter/TableFilter';

const dealerColumns = [
	{
		title: 'Código',
	},
	{
		title: 'Nombre',
	},
	{
		title: 'RUC',
	},
	{
		title: 'Dirección',
	},
	{
		title: 'Estado',
	},
	{
		title: 'Tipo',
	},
	{
		title: 'Teléfono',
	},
	{
		title: 'Zona',
	},
	{
		title: 'Acciones',
		props: { align: 'center' as 'center' },
	},
];

const dealerRows = [
	{
		code: '8000',
		name: 'AUTOMOTORES MOQUEGUA',
		ruc: '20506002975',
		address: 'Av. Industrial Moquegua 12002',
		status: 'Activo',
		type: 'Own',
		phone: '01 461-4225',
		zone: 'Norte',
	},
	{
		code: '7559',
		name: 'VOLVO SANTA ANITA',
		ruc: '20406003975',
		address: 'Av. Santa Anita 15099',
		status: 'Activo',
		type: 'Own',
		phone: '01 361-4895',
		zone: 'Lima',
	},
	{
		code: '8001',
		name: 'AUTOMOTORES TACNA',
		ruc: '20586003957',
		address: 'Av. Arica 1123',
		status: 'Activo',
		type: 'Private',
		phone: '01 271-7525',
		zone: 'Lima',
	},
];

const Dealers: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [dealers, setDealers] = useState<Dealer[]>([]);
	const [filtered, setFiltered] = useState<Dealer[]>([]);
	const { addPageMessage } = useContext(AppContext);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const filtered = filterRows(newQuery, dealers);
		setQuery(newQuery);
		setFiltered(filtered);
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setDealers(dealerRows);
			setFiltered(dealerRows);
		}, 1500);
	}, []);

	const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

	const onAddDealer = (dealer: Dealer) => {
		const newDealers = [...dealers, dealer];
		setDealers(newDealers);
		setFiltered(newDealers);
		// Perform API call
		addPageMessage!({
			title: 'Dealer Agregado',
			text: 'Se agregó un nuevo dealer correctamente',
			status: 'success',
		});
	};

	const onEditDealer = (dealer: Dealer) => {
		const newDealers = dealers.map((d) =>
			d.code === dealer.code ? dealer : d,
		);
		setDealers(newDealers);
		setFiltered(newDealers);
		// Perform API call
		addPageMessage!({
			title: 'Dealer Editado',
			text: 'Se editó un dealer correctamente',
			status: 'success',
		});
	};

	const onDeleteDealer = (id: string) => {
		const newDealers = dealers.filter((d) => d.code !== id);
		setDealers(newDealers);
		setFiltered(newDealers);
		// Perform API call
		addPageMessage!({
			title: 'Dealer Eliminado',
			text: 'Se eliminó el dealer correctamente',
			status: 'success',
		});
	};
	return (
		<div>
			<div>
				<PageTitle title='Dealers' />
			</div>
			<PageBody>
				{loading && <PageLoader />}
				{!loading && dealers.length > 0 && (
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
								title='Agregar Dealer'
								show={showAddModal}
								onClose={setAddModalVisible(false)}
								onConfirm={onAddDealer}
							/>
						</PageActionBar>
						<BasicTable columns={dealerColumns}>
							<React.Fragment>
								{filtered.map((item, i: number) => (
									<DealerRow
										key={i}
										item={item}
										onEdit={onEditDealer}
										onDelete={onDeleteDealer}
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

export default Dealers;
