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
import { TableCurrency, CurrencyForm, mapCurrencies } from './interfaces';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import { CURRENCY_COLUMNS } from './columns';
import { useQuery } from 'react-query';
import {
    addCurrency,
    deleteCurrency,
    editCurrency,
    getCurrencies,
} from 'common/services';
import { useAlert } from 'react-alert';

const Currencies: React.FC = () => {
    const alert = useAlert();
    const [query, setQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [onlyActive, setOnlyActive] = useState(true);
    const [filtered, setFiltered] = useState<TableCurrency[]>([]);
    const { data, status, refetch } = useQuery([onlyActive], getCurrencies);
    const currencies = useMemo(() => {
        if (data?.ok) {
            const rows = mapCurrencies(data?.data || []);
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
        const filtered = filterRows(newQuery, currencies);
        setQuery(newQuery);
        setFiltered(filtered);
    };

    const setAddModalVisible = (flag: boolean) => () => setShowAddModal(flag);

    const onAddCurrency = async (currency: CurrencyForm) => {
        const body = {
            name: currency.name || '',
            tpCode: currency.tpCode || '',
            abbreviation: currency.abbreviation || '',
            symbol: currency.symbol || '',
        };
        const response = await addCurrency(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Moneda Agregada',
                    'Se agregó una nueva moneda correctamente',
                ),
            );
        }
    };

    const onEditCurrency = async (currency: CurrencyForm) => {
        const body = {
            id: parseInt(currency.id || '0', 10),
            name: currency.name || '',
            tpCode: currency.tpCode || '',
            abbreviation: currency.abbreviation || '',
            symbol: currency.symbol || '',
        };
        const response = await editCurrency(body);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Moneda Editada',
                    'Se editó una moneda correctamente',
                ),
            );
        }
    };

    const onDeleteCurrency = async (id: string) => {
        const response = await deleteCurrency(id);
        if (response.ok) {
            refetch();
            alert.success(
                at(
                    'Moneda Desactivada',
                    'Se desactivó una moneda correctamente',
                ),
            );
        }
    };
    return (
        <div>
            <div>
                <PageTitle title='Monedas' />
            </div>
            <PageBody>
                {status === 'loading' && <PageLoader />}
                {status === 'success' && (
                    <div>
                        <PageActionBar justifyContent='space-between'>
                            {currencies.length > 0 && (
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
                                title='Agregar Moneda'
                                show={showAddModal}
                                onClose={setAddModalVisible(false)}
                                onConfirm={onAddCurrency}
                            />
                        </PageActionBar>
                        {currencies.length > 0 && (
                            <BasicTable columns={CURRENCY_COLUMNS}>
                                <React.Fragment>
                                    {filtered.map((item, i: number) => (
                                        <CurrencyRow
                                            key={i}
                                            item={item}
                                            onEdit={onEditCurrency}
                                            onDelete={onDeleteCurrency}
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

export default Currencies;
