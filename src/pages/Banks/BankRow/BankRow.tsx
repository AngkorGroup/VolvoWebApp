import {
    createStyles,
    makeStyles,
    TableCell,
    TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    ConfirmationModal,
    VolvoIconButton,
} from 'common/components';
import { BankForm, TableBank } from '../interfaces';
import FormModal from '../FormModal/FormModal';

interface BankRowProps {
    item: TableBank;
    onEdit: (data: BankForm) => void;
    onDelete: (id: string) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        actionButtons: {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
    }),
);

const BankRow = ({ item, onEdit, onDelete }: BankRowProps) => {
    const classes = useStyles();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {
        id,
        name,
        abbreviation,
        status,
        archiveAt,
        tpCode,
    } = item;

    const setEditModalVisible = (flag: boolean) => () => setShowEditModal(flag);
    const setDelModalVisible = (flag: boolean) => () => setShowDeleteModal(flag);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{tpCode}</TableCell>
                <TableCell>{abbreviation}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{archiveAt}</TableCell>
                <TableCell>
                    {!archiveAt && (
                        <div className={classes.actionButtons}>
                            <VolvoIconButton
                                color='primary'
                                onClick={setEditModalVisible(true)}
                            >
                                <CreateIcon />
                            </VolvoIconButton>
                            <VolvoIconButton color='error' onClick={setDelModalVisible(true)}>
                                <DeleteIcon />
                            </VolvoIconButton>
                        </div>
                    )}
                </TableCell>
            </TableRow>
            {!archiveAt && (
                <FormModal
                    title='Editar Banco'
                    show={showEditModal}
                    values={item as BankForm}
                    onClose={setEditModalVisible(false)}
                    onConfirm={onEdit}
                />
            )}
            {!archiveAt && (
                <ConfirmationModal
                    show={showDeleteModal}
                    id={id}
                    title='Eliminar Banco'
                    body={`¿Está seguro que desea eliminar el banco ${name}?`}
                    onClose={setDelModalVisible(false)}
                    onConfirm={onDelete}
                />
            )}
        </React.Fragment>
    );
};

export default BankRow;
