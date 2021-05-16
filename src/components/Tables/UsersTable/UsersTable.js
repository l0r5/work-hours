import React from 'react';
import EnhancedTable from '../../UI/EnhancedTable/EnhancedTable';
import UsersTableRow from './UsersTableRow/UsersTableRow';


const headCells = [
    {id: 'id', numeric: false, label: 'ID'},
    {id: 'email', numeric: false, label: 'E-Mail'},
    {id: 'role', numeric: false, label: 'Rolle'},
];

const UsersTable = (props) => {
    const createSpecificRow = (rowProps) => {
        return (
            <UsersTableRow
                key={rowProps.id}
                item={rowProps.row}
                isSelected={rowProps.isSelected}
                labelId={rowProps.labelId}
            />);
    };

    return (
        <EnhancedTable
            rows={props.items}
            headCells={headCells}
            createSpecificRow={createSpecificRow}
            headerHasCheckBox={false}
        />
    );
};

export default UsersTable;