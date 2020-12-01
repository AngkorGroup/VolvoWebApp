import React, { useMemo, useState } from 'react';
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
import { buildAlertBody as at, filterRows } from 'common/utils';
import FormModal from './FormModal/FormModal';
import { TableBank, BankForm, mapBanks } from './interfaces';
import BankRow from './BankRow/BankRow';
import { CARD_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
    addBank,
    deleteBank,
    editBank,
    getQueryBank,
} from 'common/services';
import { useAlert } from 'react-alert';

const Banks: React.FC = () => {
    const alert = useAlert();
    const [query, setQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [onlyActive, setOnlyActive] = useState(true);
    const [filtered, setFiltered] = useState<TableBank[]>([]);
    const { data, status, refetch } = useQuery(['getQueryBank', onlyActive], getQueryBank);
    const banks = useMemo(() => {
        if (data?.ok) {
            const rows = mapBanks(data?.data || []);
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
        const filtered = filterRows(newQuery, banks);
        setQuery(newQuery);
        setFiltered(filtered);
    };

    const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

    const onAddBank = async (bank: BankForm) => {
        const body = {
            name: bank.name || '',
            abbreviation: bank.abbreviation || '',
            tpCode: bank.tpCode || '',
        };
        const response = await addBank(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Banco Agregado',
                    'Se agregó un nuevo banco correctamente',
                ),
            );
        }
    };

    const onEditBank = async (bank: BankForm) => {
        const body = {
            id: parseInt(bank.id || '0', 10),
            name: bank.name || '',
            abbreviation: bank.abbreviation || '',
            tpCode: bank.tpCode || '',
        };
        const response = await editBank(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Banco Editado',
                    'Se editó un banco correctamente',
                ),
            );
        }
    };

    const onDeleteBank = async (id: string) => {
        const response = await deleteBank(id);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Banco Desactivado',
                    'Se desactivó un banco correctamente',
                ),
            );
        }
    };
    return (
        <div>
            <div>
                <PageTitle title='Bancos' />
            </div>
            <PageBody>
                {status === 'loading' && <PageLoader />}
                {status === 'success' && (
                    <div>
                        <PageActionBar justifyContent='space-between'>
                            {banks.length > 0 && (
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
                                title='Agregar Banco'
                                show={showAddModal}
                                onClose={setAddModalVisible(false)}
                                onConfirm={onAddBank}
                            />
                        </PageActionBar>
                        {banks.length > 0 && (
                            <BasicTable columns={CARD_TYPE_COLUMNS}>
                                <React.Fragment>
                                    {filtered.map((item, i: number) => (
                                        <BankRow
                                            key={i}
                                            item={item}
                                            onEdit={onEditBank}
                                            onDelete={onDeleteBank}
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

export default Banks;
