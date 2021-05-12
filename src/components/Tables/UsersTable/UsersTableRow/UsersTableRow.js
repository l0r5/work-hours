import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import Icon from '../../../UI/Icon/Icon';
import {Delete, Edit} from '@material-ui/icons';

const UsersTableRow = (props) => {

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={props.isSelected}
            tabIndex={-1}
            selected={props.isSelected}
        >
            <TableCell padding="none" align="center">
                <Icon click={() => props.onEditClick(props.item)}>
                    <Edit/>
                </Icon>
            </TableCell>
            <TableCell padding="none" align="center">
                <Icon click={() => props.onDeleteClick(props.item)}>
                    <Delete/>
                </Icon>
            </TableCell>
            {/*<TableCell align="left">{props.item.date}</TableCell>*/}
            <TableCell component="th" id={props.labelId} align="left"
                       scope="row">{props.item.id}</TableCell>
            <TableCell align="left">{props.item.email}</TableCell>
            {/*<TableCell align="left">{props.item.role}</TableCell>*/}

        </TableRow>
    );
};

export default UsersTableRow;