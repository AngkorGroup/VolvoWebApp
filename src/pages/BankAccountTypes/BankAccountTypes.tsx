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
import { TableBankAccountType, BankAccountTypeForm, mapBankAccountTypes } from './interfaces';
import BankAccountTypeRow from './BankAccountTypeRow/BankAccountTypeRow';
import { CARD_TYPE_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
    addBankAccountTypes,
    deleteBankAccountType,
    editBankAccountType,
    getQueryBankAccountTypes,
} from 'common/services';
import { useAlert } from 'react-alert';

const Banks: React.FC = () => {
    const alert = useAlert();
    const [query, setQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [onlyActive, setOnlyActive] = useState(true);
    const [filtered, setFiltered] = useState<TableBankAccountType[]>([]);
    const { data, status, refetch } = useQuery(['getBankAccountTypes', onlyActive], getQueryBankAccountTypes);
    const bankAccountTypes = useMemo(() => {
        if (data?.ok) {
            const rows = mapBankAccountTypes(data?.data || []);
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
        const filtered = filterRows(newQuery, bankAccountTypes);
        setQuery(newQuery);
        setFiltered(filtered);
    };

    const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

    const onAddBankAccountType = async (bankAccountType: BankAccountTypeForm) => {
        const body = {
            name: bankAccountType.name || '',
        };
        const response = await addBankAccountTypes(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Tipo de Cuenta bancaria Agregada',
                    'Se agregó un nuevo tipo de cuenta bancaria correctamente',
                ),
            );
        }
    };

    const onEditBankAccountType = async (bankAccountType: BankAccountTypeForm) => {
        const body = {
            id: parseInt(bankAccountType.id || '0', 10),
            name: bankAccountType.name || '',
        };
        const response = await editBankAccountType(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Tipo de Cuenta bancaria Editada',
                    'Se editó un tipo de cuenta bancaria correctamente',
                ),
            );
        }
    };

    const onDeleteBankAccountType = async (id: string) => {
        const response = await deleteBankAccountType(id);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Tipo de Cuenta bancaria Eliminada',
                    'Se eliminó un tipo de cuenta bancaria correctamente',
                ),
            );
        }
    };
    return (
        <div>
            <div>
                <PageTitle title='Tipos de cuenta bancaria' />
            </div>
            <PageBody>
                {status === 'loading' && <PageLoader />}
                {status === 'success' && (
                    <div>
                        <PageActionBar justifyContent='space-between'>
                            {bankAccountTypes.length > 0 && (
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
                                title='Agregar Tipo de cuenta bancaria'
                                show={showAddModal}
                                onClose={setAddModalVisible(false)}
                                onConfirm={onAddBankAccountType}
                            />
                        </PageActionBar>
                        {bankAccountTypes.length > 0 && (
                            <BasicTable columns={CARD_TYPE_COLUMNS}>
                                <React.Fragment>
                                    {filtered.map((item, i: number) => (
                                        <BankAccountTypeRow
                                            key={i}
                                            item={item}
                                            onEdit={onEditBankAccountType}
                                            onDelete={onDeleteBankAccountType}
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
