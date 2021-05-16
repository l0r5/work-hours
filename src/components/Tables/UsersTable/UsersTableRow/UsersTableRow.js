import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';

const UsersTableRow = (props) => {

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={props.isSelected}
            tabIndex={-1}
            selected={props.isSelected}
        >
            <TableCell component="th" id={props.labelId} align="left"
                       scope="row">{props.item.id}</TableCell>
            <TableCell align="left">{props.item.email}</TableCell>
            <TableCell align="left">{props.item.role}</TableCell>

        </TableRow>
    );
};

export default UsersTableRow;