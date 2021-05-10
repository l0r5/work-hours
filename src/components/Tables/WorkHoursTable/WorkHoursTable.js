import React from 'react';
import WorkHoursTableRow from './WorkHoursTableRow/WorkHoursTableRow';
import EnhancedTable from '../../UI/EnhancedTable/EnhancedTable';

const headCells = [
    {id: 'view', numeric: false, label: ''},
    {id: 'edit', numeric: false, label: ''},
    {id: 'id', numeric: false, label: 'ID'},
    {id: 'date', numeric: false, label: 'Date'},
    {id: 'customer', numeric: false, label: 'Customer'},
    {id: 'location', numeric: false, label: 'Location'},
    {id: 'token', numeric: false, label: 'Token'},
    {id: 'comment', numeric: false, label: 'Comment'},
    {id: 'employee', numeric: false, label: 'Employee'},
    {id: 'workHours', numeric: true, label: 'Work Hours'},
    {id: 'chainsawHours', numeric: true, label: 'Chainsaw Hours'},
    {id: 'machineHours', numeric: true, label: 'Machine Hours'},
];

const WorkHoursTable = (props) => {

    const createSpecificRow = (rowProps) => {
        return (
            <WorkHoursTableRow
                key={rowProps.id}
                click={rowProps.onCheckBoxClick}
                item={rowProps.row}
                isSelected={rowProps.isSelected}
                labelId={rowProps.labelId}
                onEditClick={props.onEditItemClick}
                onDetailViewClick={props.onDetailViewClick}
            />);
    };

    return (
        <EnhancedTable
            rows={props.items}
            headCells={headCells}
            createSpecificRow={createSpecificRow}
            headerHasCheckBox={true}
        />
    );
}

export default WorkHoursTable;